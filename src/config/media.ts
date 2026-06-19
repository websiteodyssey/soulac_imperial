// Curated fine-dining + seaside photography (Unsplash). All URLs verified reachable.
// Always layered behind a dark overlay or on an ink base so the design stays
// graceful even if a remote image fails to load.

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const media = {
  // Local brand assets
  banner: "/images/banniere.png",

  // Ambiance background video (free stock, hotlinkable) + fallback source
  video: "https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4",
  videoAlt: "https://videos.pexels.com/video-files/1739010/1739010-hd_1920_1080_30fps.mp4",

  hero: u("1579871494447-9811cf80d66c", 2000), // omakase / sushi, dark
  interior: u("1414235077428-338989a2e8c0", 1600), // atmospheric dining room
  reservation: u("1517248135467-4c7edcad34c4", 1600), // restaurant ambiance

  // "Our story" overlapping pair
  story: {
    a: u("1424847651672-bf20a4b0982b", 1200),
    b: u("1517248135467-4c7edcad34c4", 1100),
  },

  // Soulac-sur-Mer / Atlantic coast
  sea: {
    ocean: u("1507525428034-b723cf961d3e", 2000),
    beach: u("1505228395891-9a51e7e86bf6", 1600),
  },

  dishes: {
    sushi: u("1611143669185-af224c5e3252", 1000),
    sashimi: u("1535007813616-79dc02ba4021", 1000),
    ramen: u("1553621042-f6e147245754", 1000),
    rolls: u("1559339352-11d035aa65de", 1000),
    table: u("1504674900247-0877df9cc836", 1000),
    bowl: u("1546069901-ba9599a7e63c", 1000),
  },

  // Larger pool for the gallery (food + ambiance)
  gallery: [
    u("1579871494447-9811cf80d66c", 1100),
    u("1414235077428-338989a2e8c0", 1100),
    u("1611143669185-af224c5e3252", 1000),
    u("1553025934-296397db4010", 1000),
    u("1564489563601-c53cfc451e93", 1000),
    u("1607301405390-d831c242f59b", 1000),
    u("1580822184713-fc5400e7fe10", 1000),
    u("1626804475297-41608ea09aeb", 1000),
    u("1574484284002-952d92456975", 1000),
    u("1551782450-a2132b4ba21d", 1000),
    u("1544025162-d76694265947", 1000),
    u("1546833999-b9f581a1996d", 1000),
  ],
} as const;
