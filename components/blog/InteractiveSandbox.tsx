'use client';

import { useEffect, useState } from 'react';
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackPreview,
  SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";
import { useTheme } from "next-themes";

interface InteractiveSandboxProps {
  files: Record<string, string>;
  template?: "static" | "angular" | "react" | "react-ts" | "solid" | "svelte" | "vanilla" | "vanilla-ts" | "vue" | "vue-ts" | "node" | "nextjs" | "vite" | "vite-react" | "vite-react-ts" | "vite-vue" | "vite-vue-ts" | "vite-svelte" | "vite-svelte-ts";
  showFileExplorer?: boolean;

}

const InteractiveSandbox = ({ 
  files, 
  template = "static", 
  showFileExplorer = false 
}: InteractiveSandboxProps) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="my-8 h-[400px] w-full animate-pulse rounded-lg border border-border bg-surface" />;
  }

  const githubDarkTheme = {
    colors: {
      surface1: "#0d1117",
      surface2: "#161b22",
      surface3: "#30363d",
      clickable: "#8b949e",
      base: "#c9d1d9",
      disabled: "#484f58",
      hover: "#58a6ff",
      accent: "#58a6ff",
      error: "#f85149",
      errorSurface: "#f851491a",
    },
    syntax: {
      plain: "#c9d1d9",
      comment: { color: "#8b949e", fontStyle: "italic" },
      keyword: "#ff7b72",
      tag: "#7ee787",
      punctuation: "#c9d1d9",
      definition: "#d2a8ff",
      property: "#79c0ff",
      static: "#a5d6ff",
      string: "#a5d6ff",
    },
    font: {
      mono: "var(--font-mono), monospace",
      size: "14px",
      lineHeight: "1.6",
    },
  };

  const githubLightTheme = {
    colors: {
      surface1: "#ffffff",
      surface2: "#f6f8fa",
      surface3: "#e1e4e8",
      clickable: "#586069",
      base: "#24292e",
      disabled: "#959da5",
      hover: "#0366d6",
      accent: "#0366d6",
      error: "#d73a49",
      errorSurface: "#ffeef0",
    },
    syntax: {
      plain: "#24292e",
      comment: { color: "#6a737d", fontStyle: "italic" },
      keyword: "#d73a49",
      tag: "#22863a",
      punctuation: "#24292e",
      definition: "#6f42c1",
      property: "#005cc5",
      static: "#032f62",
      string: "#032f62",
    },
    font: {
      mono: "var(--font-mono), monospace",
      size: "14px",
      lineHeight: "1.6",
    },
  };

  const currentTheme: any = resolvedTheme === 'dark' ? githubDarkTheme : githubLightTheme;

  return (
    <div className="my-8 rounded-lg border border-border overflow-hidden sandbox-container">
      <SandpackProvider
        template={template}
        files={files}
        theme={{
          ...currentTheme,
          font: {
            ...currentTheme.font,
            mono: "var(--font-mono), monospace",
          }
        } as any}
        options={{
          showInlineErrors: true,
          closableTabs: false,
          editorHeight: 400,
        } as any}
      >
        <SandpackLayout className="rounded-none! border-none!">
          {showFileExplorer && <SandpackFileExplorer className="h-[400px]" />}
          <SandpackCodeEditor 
            className="h-[400px]" 
            showTabs 
            showLineNumbers
          />
          <SandpackPreview 
            className="h-[400px]" 
            showOpenInCodeSandbox={false}
            showRefreshButton
          />
        </SandpackLayout>
      </SandpackProvider>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Remove scrollbars inside the sandbox */
        .sandbox-container .sp-stack::-webkit-scrollbar,
        .sandbox-container .cm-scroller::-webkit-scrollbar,
        .sandbox-container .sp-preview-container::-webkit-scrollbar,
        .sandbox-container .sp-code-editor::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .sandbox-container .sp-stack,
        .sandbox-container .cm-scroller,
        .sandbox-container .sp-preview-container,
        .sandbox-container .sp-code-editor {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .sp-wrapper, .sp-stack, .sp-code-editor, .cm-editor, .cm-content, .sp-tab-button {
          font-family: var(--font-mono), monospace !important;
        }
        .sp-preview-container {
          background-color: white !important;
        }
        html[data-theme='dark'] .sp-preview-container {
          background-color: #ffffff !important; /* Keep preview white for better visibility of web content */
        }
      `}} />
    </div>
  );
};

export default InteractiveSandbox;
