import React, { useEffect, useRef, useState } from "react";

interface SWLivePlaygroundProps {
  example: string;
  title: string;
}

export default function SWLivePlayground({
  example,
  title,
}: SWLivePlaygroundProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(860);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow ||
        event.data?.source !== "sw-live-playground"
      ) {
        return;
      }

      const nextHeight = Number(event.data.height);
      if (Number.isFinite(nextHeight) && nextHeight > 0) {
        setHeight(Math.max(640, nextHeight));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={`/sw-live/?example=${encodeURIComponent(example)}`}
      title={title}
      style={{
        display: "block",
        width: "100%",
        height: `${height}px`,
        border: 0,
        background: "transparent",
      }}
    />
  );
}
