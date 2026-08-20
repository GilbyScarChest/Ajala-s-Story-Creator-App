import { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { toolMeta } from '../../workspace/tools';
import { GUIDE_TOPICS } from './guideContent';

export function GuideApp({ onBack }: { onBack: () => void }) {
  const meta = toolMeta('guide');
  const [topicId, setTopicId] = useState(GUIDE_TOPICS[0].id);
  const topic = GUIDE_TOPICS.find((t) => t.id === topicId)!;

  return (
    <ToolShell
      title="Guide"
      accent={meta.accent}
      subtitle="How to use each tool, straight from the book."
      onBack={onBack}
      tabs={GUIDE_TOPICS.map((t) => ({ id: t.id, label: t.title }))}
      activeTab={topicId}
      onTabChange={setTopicId}
    >
      <div className="space-y-6">
        {topic.sections.map((section) => (
          <div
            key={section.heading}
            className="rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]"
          >
            <h3 className="m-0 mb-2 text-xl" style={{ color: topic.accent }}>
              {section.heading}
            </h3>
            <p className="m-0 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">{section.body}</p>
          </div>
        ))}
      </div>
    </ToolShell>
  );
}
