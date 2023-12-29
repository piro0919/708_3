import { useEffect, useState } from "react";
import { useEventListener } from "usehooks-ts";

export default function useWindowWidth(): { width: number } {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(document.documentElement.clientWidth);
  }, []);

  useEventListener("resize", () => {
    setWidth(document.documentElement.clientWidth);
  });

  return { width };
}
