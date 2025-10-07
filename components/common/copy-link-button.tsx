"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { FaLink, FaCheck } from "react-icons/fa";

interface CopyLinkButtonProps {
  className?: string;
}

export function CopyLinkButton({ className }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const url = window.location.href;

      await navigator.clipboard.writeText(url);
      setCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Failed to copy - silently fail
    }
  };

  return (
    <Tooltip
      content={copied ? "লিঙ্ক কপি হয়েছে!" : "লিঙ্ক কপি করুন"}
      placement="bottom"
    >
      <Button
        isIconOnly
        className={className}
        color={copied ? "success" : "default"}
        size="sm"
        variant="flat"
        onPress={handleCopy}
      >
        {copied ? (
          <FaCheck className="text-lg" />
        ) : (
          <FaLink className="text-lg" />
        )}
      </Button>
    </Tooltip>
  );
}
