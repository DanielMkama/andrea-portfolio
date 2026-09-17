// Fallback/demo data - used automatically until js/sanity-config.js is
// filled in with a real Sanity project ID. Once Sanity is connected, this
// is ignored in favor of live content (see sanity-client.js).
window.FALLBACK_PROJECTS = [
  {
    slug: "lululemon-train",
    name: "Lululemon – Train",
    description: "A director's cut about putting the product back into its actual world, not a studio recreation of one. The kit was built for a real session, so we shot it during one: same gym, same team, same fatigue by the end. Nothing about a training piece should look rested. We built the edit around the parts most footage cuts around, the pause before the last set, the look between reps, the moment someone stops performing for the camera and just finishes the workout. No countdown clock, no finish line. Just the work itself, and what it actually looks like when nobody's posing for it.",
    role: "Director, Editor",
    credits: [
      { role: "DP", name: "Jesse Bronstein" },
      { role: "Edit", name: "John Rains" },
      { role: "Production Co", name: "Fieldwork" },
      { role: "Color", name: "Juliana Ronderos" }
    ],
    cast: "Sam Rivera and Priya Nair",
    media: [
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://picsum.photos/seed/lltrain1/1400/1050" },
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", poster: "https://picsum.photos/seed/lltrain2/1400/1050" },
      { type: "image", src: "https://picsum.photos/seed/lltrain3/1400/1050" }
    ],
    outtakes: [
      { type: "image", src: "https://picsum.photos/seed/lltrainout1/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/lltrainout2/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/lltrainout3/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/lltrainout4/900/1350" }
    ]
  },
  {
    slug: "lululemon-yoga",
    name: "Lululemon – Yoga",
    description: "A quiet, unhurried look at practice rather than performance. Most yoga content is shot like a highlight reel, the deepest stretch, the cleanest line, the pose held just long enough for the camera. We wanted the opposite: the wobble before balance, the exhale that isn't flattering, the fifteen minutes of a session where nothing photogenic happens at all. One participant, one mat, one uncut early-morning hour, shot as it actually unfolded rather than restaged for coverage. The stillness in the final edit is real stillness, not a pause we manufactured after the fact.",
    role: "Director, Editor",
    credits: [
      { role: "DP", name: "Pierce Townsend" },
      { role: "Edit", name: "Chantelle Adams" },
      { role: "Production Co", name: "Northline" }
    ],
    media: [
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", poster: "https://picsum.photos/seed/llyoga1/1400/1050" },
      { type: "image", src: "https://picsum.photos/seed/llyoga2/1400/1050" },
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", poster: "https://picsum.photos/seed/llyoga3/1400/1050" }
    ],
    outtakes: [
      { type: "image", src: "https://picsum.photos/seed/llyogaout1/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/llyogaout2/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/llyogaout3/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/llyogaout4/900/1350" }
    ]
  },
  {
    slug: "nike-run",
    name: "Nike – Run",
    description: "A film about the fifteen minutes before a run actually starts, the group chat that turns into a group, the small talk in the parking lot, the reluctant first quarter mile before anyone finds their pace. We followed an existing running crew at dawn instead of casting one, so the pack behavior, the pacing, the jokes between people who train together every week, all of it is unscripted. No finish-line shot. The film ends mid-stride, because that's where the run actually was when we stopped filming, not when the story felt done.",
    role: "Director, Editor",
    credits: [
      { role: "DP", name: "Jesse Bronstein" },
      { role: "Edit", name: "Davy Solis" },
      { role: "Production Co", name: "Fieldwork" }
    ],
    media: [
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", poster: "https://picsum.photos/seed/nikerun1/1400/1050" },
      { type: "image", src: "https://picsum.photos/seed/nikerun2/1400/1050" }
    ],
    outtakes: [
      { type: "image", src: "https://picsum.photos/seed/nikerunout1/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/nikerunout2/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/nikerunout3/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/nikerunout4/900/1350" }
    ]
  },
  {
    slug: "nike-studio",
    name: "Nike – Studio",
    description: "The deliberate counterpoint to the run piece: everything the road film wasn't, controlled, still, indoors. Where that one was about momentum, this one is about the object itself, the weight of the fabric, the way the material sits under studio light without anyone moving through it. We built the set to disappear rather than announce itself, letting the product hold the frame without a body to distract from it. It's a quieter film by design, meant to be looked at rather than watched, closer to a held breath than a scene.",
    role: "Director, Editor",
    credits: [
      { role: "Photo", name: "Pierce Townsend" },
      { role: "Art", name: "Chantelle Adams" },
      { role: "Production Co", name: "Northline" }
    ],
    media: [
      { type: "image", src: "https://picsum.photos/seed/nikestudio1/1400/1050" },
      { type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", poster: "https://picsum.photos/seed/nikestudio2/1400/1050" }
    ],
    outtakes: [
      { type: "image", src: "https://picsum.photos/seed/nikestudioout1/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/nikestudioout2/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/nikestudioout3/900/1350" },
      { type: "image", src: "https://picsum.photos/seed/nikestudioout4/900/1350" }
    ]
  }
];

// Demo photos for the Photography page - 15 portrait + 1 landscape source
// image, matching the reference grid's mix. The grid itself crops every
// cell to a uniform 2:3 box via object-fit: cover regardless of the
// source's own orientation. Each also carries a heading/subheading pair
// for the single-photo viewer.
window.FALLBACK_PHOTOS = [
  { url: "https://picsum.photos/seed/photo01/800/1200", heading: "Studio Visit", subheading: "Working Objects" },
  { url: "https://picsum.photos/seed/photo02/800/1200", heading: "Studio Visit", subheading: "Working Objects" },
  { url: "https://picsum.photos/seed/photo03/800/1200", heading: "Studio Visit", subheading: "Working Objects" },
  { url: "https://picsum.photos/seed/photo04/800/1200", heading: "Coastal Light", subheading: "Morning Series" },
  { url: "https://picsum.photos/seed/photo05/1200/800", heading: "Coastal Light", subheading: "Morning Series" },
  { url: "https://picsum.photos/seed/photo06/800/1200", heading: "Coastal Light", subheading: "Morning Series" },
  { url: "https://picsum.photos/seed/photo07/800/1200", heading: "Field Notes", subheading: "Personal Work" },
  { url: "https://picsum.photos/seed/photo08/800/1200", heading: "Field Notes", subheading: "Personal Work" },
  { url: "https://picsum.photos/seed/photo09/800/1200", heading: "Field Notes", subheading: "Personal Work" },
  { url: "https://picsum.photos/seed/photo10/800/1200", heading: "Interiors", subheading: "Quiet Spaces" },
  { url: "https://picsum.photos/seed/photo11/800/1200", heading: "Interiors", subheading: "Quiet Spaces" },
  { url: "https://picsum.photos/seed/photo12/800/1200", heading: "Interiors", subheading: "Quiet Spaces" },
  { url: "https://picsum.photos/seed/photo13/800/1200", heading: "On Location", subheading: "Behind the Scenes" },
  { url: "https://picsum.photos/seed/photo14/800/1200", heading: "On Location", subheading: "Behind the Scenes" },
  { url: "https://picsum.photos/seed/photo15/800/1200", heading: "On Location", subheading: "Behind the Scenes" },
  { url: "https://picsum.photos/seed/photo16/800/1200", heading: "On Location", subheading: "Behind the Scenes" }
];
