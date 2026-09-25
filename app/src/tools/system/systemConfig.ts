import magicBuilderIcon from '../../assets/icons/magic-builder.png';
import beliefBuilderIcon from '../../assets/icons/belief-builder.png';
import technologyBuilderIcon from '../../assets/icons/technology-builder.png';
import type { ToolId } from '../../workspace/tools';

export type SystemType = 'magic' | 'technology' | 'belief';
export type SystemStoryKey = 'magicSystems' | 'technologySystems' | 'beliefSystems';

export interface SpinePiece {
  text?: string;
  blank?: { field: string; label: string };
}

interface HistoryQuestions {
  origin: string;
  timeline: string;
  whoUses: string;
  qualifications: string;
  awareness: string;
  awarenessReason: string;
  culture: string;
  rulingBody: string;
}

interface SystemTypeConfig {
  toolId: ToolId;
  storyKey: SystemStoryKey;
  singular: string;
  icon: string;
  subtitle: string;
  rulesKind: 'power' | 'belief';
  powerQuestions?: {
    name: string;
    base: string;
    description: string;
    application: string;
    limits: string;
    consequences: string;
    variations: string;
  };
  beliefQuestions?: {
    name: string;
    ideology: string;
    rituals: string;
    commandments: string;
    consequences: string;
    sects: string;
  };
  historyQuestions: HistoryQuestions;
  spine: SpinePiece[];
}

const historyQuestions = (subject: string, subjectCap: string, whoLabel: string): HistoryQuestions => ({
  origin: `How did ${subject} begin?`,
  timeline: 'What are the major historical events?',
  whoUses: `Who can ${whoLabel} ${subject}?`,
  qualifications: `Why can they ${whoLabel} ${subject}?`,
  awareness: `Who knows about ${subject}?`,
  awarenessReason: `Why do they know about ${subject}?`,
  culture: `What is the culture created by ${subject}?`,
  rulingBody: `How is ${subjectCap} governed?`,
});

