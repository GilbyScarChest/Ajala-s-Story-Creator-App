import { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { FormField } from '../../components/FormField';
import { useStory } from '../../context/StoryContext';
import { toolMeta } from '../../workspace/tools';
import { SYSTEM_CONFIG } from './systemConfig';
import type { SystemType } from './systemConfig';
import type { BeliefSystem, MagicSystem, TechnologySystem } from '../../types/story';

type Tab = 'rules' | 'history' | 'spine';

function fieldValue(obj: object, field: string): string {
  return (obj as Record<string, string>)[field] ?? '';
}

export function SystemBuilderApp({ systemType, onBack }: { systemType: SystemType; onBack: () => void }) {
  const config = SYSTEM_CONFIG[systemType];
  const meta = toolMeta(config.toolId);
  const { story, addSystem, updateSystem, updateSystemRules, updateSystemHistory, removeSystem } = useStory();
  const systems = story[config.storyKey] as (MagicSystem | TechnologySystem | BeliefSystem)[];
  const [selectedId, setSelectedId] = useState<string | null>(systems[0]?.id ?? null);
  const [tab, setTab] = useState<Tab>('rules');

  const selected = systems.find((s) => s.id === selectedId) ?? systems[0] ?? null;

  const handleAdd = () => {
    addSystem(config.storyKey, `New ${config.singular}`);
  };

  if (!selected) {
    return (
      <ToolShell title={config.singular + 's'} icon={config.icon} accent={meta.accent} subtitle={config.subtitle} onBack={onBack}>
        <div className="rounded-xl border border-dashed border-[var(--color-line-strong)] p-10 text-center">
          <p className="mb-4 text-[var(--color-ink-soft)]">
            You haven't created a {config.singular.toLowerCase()} yet.
          </p>
          <button
            onClick={handleAdd}
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ background: meta.accent }}
          >
            + New {config.singular}
          </button>
        </div>
      </ToolShell>
    );
  }

  return (
    <ToolShell
      title={config.singular + 's'}
      icon={config.icon}
      accent={meta.accent}
      subtitle={config.subtitle}
      onBack={onBack}
      tabs={[
        { id: 'rules', label: 'Rules' },
        { id: 'history', label: 'History' },
        { id: 'spine', label: 'Spine' },
      ]}
      activeTab={tab}
      onTabChange={setTab}
      headerExtra={
        <div className="flex flex-col items-end gap-2">
          <select
            value={selected.id}
            onChange={(e) => setSelectedId(e.target.value)}
            className="rounded-lg border border-[var(--color-line-strong)] bg-[var(--color-card)] px-3 py-1.5 text-sm"
          >
            {systems.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name || 'Untitled'}
              </option>
            ))}
          </select>
          <button onClick={handleAdd} className="text-xs font-medium text-[var(--color-ink-faint)] hover:underline">
            + New {config.singular}
          </button>
        </div>
      }
    >
      <div className="mb-7">
        <FormField
          accent={meta.accent}
          label={`${config.singular} Name`}
          value={selected.name}
          onChange={(name) => updateSystem(config.storyKey, selected.id, { name })}
        />
      </div>

      {tab === 'rules' && config.rulesKind === 'power' && config.powerQuestions && (
        <div className="space-y-7">
          <FormField accent={meta.accent} label={config.powerQuestions.name} value={fieldValue(selected.rules, 'name')} onChange={(name) => updateSystemRules(config.storyKey, selected.id, { name })} />
          <FormField accent={meta.accent} label={config.powerQuestions.base} value={fieldValue(selected.rules, 'base')} onChange={(base) => updateSystemRules(config.storyKey, selected.id, { base })} />
          <FormField as="textarea" accent={meta.accent} label={config.powerQuestions.description} value={fieldValue(selected.rules, 'description')} onChange={(description) => updateSystemRules(config.storyKey, selected.id, { description })} />
          <div>
            <span className="mb-2 block font-serif text-[1.05rem] text-[var(--color-ink)]">{config.powerQuestions.application}</span>
            <p className="mb-3 text-sm italic text-[var(--color-ink-faint)]">
              Every system has an Energy source, a Channel that shapes it, a Trigger that activates it, and a Result.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField accent={meta.accent} label="Energy" value={fieldValue(selected.rules, 'energy')} onChange={(energy) => updateSystemRules(config.storyKey, selected.id, { energy })} />
              <FormField accent={meta.accent} label="Channel" value={fieldValue(selected.rules, 'channel')} onChange={(channel) => updateSystemRules(config.storyKey, selected.id, { channel })} />
              <FormField accent={meta.accent} label="Trigger" value={fieldValue(selected.rules, 'trigger')} onChange={(trigger) => updateSystemRules(config.storyKey, selected.id, { trigger })} />
              <FormField accent={meta.accent} label="Result" value={fieldValue(selected.rules, 'result')} onChange={(result) => updateSystemRules(config.storyKey, selected.id, { result })} />
            </div>
          </div>
          <FormField as="textarea" accent={meta.accent} label={config.powerQuestions.limits} value={fieldValue(selected.rules, 'limits')} onChange={(limits) => updateSystemRules(config.storyKey, selected.id, { limits })} />
          <FormField as="textarea" accent={meta.accent} label={config.powerQuestions.consequences} value={fieldValue(selected.rules, 'consequences')} onChange={(consequences) => updateSystemRules(config.storyKey, selected.id, { consequences })} />
          <FormField as="textarea" accent={meta.accent} label={config.powerQuestions.variations} value={fieldValue(selected.rules, 'variations')} onChange={(variations) => updateSystemRules(config.storyKey, selected.id, { variations })} />
        </div>
      )}

      {tab === 'rules' && config.rulesKind === 'belief' && config.beliefQuestions && (
        <div className="space-y-7">
          <FormField accent={meta.accent} label={config.beliefQuestions.name} value={fieldValue(selected.rules, 'name')} onChange={(name) => updateSystemRules(config.storyKey, selected.id, { name })} />
          <FormField as="textarea" accent={meta.accent} label={config.beliefQuestions.ideology} value={fieldValue(selected.rules, 'ideology')} onChange={(ideology) => updateSystemRules(config.storyKey, selected.id, { ideology })} />
          <FormField as="textarea" accent={meta.accent} label={config.beliefQuestions.rituals} value={fieldValue(selected.rules, 'rituals')} onChange={(rituals) => updateSystemRules(config.storyKey, selected.id, { rituals })} />
          <FormField as="textarea" accent={meta.accent} label={config.beliefQuestions.commandments} value={fieldValue(selected.rules, 'commandments')} onChange={(commandments) => updateSystemRules(config.storyKey, selected.id, { commandments })} />
          <FormField as="textarea" accent={meta.accent} label={config.beliefQuestions.consequences} value={fieldValue(selected.rules, 'consequences')} onChange={(consequences) => updateSystemRules(config.storyKey, selected.id, { consequences })} />
          <FormField as="textarea" accent={meta.accent} label={config.beliefQuestions.sects} value={fieldValue(selected.rules, 'sects')} onChange={(sects) => updateSystemRules(config.storyKey, selected.id, { sects })} />
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-7">
          <FormField as="textarea" accent={meta.accent} label={config.historyQuestions.origin} value={selected.history.origin} onChange={(origin) => updateSystemHistory(config.storyKey, selected.id, { origin })} />
          <FormField as="textarea" accent={meta.accent} label={config.historyQuestions.timeline} value={selected.history.timeline} onChange={(timeline) => updateSystemHistory(config.storyKey, selected.id, { timeline })} />
          <FormField as="textarea" accent={meta.accent} label={config.historyQuestions.whoUses} value={selected.history.whoUses} onChange={(whoUses) => updateSystemHistory(config.storyKey, selected.id, { whoUses })} />
          <FormField as="textarea" accent={meta.accent} label={config.historyQuestions.qualifications} value={selected.history.qualifications} onChange={(qualifications) => updateSystemHistory(config.storyKey, selected.id, { qualifications })} />
          <FormField as="textarea" accent={meta.accent} label={config.historyQuestions.awareness} value={selected.history.awareness} onChange={(awareness) => updateSystemHistory(config.storyKey, selected.id, { awareness })} />
          <FormField as="textarea" accent={meta.accent} label={config.historyQuestions.awarenessReason} value={selected.history.awarenessReason} onChange={(awarenessReason) => updateSystemHistory(config.storyKey, selected.id, { awarenessReason })} />
          <FormField as="textarea" accent={meta.accent} label={config.historyQuestions.culture} value={selected.history.culture} onChange={(culture) => updateSystemHistory(config.storyKey, selected.id, { culture })} />
          <FormField as="textarea" accent={meta.accent} label={config.historyQuestions.rulingBody} value={selected.history.rulingBody} onChange={(rulingBody) => updateSystemHistory(config.storyKey, selected.id, { rulingBody })} />
        </div>
      )}

      {tab === 'spine' && (
        <SpineView systemType={systemType} rules={selected.rules} history={selected.history} accent={meta.accent} />
      )}

      <div className="mt-10 text-right">
        <button
          onClick={() => {
            removeSystem(config.storyKey, selected.id);
            setSelectedId(null);
          }}
          className="text-xs font-medium text-[var(--color-ink-faint)] hover:text-[var(--color-character-500)]"
        >
          Delete this {config.singular.toLowerCase()}
        </button>
      </div>
    </ToolShell>
  );
}

function SpineView({
  systemType,
  rules,
  history,
  accent,
}: {
  systemType: SystemType;
  rules: object;
  history: object;
  accent: string;
}) {
  const config = SYSTEM_CONFIG[systemType];
  const merged = { ...rules, ...history } as Record<string, string>;

  return (
    <div>
      <p className="mb-6 text-sm italic text-[var(--color-ink-faint)]">
        The Spine weaves your Rules and History into one narrative thread — fill in enough of both tabs and this
        paragraph writes itself.
      </p>
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-7 shadow-[var(--shadow-card)]">
        <p className="font-serif text-lg leading-relaxed text-[var(--color-ink)]">
          {config.spine.map((piece, i) => {
            if (piece.text !== undefined) return <span key={i}>{piece.text}</span>;
            if (piece.blank) {
              const value = merged[piece.blank.field];
              return (
                <span
                  key={i}
                  className="border-b-2 px-0.5"
                  style={{ borderColor: accent, color: value ? 'var(--color-ink)' : 'var(--color-ink-faint)' }}
                  title={piece.blank.label}
                >
                  {value || `[${piece.blank.label}]`}
                </span>
              );
            }
            return null;
          })}
        </p>
      </div>
    </div>
  );
}
