export default function Header({ problem }) {
  return (
    <header className="header">
      <span className="wordmark">Rungline</span>
      {problem && (
        <span className="context">
          {problem.topic} <span className="context-sep">·</span> Grade {problem.grade}
        </span>
      )}
      <style>{`
        .header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
          background: var(--surface);
        }
        .wordmark {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 19px;
          color: var(--accent);
          letter-spacing: -0.01em;
        }
        .context {
          color: var(--text-dim);
          font-size: 13px;
        }
        .context-sep {
          color: var(--border);
          margin: 0 2px;
        }
      `}</style>
    </header>
  );
}
