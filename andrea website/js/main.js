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
    mediaWrap.className = "slide-media slide-media-clickable";
    mediaWrap.appendChild(buildMediaElement(slide.media, slide.project.name));
    mediaWrap.addEventListener("click", () => {
      window.location.href = "project.html?slug=" + encodeURIComponent(slide.project.slug);
    });

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
// that project's own page.
(async function () {
  const grid = document.getElementById("archiveGrid");
  if (!grid || typeof window.loadProjects !== "function") return;

  const projects = await window.loadProjects();
  const slides = buildSlides(projects);

  slides.forEach((slide) => {
    const li = document.createElement("li");
    li.className = "archive-cell";

    const a = document.createElement("a");
    a.className = "archive-thumb";
    a.href = "project.html?slug=" + encodeURIComponent(slide.project.slug);
    a.title = slide.project.name;

    a.appendChild(buildThumbnailElement(slide.media, slide.project.name));
    li.appendChild(a);
    grid.appendChild(li);
  });
})();

// Project page - the case-study page a home-slider click lands on.
// Shows one media item large ("hero", click-to-play if it's a video) plus
// the rest of the project's media as a thumbnail row that swaps the hero;
// below that, the description, Andrea's role, and everyone else's credits.
(async function () {
  const heading = document.getElementById("projectHeading");
  const heroWrap = document.getElementById("projectHero");
  if (!heading || !heroWrap || typeof window.loadProjects !== "function") return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const projects = await window.loadProjects();
  const project = projects.find((p) => p.slug === slug) || projects[0];
  if (!project) return;

  document.title = project.name + " - Andrea";
  heading.textContent = project.name;

  const media = project.media || [];

  function renderHero(item) {
    heroWrap.innerHTML = "";
    heroWrap.appendChild(buildHeroMediaElement(item, project.name));
  }

  renderHero(media[0]);

  const thumbsWrap = document.getElementById("projectThumbs");
  if (thumbsWrap && media.length > 1) {
    media.slice(1).forEach((item) => {
      const button = document.createElement("button");
      button.className = "project-thumb";
      button.setAttribute("aria-label", "Show this media");
      button.appendChild(buildThumbnailElement(item, project.name));
      button.addEventListener("click", () => renderHero(item));
      thumbsWrap.appendChild(button);
    });
  }

  const descriptionEl = document.getElementById("projectDescription");
  if (descriptionEl) {
    if (project.description) {
      descriptionEl.textContent = project.description;
    } else {
      descriptionEl.remove();
    }
  }

  const roleEl = document.getElementById("projectRole");
  if (roleEl) {
    if (project.role) {
      roleEl.textContent = project.role;
    } else {
      roleEl.remove();
    }
  }

  const creditsEl = document.getElementById("projectCredits");
  if (creditsEl) {
    const credits = project.credits || [];
    if (credits.length) {
      creditsEl.textContent = credits.map((c) => `${c.role}: ${c.name}`).join(", ") + ",";
    } else {
      creditsEl.remove();
    }
  }

  const castEl = document.getElementById("projectCast");
  if (castEl) {
    if (project.cast) {
      castEl.textContent = "Starring: " + project.cast;
    } else {
      castEl.remove();
    }
  }
})();

// Hero media for the project page. Images/embeds render plainly; an
// uploaded video file starts paused behind a big click-to-play button,
// then hands off to native controls once playing.
function buildHeroMediaElement(media, altText) {
  if (!media) return document.createElement("div");

  if (media.type !== "video") {
    const block = document.createElement("div");
    block.className = "project-block";
    block.appendChild(buildMediaElement(media, altText));
    return block;
  }

  const block = document.createElement("div");
  block.className = "project-block project-video-block";

  const video = document.createElement("video");
  video.src = media.src;
  if (media.poster) video.poster = media.poster;
  video.playsInline = true;
  video.setAttribute("aria-label", altText);

  const playButton = document.createElement("button");
  playButton.className = "project-play";
  playButton.setAttribute("aria-label", "Play video");
  playButton.innerHTML = '<svg viewBox="0 0 24 24" width="64" height="64"><path d="M8 5v14l11-7z" fill="white"/></svg>';

  playButton.addEventListener("click", () => {
    video.controls = true;
    video.play().catch(() => {});
  });

  video.addEventListener("play", () => {
    playButton.style.display = "none";
  });

  video.addEventListener("pause", () => {
    if (!video.ended) playButton.style.display = "";
  });

  block.appendChild(video);
  block.appendChild(playButton);
  return block;
}

// Photography page - a flat justified/grid gallery of standalone photos.
(async function () {
  const grid = document.getElementById("photoGrid");
  if (!grid || typeof window.loadPhotos !== "function") return;

  const photos = await window.loadPhotos();
  photos.forEach((photo, index) => {
    const a = document.createElement("a");
    a.href = "photo-viewer.html#" + index;

    const img = document.createElement("img");
    img.src = photo.url;
    img.alt = photo.heading || "";
    img.loading = "lazy";

    a.appendChild(img);
    grid.appendChild(a);
  });
})();

// Single-photo viewer - reached from the Photography grid's "Index" link.
// Desktop scroll-snaps between photos; mobile is a plain stacked scroll
// (see the CSS). Either way, a fixed caption shows whichever photo is
// currently in view, tracked the same way the home slider tracks slides.
(async function () {
  const track = document.getElementById("photoSlides");
  if (!track || typeof window.loadPhotos !== "function") return;

  const photos = await window.loadPhotos();
  if (!photos.length) return;

  const headingEl = document.getElementById("photoHeading");
  const subheadingEl = document.getElementById("photoSubheading");
  const counterEl = document.getElementById("photoCounter");

  const sections = photos.map((photo, index) => {
    const section = document.createElement("section");
    section.className = "photo-slide";
    section.dataset.index = String(index);

    const img = document.createElement("img");
    img.src = photo.url;
    img.alt = photo.heading || "";

    section.appendChild(img);
    track.appendChild(section);
    return section;
  });

  function updateCaption(index) {
    const photo = photos[index];
    headingEl.textContent = photo.heading || "";
    subheadingEl.textContent = photo.subheading || "";
    if (counterEl) counterEl.textContent = (index + 1) + "/" + photos.length;
    history.replaceState(null, "", "#" + index);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        updateCaption(Number(entry.target.dataset.index));
      }
    });
  }, { threshold: [0.6] });

  sections.forEach((section) => observer.observe(section));

  let startIndex = 0;
  const hashIndex = parseInt(window.location.hash.replace("#", ""), 10);
  if (!isNaN(hashIndex) && hashIndex >= 0 && hashIndex < photos.length) {
    startIndex = hashIndex;
  }
  sections[startIndex].scrollIntoView({ block: "start" });
  updateCaption(startIndex);
})();
