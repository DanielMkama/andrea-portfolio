// Flattens a projects list into one continuous sequence of slides.
function buildSlides(projects) {
  const slides = [];
  projects.forEach((project, projectIndex) => {
    (project.media || []).forEach((media) => {
      slides.push({ project, projectIndex, media });
    });
  });
  return slides;
}

// Builds the actual media element for a slide: <img> for images, <video>
// for uploaded video files, <iframe> for external YouTube/Vimeo links.
// Playback is controlled by the caller (IntersectionObserver below), so
// video starts paused rather than autoplaying immediately on creation.
function buildMediaElement(media, altText) {
  if (media.type === "video") {
    const video = document.createElement("video");
    video.src = media.src;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    if (media.poster) video.poster = media.poster;
    video.setAttribute("aria-label", altText);
    return video;
  }

  if (media.type === "embed") {
    const iframe = document.createElement("iframe");
    const separator = media.src.includes("?") ? "&" : "?";
    iframe.src = media.src + separator + "autoplay=0&muted=1&loop=1&playsinline=1";
    iframe.title = altText;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
    iframe.allowFullscreen = true;
    return iframe;
  }

  const img = document.createElement("img");
  img.src = media.src;
  img.alt = altText;
  return img;
}

// Embeds (YouTube/Vimeo iframes) don't expose a shared play()/pause() API
// the way <video> does, so play/pause on scroll only applies to <video>.
function playMedia(el) {
  if (el.tagName === "VIDEO") el.play().catch(() => {});
}

function pauseMedia(el) {
  if (el.tagName === "VIDEO") el.pause();
}

// Thumbnail for the Index page grid. Images use their own URL; uploaded
// video files have no separate poster from Sanity, so a muted <video>
// seeked to a fraction of a second in shows a frame instead; embeds fall
// back to a poster (YouTube) or the grid's plain background (Vimeo).
function buildThumbnailElement(media, altText) {
  if (media.type === "image") {
    const img = document.createElement("img");
    img.src = media.src;
    img.alt = altText;
    img.loading = "lazy";
    return img;
  }

  if (media.type === "video") {
    const video = document.createElement("video");
    video.src = media.src + "#t=0.1";
    video.muted = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", altText);
    return video;
  }

  if (media.poster) {
    const img = document.createElement("img");
    img.src = media.poster;
    img.alt = altText;
    img.loading = "lazy";
    return img;
  }

  const placeholder = document.createElement("div");
  placeholder.className = "archive-thumb-placeholder";
  placeholder.setAttribute("aria-label", altText);
  return placeholder;
}

// Home page - full-screen vertical scroll-snap slider. Scrolling (wheel,
// touch drag, or keyboard) snaps to the next/previous slide; the header
// counter/title update to match whichever slide is in view, and only the
// visible slide's video plays.
(async function () {
  const track = document.getElementById("slides");
  if (!track || typeof window.loadProjects !== "function") return;

  const projects = await window.loadProjects();
  const slides = buildSlides(projects);
  if (!slides.length) return;

  const counterEl = document.getElementById("counter");
  const titleEl = document.getElementById("projectTitle");

  const sections = slides.map((slide, index) => {
    const section = document.createElement("section");
    section.className = "slide";
    section.dataset.index = String(index);

    const mediaWrap = document.createElement("div");
    mediaWrap.className = "slide-media";
    mediaWrap.appendChild(buildMediaElement(slide.media, slide.project.name));

    section.appendChild(mediaWrap);
    track.appendChild(section);
    return section;
  });

  let activeIndex = 0;

  function updateMeta(index) {
    counterEl.textContent = (index + 1) + " | " + slides.length;
    titleEl.textContent = slides[index].project.name;
    history.replaceState(null, "", "#" + index);
  }

  function setActive(index) {
    if (index === activeIndex && sections[index].dataset.activated) return;
    activeIndex = index;
    sections.forEach((section, i) => {
      const el = section.querySelector("video, iframe");
      if (!el) return;
      if (i === index) {
        section.dataset.activated = "true";
        playMedia(el);
      } else {
        pauseMedia(el);
      }
    });
    updateMeta(index);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        setActive(Number(entry.target.dataset.index));
      }
    });
  }, { root: track, threshold: [0.6] });

  sections.forEach((section) => observer.observe(section));

  let startIndex = 0;
  const hashIndex = parseInt(window.location.hash.replace("#", ""), 10);
  if (!isNaN(hashIndex) && hashIndex >= 0 && hashIndex < slides.length) {
    startIndex = hashIndex;
  }
  sections[startIndex].scrollIntoView({ block: "start" });
  setActive(startIndex);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      sections[Math.min(sections.length - 1, activeIndex + 1)].scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (e.key === "ArrowUp") {
      sections[Math.max(0, activeIndex - 1)].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
})();

// Index page - a grid of every slide's thumbnail, linking straight into
// that point in the home slider.
(async function () {
  const grid = document.getElementById("archiveGrid");
  if (!grid || typeof window.loadProjects !== "function") return;

  const projects = await window.loadProjects();
  const slides = buildSlides(projects);

  slides.forEach((slide, index) => {
    const li = document.createElement("li");
    li.className = "archive-cell";

    const a = document.createElement("a");
    a.className = "archive-thumb";
    a.href = "index.html#" + index;
    a.title = slide.project.name;

    a.appendChild(buildThumbnailElement(slide.media, slide.project.name));
    li.appendChild(a);
    grid.appendChild(li);
  });
})();
