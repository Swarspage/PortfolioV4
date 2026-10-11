import React from "react";

interface SplitWordsProps {
  text: string;
  /** "mask" wraps each word for a masked slide-up; "plain" leaves words unmasked for opacity scrubs. */
  mode?: "mask" | "plain";
  wordAttr?: string;
}

export function SplitWords({ text, mode = "mask", wordAttr = "data-word" }: SplitWordsProps) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((word, i) => {
        const attrs = { [wordAttr]: "" } as Record<string, string>;
        return (
          <React.Fragment key={`${word}-${i}`}>
            {mode === "mask" ?
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <span className="inline-block will-change-transform" {...attrs}>
                  {word}
                </span>
              </span> :

            <span {...attrs}>{word}</span>
            }
            {i < words.length - 1 ? " " : null}
          </React.Fragment>);

      })}
    </>);

}