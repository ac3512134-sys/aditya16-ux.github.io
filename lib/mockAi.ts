export type ContentOutput = {
  captions: string[];
  instagramReelScript: string;
  youtubeShortsScript: string;
  hooks: string[];
  hashtags: string[];
  titleIdeas: string[];
};

const buildList = (topic: string, prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${prefix} ${index + 1}: ${topic}`);

export const generateMockContent = async (topic: string): Promise<ContentOutput> => {
  const cleanTopic = topic.trim() || "Your Idea";

  return {
    captions: buildList(cleanTopic, "Instagram caption", 7).map(
      (caption) => `${caption} — actionable, relatable, and built to spark comments.`
    ),
    instagramReelScript: `Hook: "If you're struggling with ${cleanTopic}, stop scrolling."
Scene 1: Show the pain point in 3 seconds.
Scene 2: Deliver one simple framework to solve it.
Scene 3: CTA — "Save this and follow for more ${cleanTopic} growth tips."`,
    youtubeShortsScript: `Title Frame: "${cleanTopic} in 30 Seconds"
Beat 1: Share the biggest myth.
Beat 2: Reveal a practical strategy.
Beat 3: End with "Comment 'plan' and I'll send the checklist."`,
    hooks: [
      `Nobody talks about this ${cleanTopic} shortcut...`,
      `I tested 3 ${cleanTopic} strategies. Only one worked.`,
      `This ${cleanTopic} mistake is costing you growth.`,
      `Steal this ${cleanTopic} template before it goes viral.`,
      `I wish I knew this ${cleanTopic} framework sooner.`,
    ],
    hashtags: [
      "#contentstrategy",
      "#socialmediamarketing",
      "#creatorbusiness",
      "#growthtips",
      `#${cleanTopic.replace(/\s+/g, "").toLowerCase()}`,
    ],
    titleIdeas: [
      `${cleanTopic}: The 5-Minute Viral Content Method`,
      `How to Turn ${cleanTopic} Into 30 Days of Content`,
      `${cleanTopic} Blueprint for Instagram + Shorts`,
    ],
  };
};
