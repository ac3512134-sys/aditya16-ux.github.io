"use client";

type OutputCardProps = {
  title: string;
  items?: string[];
  content?: string;
};

export default function OutputCard({ title, items, content }: OutputCardProps) {
  const value = items ? items.join("\n") : content || "";

  const copyContent = async () => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-xl backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={copyContent}
          className="rounded-lg border border-white/20 px-3 py-1 text-sm text-white/80 transition hover:border-accent hover:text-white"
        >
          Copy
        </button>
      </div>

      {items ? (
        <ul className="space-y-3 text-sm text-white/80">
          {items.map((item) => (
            <li key={item} className="rounded-xl bg-white/5 p-3 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="whitespace-pre-line rounded-xl bg-white/5 p-3 text-sm leading-relaxed text-white/80">{content}</p>
      )}
    </div>
  );
}