export const SYSTEM_CONFIG: Record<SystemType, SystemTypeConfig> = {
  magic: {
    toolId: 'magic-builder',
    storyKey: 'magicSystems',
    singular: 'Magic System',
    icon: magicBuilderIcon,
    subtitle:
      'A magic system is the how and why your magic works. Building it well means knowing both the Rules and the History.',
    rulesKind: 'power',
    powerQuestions: {
      name: 'What is magic called?',
      base: 'What is magic based on?',
      description: 'What is magic?',
      application: 'How does magic work?',
      limits: 'What are the limits/costs of magic?',
      consequences: 'What are the consequences of magic?',
      variations: 'Types of magic',
    },
    historyQuestions: historyQuestions('magic', 'magic', 'use'),
    spine: [
      { text: 'Magic is called ' },
      { blank: { field: 'name', label: "Magic's Name" } },
      { text: ', and is based on ' },
      { blank: { field: 'base', label: 'Magic Base' } },
      { text: '. Magic comes from ' },
      { blank: { field: 'energy', label: 'Magic Source' } },
      { text: '. Practitioners are called ' },
      { blank: { field: 'whoUses', label: "Practitioners' Name" } },
      { text: '. They can practice because ' },
      { blank: { field: 'qualifications', label: 'Qualifications' } },
      { text: '. They use magic by ' },
      { blank: { field: 'application', label: 'Magic Application' } },
      { text: '. There are also ' },
      { blank: { field: 'variations', label: 'Variations' } },
      { text: '. The rules of magic are ' },
      { blank: { field: 'limits', label: 'Magic Rules' } },
      { text: '. If you break the rules, ' },
      { blank: { field: 'consequences', label: 'Magical Consequences' } },
      { text: '. Magic has been around since ' },
      { blank: { field: 'timeline', label: 'Magical Timeline' } },
      { text: '. The people who know about this magic are ' },
      { blank: { field: 'awareness', label: 'Magical Awareness' } },
      { text: ', because ' },
      { blank: { field: 'awarenessReason', label: 'Reason' } },
      { text: '. Which creates ' },
      { blank: { field: 'culture', label: 'Magic Life' } },
      { text: '. And is governed by ' },
      { blank: { field: 'rulingBody', label: "Magic's Ruling Body" } },
      { text: '.' },
    ],
  },
  technology: {
    toolId: 'technology-builder',
    storyKey: 'technologySystems',
    singular: 'Technology System',
    icon: technologyBuilderIcon,
    subtitle:
      'Building a tech system is nearly identical to building a magic system — the more you think about how it works, the less the audience has to.',
    rulesKind: 'power',
    powerQuestions: {
      name: 'What is technology called?',
      base: 'What is technology based on?',
      description: 'What is technology?',
      application: 'How does technology work?',
      limits: 'What are the limits/costs of technology?',
      consequences: 'What are the consequences of technology?',
      variations: 'Types of technology',
    },
    historyQuestions: historyQuestions('technology', 'technology', 'use'),
    spine: [
      { text: 'Technology is called ' },
      { blank: { field: 'name', label: "Technology's Name" } },
      { text: ', and is based on ' },
      { blank: { field: 'base', label: 'Technology Base' } },
      { text: '. You use technology by ' },
      { blank: { field: 'application', label: 'Technology Application' } },
      { text: '. There are also ' },
      { blank: { field: 'variations', label: 'Technological Variations' } },
      { text: '. The rules of technology are ' },
      { blank: { field: 'limits', label: 'Technology Rules' } },
      { text: '. If you break the rules, ' },
      { blank: { field: 'consequences', label: 'Technological Consequences' } },
      { text: '. Technology has been around since ' },
      { blank: { field: 'timeline', label: 'Technology Timeline' } },
      { text: ', and comes from ' },
      { blank: { field: 'origin', label: 'Technology Origin' } },
      { text: '. It can be used by ' },
      { blank: { field: 'whoUses', label: 'Users' } },
      { text: '. Those who know about the technology are ' },
      { blank: { field: 'awareness', label: 'Technological Awareness' } },
      { text: ', because ' },
      { blank: { field: 'awarenessReason', label: 'Reason' } },
      { text: '. Which creates ' },
      { blank: { field: 'culture', label: 'Technology Life' } },
      { text: '. And is governed by ' },
      { blank: { field: 'rulingBody', label: "Technology's Ruling Body" } },
      { text: '.' },
    ],
  },
  belief: {
    toolId: 'belief-builder',
    storyKey: 'beliefSystems',
    singular: 'Belief System',
    icon: beliefBuilderIcon,
    subtitle:
      'A belief system adds depth and spirituality to a story. Building it is about constructing moral and ethical stories that ground your characters.',
    rulesKind: 'belief',
    beliefQuestions: {
      name: 'What is the belief called?',
      ideology: 'What is the ideology?',
      rituals: "What are the belief's practices?",
      commandments: 'What are the laws of the belief?',
      consequences: 'What are the consequences of breaking the rules?',
      sects: 'Other sects or denominations',
    },
    historyQuestions: historyQuestions('the belief', 'the belief', 'practice'),
    spine: [
      { text: 'Belief is called ' },
      { blank: { field: 'name', label: "Belief's Name" } },
      { text: ', and is based on ' },
      { blank: { field: 'ideology', label: "Belief's Ideology" } },
      { text: '. Believers are called ' },
      { blank: { field: 'whoUses', label: "Believers' Name" } },
      { text: '. They can practice because ' },
      { blank: { field: 'qualifications', label: 'Qualifications' } },
      { text: '. They practice their belief by ' },
      { blank: { field: 'rituals', label: 'Rituals' } },
      { text: '. There are also ' },
      { blank: { field: 'sects', label: 'Sects / Denominations' } },
      { text: '. The rules of this belief are ' },
      { blank: { field: 'commandments', label: 'Commandments' } },
      { text: '. If you break the rules, ' },
      { blank: { field: 'consequences', label: 'Consequences' } },
      { text: '. This belief has been around since ' },
      { blank: { field: 'timeline', label: 'Timeline' } },
      { text: ', and comes from ' },
      { blank: { field: 'origin', label: 'Origin' } },
      { text: '. The people who know about this belief are ' },
      { blank: { field: 'awareness', label: 'Awareness' } },
      { text: ', because ' },
      { blank: { field: 'awarenessReason', label: 'Reason' } },
      { text: '. Which creates ' },
      { blank: { field: 'culture', label: 'Belief Culture' } },
      { text: '. And is governed by ' },
      { blank: { field: 'rulingBody', label: "Belief's Ruling Body" } },
      { text: '.' },
    ],
  },
};
