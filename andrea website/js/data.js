// Fallback/demo data - used automatically until js/sanity-config.js is
// filled in with a real Sanity project ID. Once Sanity is connected, this
// is ignored in favor of live content (see sanity-client.js).
window.FALLBACK_PROJECTS = [
  {
    slug: "lululemon-train",
    name: "Lululemon – Train",
    description: "Let the product breathe in its actual world. Wild concept, right? We shot this on location with the real team, in the real gym, at the end of a real session, because a training kit doesn't belong on a white backdrop.",
    role: "Director, Editor",
    credits: [
      { role: "DP", name: "Jesse Bronstein" },
      { role: "Producer", name: "John Rains" },
      { role: "Color", name: "Juliana Ronderos" },
      { role: "Brand", name: "Lululemon" }
    ],
    cast: "Sam Rivera and Priya Nair",
    media: [
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://picsum.photos/seed/lltrain1/1400/1050" },
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", poster: "https://picsum.photos/seed/lltrain2/1400/1050" },
      { type: "image", src: "https://picsum.photos/seed/lltrain3/1400/1050" }
    ]
  },
  {
    slug: "lululemon-yoga",
    name: "Lululemon – Yoga",
    description: "A quiet, unhurried look at practice rather than performance, drawn from a single early-morning session with no retakes.",
    role: "Director, Editor",
    credits: [
      { role: "DP", name: "Pierce Townsend" },
      { role: "Producer", name: "John Rains" },
      { role: "Brand", name: "Lululemon" }
    ],
    media: [
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", poster: "https://picsum.photos/seed/llyoga1/1400/1050" },
      { type: "image", src: "https://picsum.photos/seed/llyoga2/1400/1050" },
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", poster: "https://picsum.photos/seed/llyoga3/1400/1050" }
    ]
  },
  {
    slug: "nike-run",
    name: "Nike – Run",
    description: "Shot alongside a real training group at dawn, built around the sound of feet on pavement rather than a scripted moment.",
    role: "Director, Editor",
    credits: [
      { role: "DP", name: "Jesse Bronstein" },
      { role: "Brand", name: "Nike" }
    ],
    media: [
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", poster: "https://picsum.photos/seed/nikerun1/1400/1050" },
      { type: "image", src: "https://picsum.photos/seed/nikerun2/1400/1050" }
    ]
  },
  {
    slug: "nike-studio",
    name: "Nike – Studio",
    description: "A controlled studio counterpoint to the run piece, built around texture and stillness rather than motion.",
    role: "Director, Editor",
    credits: [
      { role: "Photo", name: "Pierce Townsend" },
      { role: "Art", name: "Chantelle Adams" },
      { role: "Brand", name: "Nike" }
    ],
    media: [
      { type: "image", src: "https://picsum.photos/seed/nikestudio1/1400/1050" },
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", poster: "https://picsum.photos/seed/nikestudio2/1400/1050" }
    ]
  }
];

// Demo photos for the Photography page - mixed landscape/portrait aspect
// ratios so the justified grid lays out realistically.
window.FALLBACK_PHOTOS = [
  "https://picsum.photos/seed/photo01/1200/800",
  "https://picsum.photos/seed/photo02/900/1200",
  "https://picsum.photos/seed/photo03/1200/900",
  "https://picsum.photos/seed/photo04/1000/1300",
  "https://picsum.photos/seed/photo05/1300/900",
  "https://picsum.photos/seed/photo06/950/1250",
  "https://picsum.photos/seed/photo07/1200/850",
  "https://picsum.photos/seed/photo08/1100/1400",
  "https://picsum.photos/seed/photo09/1250/900",
  "https://picsum.photos/seed/photo10/900/1150",
  "https://picsum.photos/seed/photo11/1300/950",
  "https://picsum.photos/seed/photo12/1000/1300",
  "https://picsum.photos/seed/photo13/1200/800",
  "https://picsum.photos/seed/photo14/950/1250",
  "https://picsum.photos/seed/photo15/1250/900",
  "https://picsum.photos/seed/photo16/1000/1300"
];
