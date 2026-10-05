const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed (${response.status})`);
  }
  return response.json();
}

export function createGuestUser() {
  return request("/users/guest", { method: "POST" });
}

export function getNextProblem(userId, language = "python") {
  return request(`/problems/next/${userId}?language=${language}`);
}

export function getProblem(problemId) {
  return request(`/problems/${problemId}`);
}

export function submitCode({ userId, problemId, code, timeTakenMs, hintsUsed = 0 }) {
  return request("/attempts/submit", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      problem_id: problemId,
      code,
      time_taken_ms: timeTakenMs,
      hints_used: hintsUsed,
    }),
  });
}
