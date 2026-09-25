import type { ChangeEvent } from 'react';

interface BaseProps {
  label: string;
  prompt?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accent?: string;
}

interface InputProps extends BaseProps {
  as?: 'input';
}

interface TextAreaProps extends BaseProps {
  as: 'textarea';
  rows?: number;
}

type FormFieldProps = InputProps | TextAreaProps;

export function FormField(props: FormFieldProps) {
  const { label, prompt, value, onChange, placeholder, accent = 'var(--color-gold-500)' } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value);

  return (
    <label className="block">
      <span className="block font-serif text-[1.05rem] text-[var(--color-ink)] mb-1">{label}</span>
      {prompt && <span className="block text-sm text-[var(--color-ink-faint)] italic mb-2 leading-snug">{prompt}</span>}
      {props.as === 'textarea' ? (
        <textarea
          className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-card)] px-4 py-3 text-[0.97rem] leading-relaxed text-[var(--color-ink)] shadow-sm outline-none transition focus:border-transparent focus:ring-2 resize-y"
          style={{ ['--tw-ring-color' as string]: accent }}
          rows={props.rows ?? 4}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      ) : (
        <input
          className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-card)] px-4 py-2.5 text-[0.97rem] text-[var(--color-ink)] shadow-sm outline-none transition focus:border-transparent focus:ring-2"
          style={{ ['--tw-ring-color' as string]: accent }}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      )}
    </label>
  );
}
