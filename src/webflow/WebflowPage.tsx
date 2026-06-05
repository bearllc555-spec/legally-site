import { useEffect, useRef } from "react";
import markup from "./markup.html?raw";
import { initWebflowInteractions } from "./interactions";
import "./overrides.css";

export function WebflowPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    initWebflowInteractions(root);
  }, []);

  return (
    <div ref={rootRef} className="page-wrapper">
      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </div>
  );
}
