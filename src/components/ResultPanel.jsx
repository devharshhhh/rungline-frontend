export default function ResultPanel({ result, submitting }) {
  if (submitting) {
    return (
      <div className="result-panel idle">
        <span className="dim">Running your code…</span>
        <Styles />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-panel idle">
        <span className="dim">Run your code to see results here.</span>
        <Styles />
      </div>
    );
  }

  return (
    <div className="result-panel">
      <div className={`banner ${result.passed ? "pass" : "fail"}`}>
        {result.passed ? "All tests passed" : "Not quite — check the failing case below"}
      </div>
      <ul className="cases">
        {result.test_results.map((t, i) => (
          <li key={i} className={t.passed ? "case pass" : "case fail"}>
            <span className="case-status">{t.passed ? "Pass" : "Fail"}</span>
            {!t.passed && (
              <div className="case-detail">
                {t.input && <div><span className="label">Input:</span> {t.input}</div>}
                <div><span className="label">Expected:</span> {t.expected_output}</div>
                <div><span className="label">Got:</span> {t.actual_output || "(no output)"}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .result-panel {
        padding: 16px 20px;
        border-top: 1px solid var(--border);
        background: var(--surface);
        max-height: 220px;
        overflow-y: auto;
      }
      .result-panel.idle {
        display: flex;
        align-items: center;
        min-height: 60px;
      }
      .dim {
        color: var(--text-dim);
        font-size: 13.5px;
      }
      .banner {
        font-weight: 600;
        font-size: 14px;
        padding: 8px 12px;
        border-radius: 4px;
        margin-bottom: 10px;
        display: inline-block;
      }
      .banner.pass {
        background: var(--success-soft);
        color: var(--success);
      }
      .banner.fail {
        background: var(--error-soft);
        color: var(--error);
      }
      .cases {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .case {
        font-size: 13px;
      }
      .case-status {
        font-family: var(--font-mono);
        font-weight: 600;
        font-size: 12px;
      }
      .case.pass .case-status {
        color: var(--success);
      }
      .case.fail .case-status {
        color: var(--error);
      }
      .case-detail {
        margin-top: 4px;
        padding: 8px 10px;
        background: var(--surface-raised);
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--text-dim);
        white-space: pre-wrap;
      }
      .case-detail .label {
        color: var(--text);
      }
    `}</style>
  );
}
