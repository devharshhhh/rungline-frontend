import Editor from "@monaco-editor/react";

const MONACO_LANGUAGE = {
  python: "python",
  cpp: "cpp",
};

export default function CodeEditor({ code, onChange, language }) {
  return (
    <div className="editor-wrap">
      <Editor
        height="100%"
        language={MONACO_LANGUAGE[language] || "python"}
        value={code}
        onChange={(value) => onChange(value ?? "")}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16 },
        }}
      />
      <style>{`
        .editor-wrap {
          height: 100%;
          border-left: 1px solid var(--border);
        }
      `}</style>
    </div>
  );
}
