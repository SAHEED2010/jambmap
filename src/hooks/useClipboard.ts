"use client";

import { useState, useCallback } from "react";

export function useClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = useCallback(
    (value: string) => {
      if (!value) return;
      navigator.clipboard.writeText(value).then(() => {
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), timeout);
      });
    },
    [timeout]
  );

  return { hasCopied, copyToClipboard };
}
