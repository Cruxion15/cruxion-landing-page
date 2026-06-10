"use client";

import { useEffect } from "react";

/* Kicks off the Journey chunk download as soon as the page mounts, so the
   heavy scroll-demo JS is ready before the user scrolls down to it instead
   of showing an empty placeholder while it loads. */
export default function JourneyPreload() {
  useEffect(() => {
    import("./Journey");
  }, []);

  return null;
}
