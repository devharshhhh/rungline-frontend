import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header.jsx";
import ProblemPanel from "./components/ProblemPanel.jsx";
import CodeEditor from "./components/CodeEditor.jsx";
import ResultPanel from "./components/ResultPanel.jsx";
import { createGuestUser, getNextProblem, submitCode } from "./api.js";

const LANGUAGE = "python";
const USER_STORAGE_KEY = "rungline_user_id";

export default function App() {
  const [userId, setUserId] = useState(null);
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startedAt, setStartedAt] = useState(null);

  // Get or create a guest user on first load.
  useEffect(() => {
    async function init() {
      try {
        let id = localStorage.getItem(USER_STORAGE_KEY);
        if (!id) {
          const guest = await createGuestUser();
          id = guest.user_id;
          localStorage.setItem(USER_STORAGE_KEY, id);
        }
        setUserId(id);
      } catch (e) {
        setError("Couldn't connect to Rungline's server. Check the API URL and try refreshing.");
        setLoading(false);
      }
    }
    init();
  }, []);

  const loadNextProblem = useCallback(async (id) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const next = await getNextProblem(id, LANGUAGE);
      setProblem(next);
      setCode(next.starter_code || "");
      setStartedAt(Date.now());
    } catch (e) {
      if (e.message.includes("No more problems")) {
        setProblem(null);
        setError("You've solved every available problem — nice work. More are on the way.");
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) loadNextProblem(userId);
  }, [userId, loadNextProblem]);

  async function handleSubmit() {
    if (!problem || submitting) return;
    setSubmitting(true);
    setResult(null);
    try {
      const timeTakenMs = Date.now() - (startedAt || Date.now());
      const res = await submitCode({
        userId,
        problemId: problem.id,
        code,
        timeTakenMs,
      });
      setResult(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading && !problem) {
    return <CenteredMessage>Loading your next problem…</CenteredMessage>;
  }

  if (error && !problem) {
    return <CenteredMessage>{error}</CenteredMessage>;
  }

  return (
    <div className="app">
      <Header problem={problem} />
      <div className="main">
        <div className="left">
          {problem && <ProblemPanel problem={problem} />}
        </div>
        <div className="right">
          <div className="editor-area">
            <CodeEditor code={code} onChange={setCode} language={LANGUAGE} />
          </div>
          <div className="action-bar">
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={submitting || !problem}
            >
              {submitting ? "Running…" : "Run & Submit"}
            </button>
            {result?.passed && (
              <button className="next-btn" onClick={() => loadNextProblem(userId)}>
                Next problem
              </button>
            )}
          </div>
          <ResultPanel result={result} submitting={submitting} />
        </div>
      </div>
      <style>{`
        .app {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        .main {
          display: grid;
          grid-template-columns: 380px 1fr;
          flex: 1;
          min-height: 0;
        }
        .left {
          background: var(--surface);
          border-right: 1px solid var(--border);
          overflow-y: auto;
        }
        .right {
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .editor-area {
          flex: 1;
          min-height: 0;
        }
        .action-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .submit-btn {
          background: var(--accent);
          color: var(--bg);
          border: none;
          font-weight: 600;
          font-size: 13.5px;
          padding: 9px 18px;
          border-radius: 5px;
        }
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: default;
        }
        .next-btn {
          background: transparent;
          color: var(--success);
          border: 1px solid var(--success);
          font-weight: 600;
          font-size: 13.5px;
          padding: 8px 16px;
          border-radius: 5px;
        }
        @media (max-width: 760px) {
          .main {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
          }
          .left {
            border-right: none;
            border-bottom: 1px solid var(--border);
            max-height: 35vh;
          }
        }
      `}</style>
    </div>
  );
}

function CenteredMessage({ children }) {
  return (
    <div className="centered">
      {children}
      <style>{`
        .centered {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          font-size: 14px;
          padding: 24px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
