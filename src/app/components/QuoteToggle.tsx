"use client";

import { useState } from "react";

interface Props {
  short: string;
  full: string;
  color: string;
}

export default function QuoteToggle({ short, full, color }: Props) {
  const [expanded, setExpanded] = useState(false);

  const isLonger = full !== short;

  return (
    <div>
      <blockquote className="ref-quote">
        {isLonger ? (
          <>
            <span className={`ref-quote-body ${!expanded ? "ref-quote-clamped" : ""}`}>
              <span>&ldquo;{short}&rdquo;</span>
              <span className="ref-quote-more">&ldquo;{full}&rdquo;</span>
            </span>
            <button
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="ref-toggle"
              style={{ color, touchAction: "manipulation" }}
            >
              {expanded ? "Show less" : "Read full recommendation"}
            </button>
          </>
        ) : (
          <span>&ldquo;{short}&rdquo;</span>
        )}
      </blockquote>
    </div>
  );
}
