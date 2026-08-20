export interface GuideTopic {
  id: string;
  title: string;
  accent: string;
  sections: { heading: string; body: string }[];
}

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: 'story-creator',
    title: 'Story Creator Method',
    accent: 'var(--color-gold-600)',
    sections: [
      {
        heading: 'Macro to Micro',
        body: 'The Story Creator Method is the macro to micro approach to story development — big things first, then little things. You need a plot of land before you can build a house.',
      },
      {
        heading: 'The Workflow',
        body: 'Idea → Setting → Characters → Plot (Intention, Obstacle, Stakes, Timeframe) → The Ending → The Beginning → The Middle. Each step lets you zoom in on what your story really is, and each new answer influences the next.',
      },
      {
        heading: 'Know Your Ending First',
        body: 'Start with an idea of how the story ends before you write the beginning. Good set-up followed by a mediocre ending can make the whole story fall into obscurity — know your ending, then you know where to begin.',
      },
      {
        heading: 'The 7-Essential Story Elements',
        body: 'Established Norm, Inciting Incident, Rising Action, Rising Reaction, Climax, Falling Action, Resolution — the bones of every story. The Beginning is built from the Established Norm and Inciting Incident, the Middle from Rising Action and Rising Reaction, and the End from Climax, Falling Action, and Resolution. Check the Reference Tools screen for the full glossary.',
      },
    ],
  },
  {
    id: 'world-builder',
    title: 'World Builder',
    accent: 'var(--color-world-500)',
    sections: [
      {
        heading: 'Three Elements',
        body: 'A world has three main elements: Geography, Society, and Culture. Geography affects society and culture more than the reverse, so build macro to micro — start with the land, then the people, then what the people create.',
      },
      {
        heading: 'A Reference Tool, Not an Almanac',
        body: "You don't have to fill in every field in exhaustive detail. This is a reference tool for you, the author — most of it won't make the final draft, but knowing it makes everything you do write feel deeper.",
      },
      {
        heading: 'When to Use It',
        body: "If your story requires a deeper understanding of a unique setting than just the basic when/where/what/why from the Story Builder's Setting step, you're world building.",
      },
    ],
  },
  {
    id: 'magic-builder',
    title: 'Magic Builder',
    accent: 'var(--color-magic-500)',
    sections: [
      {
        heading: 'Rules + History',
        body: 'Every system — Magic, Belief, or Technology — is built from two parts: Rules (what it is and its limits) and History (where it came from and who knows about it).',
      },
      {
        heading: 'Limits Make It Real',
        body: "A major part of defining what magic can do is defining what magic can't do. Unlimited power for a common person makes for a less interesting world unless that power is checked by something.",
      },
      {
        heading: 'World Of vs. World With',
        body: 'If your story uses magic as a major plot element, you are creating a world OF magic — the audience needs to understand the system. If magic is just background color, you are creating a world WITH magic — only you need to fully understand it.',
      },
      {
        heading: 'The Spine',
        body: 'Once you fill in enough of the Rules and History tabs, the Spine tab automatically weaves them into one flowing paragraph — a quick way to sanity-check that your system hangs together.',
      },
    ],
  },
  {
    id: 'belief-builder',
    title: 'Belief Builder',
    accent: 'var(--color-belief-500)',
    sections: [
      {
        heading: 'Rules + History',
        body: "A belief system's Rules cover its Ideology, Rituals, Commandments, Consequences for breaking them, and any Sects or Denominations. Its History covers Origin, Timeline, Believers, Awareness, Lifestyle, and Hierarchy.",
      },
      {
        heading: 'Grounding Characters',
        body: 'Building a belief is about constructing moral and ethical scaffolding that helps a character with their own conundrums. It can explore the nature of living, how we got here, and the purpose of life.',
      },
    ],
  },
  {
    id: 'technology-builder',
    title: 'Technology Builder',
    accent: 'var(--color-tech-500)',
    sections: [
      {
        heading: "It's Basically Magic",
        body: "Building a tech system is nearly identical to building a magic system. Rules cover Name, Base, Application (Energy/Channel/Trigger/Result), Limits, Consequences, and Variations. History covers Origin, Timeline, Users, Qualifications, Awareness, and Ruling Body.",
      },
      {
        heading: 'Know It So the Audience Doesn’t Have To',
        body: 'The more you think through how your tech works, the less the audience has to — which makes it easier for them to stay focused on plot and character instead of the mechanics.',
      },
    ],
  },
  {
    id: 'character-profiler',
    title: 'Character Profiler',
    accent: 'var(--color-character-500)',
    sections: [
      {
        heading: 'Six Main Traits',
        body: 'Background, Current Living Status, Relationship Status, Unique Traits, Personality Traits, and Backstory — built big to small, same as everything else in this method.',
      },
      {
        heading: 'Build Everyone Like a Protagonist',
        body: 'Every character, no matter how small, should be built out like a protagonist. People are people no matter how important they are to your plot — even antagonists.',
      },
      {
        heading: 'Context, Consequences, Reasons',
        body: "When you use a character, remember the context of who they are, the consequences of their actions, and the reasons behind them. A character's actions should match their words, or the audience loses sympathy.",
      },
      {
        heading: 'Empathy vs. Sympathy',
        body: 'Sympathy is understanding someone. Empathy is understanding and sharing their feelings. You want your audience sympathetic toward every character, and empathetic toward your most important ones.',
      },
    ],
  },
];
