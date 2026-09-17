// Fetches project/media content from Sanity's Query API (GROQ over HTTP -
// no SDK/build step needed). Falls back to window.FALLBACK_PROJECTS
// (js/data.js) if Sanity isn't configured yet or the request fails.
//
// Schema (studio/andrea-data-base/schemaTypes/project.js) allows three
// kinds of media items:
//   - image      -> Sanity image asset
//   - file       -> an uploaded video file (mp4/webm), played with <video>
//   - videoUrl   -> an external link (YouTube/Vimeo), embedded via <iframe>
window.loadProjects = (function () {
  const config = window.SANITY_CONFIG || {};
  const isConfigured = config.projectId && config.projectId !== "YOUR_PROJECT_ID";

  const QUERY = `*[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    order,
    description,
    role,
    credits[]{ role, name },
    cast,
    media[] {
      _type,
      _type == "image" => {
        "url": asset->url,
        "alt": title
      },
      _type == "file" => {
        "url": asset->url
      },
      _type == "videoUrl" => {
        url
      }
    }
  }`;

  // Turns a YouTube/Vimeo watch/share URL into an <iframe>-embeddable URL.
  function toEmbedUrl(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) {
        const id = u.searchParams.get("v") || u.pathname.split("/").pop();
        return id ? `https://www.youtube.com/embed/${id}` : url;
      }
      if (u.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
      }
      if (u.hostname.includes("vimeo.com")) {
        const id = u.pathname.split("/").filter(Boolean).pop();
        return id ? `https://player.vimeo.com/video/${id}` : url;
      }
    } catch (err) {
      // Not a valid absolute URL — fall through and use it as-is.
    }
    return url;
  }

  // Best-effort poster image for the Index page grid. YouTube exposes a
  // static thumbnail URL; Vimeo requires an oEmbed call, so those fall
  // back to the grid's plain background color instead.
  function toThumbnail(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) {
        const id = u.searchParams.get("v") || u.pathname.split("/").pop();
        return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
      }
      if (u.hostname === "youtu.be") {
        return `https://img.youtube.com/vi/${u.pathname.slice(1)}/hqdefault.jpg`;
      }
    } catch (err) {
      // ignore
    }
    return null;
  }

  function mapMedia(item, fallbackAlt) {
    if (!item || !item._type) return null;

    if (item._type === "image" && item.url) {
      return { type: "image", src: item.url, alt: item.alt || fallbackAlt };
    }
    if (item._type === "file" && item.url) {
      return { type: "video", src: item.url, alt: fallbackAlt };
    }
    if (item._type === "videoUrl" && item.url) {
      return {
        type: "embed",
        src: toEmbedUrl(item.url),
        poster: toThumbnail(item.url),
        alt: fallbackAlt
      };
    }
    return null;
  }

  async function fetchFromSanity() {
    const url = `https://${config.projectId}.api.sanity.io/v${config.apiVersion || "2024-01-01"}/data/query/${config.dataset || "production"}?query=${encodeURIComponent(QUERY)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Sanity request failed: " + res.status);
    const json = await res.json();

    return (json.result || []).map((doc) => ({
      id: doc._id,
      name: doc.title,
      slug: doc.slug,
      description: doc.description || "",
      role: doc.role || "",
      credits: doc.credits || [],
      cast: doc.cast || "",
      media: (doc.media || [])
        .map((item) => mapMedia(item, doc.title))
        .filter(Boolean)
    }));
  }

  return async function loadProjects() {
    if (isConfigured) {
      try {
        const projects = await fetchFromSanity();
        if (projects.length) return projects;
      } catch (err) {
        console.warn("Sanity fetch failed, using demo data instead:", err);
      }
    }
    return window.FALLBACK_PROJECTS || [];
  };
})();
