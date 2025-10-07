"use client";

import { useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { FaCheck, FaCopy } from "react-icons/fa";

interface CodeBlockProps {
  children: any;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    try {
      const code = preRef.current?.textContent || "";

      await navigator.clipboard.writeText(code.trim());
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Failed to copy - silently fail
    }
  };

  return (
    <div className="relative group my-4">
      <pre
        ref={preRef}
        className={`p-4 rounded-lg bg-default-100 overflow-x-auto ${className || ""}`}
      >
        <code className="text-sm font-mono">{children}</code>
      </pre>
      <Tooltip content={copied ? "Copied!" : "Copy code"} placement="left">
        <Button
          isIconOnly
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          color={copied ? "success" : "default"}
          size="sm"
          variant="flat"
          onPress={handleCopy}
        >
          {copied ? (
            <FaCheck className="text-sm" />
          ) : (
            <FaCopy className="text-sm" />
          )}
        </Button>
      </Tooltip>
    </div>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-2 py-1 rounded bg-default-100 text-primary font-mono text-sm">
      {children}
    </code>
  );
}
