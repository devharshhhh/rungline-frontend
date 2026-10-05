export default function ProblemPanel({ problem }) {
  return (
    <div className="problem-panel">
      <h1>{problem.title}</h1>
      <p className="statement">{problem.statement}</p>

      <style>{`
        .problem-panel {
          padding: 24px;
          overflow-y: auto;
          height: 100%;
        }
        .problem-panel h1 {
          font-family: var(--font-display);
          font-size: 21px;
          font-weight: 600;
          margin: 0 0 16px;
          color: var(--text);
        }
        .statement {
          color: var(--text);
          white-space: pre-wrap;
          line-height: 1.65;
          font-size: 14.5px;
        }
      `}</style>
    </div>
  );
}
