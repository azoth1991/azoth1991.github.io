"use client";

import { CSSProperties, ReactNode, useMemo, useRef } from "react";
import { useMouse } from "ahooks";
type AnimateCardType = {
  children: ReactNode;
};

interface CustomCSSProperties extends CSSProperties {
  "--mouse-x"?: string;
  "--mouse-y"?: string;
}
const AnimateCard = ({ children }: AnimateCardType) => {
  const ref = useRef(null);
  const mouse = useMouse(ref);
  const customStyle: CustomCSSProperties = useMemo(() => {
    return mouse
      ? {
          "--mouse-x": mouse?.elementX + "px",
          "--mouse-y": mouse?.elementY + "px",
          "--mouse-opacity": mouse?.elementY ? 1 : 0,
        }
      : {};
  }, [mouse]);
  return (
    <div ref={ref} style={customStyle}>
      {children}
    </div>
  );
};

export default AnimateCard;
