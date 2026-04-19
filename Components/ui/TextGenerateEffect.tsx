"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [charCount, setCharCount] = useState(0);
  const totalChars = words.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let count = 0;
    intervalRef.current = setInterval(() => {
      count += 1;
      setCharCount(count);
      if (count >= totalChars) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 55);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalChars]);

  const wordsArray = words.split(" ");

  let charsLeft = charCount;
  const rendered = wordsArray.map((word, idx) => {
    const segment = word + (idx < wordsArray.length - 1 ? " " : "");
    if (charsLeft <= 0) return null;
    const visible = segment.slice(0, charsLeft);
    charsLeft -= segment.length;
    const isColored = idx > 3;
    return (
      <span key={idx} className={isColored ? "text-purple" : "dark:text-white text-black"}>
        {visible}
      </span>
    );
  });

  const isDone = charCount >= totalChars;

  return (
    <div className={cn("font-heading", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {rendered}
          {!isDone && (
            <span
              className="inline-block w-[3px] bg-purple align-middle animate-pulse"
              style={{ height: "0.85em", marginLeft: "2px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
