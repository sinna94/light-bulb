import * as React from "react";
import {rgba} from "polished";
import {
  globeHeight,
  globeWidth,
  globeSpread,
  lightOffOpacity,
  globeSpacing,
} from "../constants";
import {LiWrapper} from "./LiWrapper";
import {UlWrapper} from "./UlWrapper";

interface IBulbListProps {
  bulbCount: number;
  bulbs: LightBulb[];
  height?: number;
  spacing?: number;
}

export interface LightBulb {
  color: string;
  duration?: number;
  width?: number;
}

const defaultColors = ["#00f7a5", "#00ffff", "#f70094"];

export const ChristmasBulbs = (props: IBulbListProps) => {
  const {bulbs, height, spacing} = props;
  const bulbsLength = props.bulbs.length;

  // set styleSheet
  const styleSheet = document.styleSheets[0] as CSSStyleSheet;

  // set keyFrames
  const setKeyFrames = () => {
    bulbs.forEach((bulb, index) => {
      const flash = `@keyframes animation-${index} {
        0%, 100% { 
          box-shadow: 0px ${(height ?? globeHeight) / 6}px ${
        (bulb.width ?? globeWidth) * 2
      }px ${globeSpread}px ${rgba(
        bulb.color ?? defaultColors[index % defaultColors.length],
        1,
      )};
          background: ${rgba(
            bulb.color ?? defaultColors[index % defaultColors.length],
            1,
          )};
        }
        50% { 
          box-shadow: 0px ${(height ?? globeHeight) / 6}px ${
        (bulb.width ?? globeWidth) * 2
      }px ${globeSpread}px ${rgba(
        bulb.color ?? defaultColors[index % defaultColors.length],
        0.2,
      )};
          background: ${rgba(
            bulb.color ?? defaultColors[index % defaultColors.length],
            lightOffOpacity,
          )};
        }
      }`;
      styleSheet.insertRule(flash, styleSheet.cssRules.length);
    });
  };

  const getBulb = (index: number): LightBulb => {
    return bulbs[index % bulbsLength];
  };

  // create li with style
  const createBulbList = () => {
    return Array.from(Array(props.bulbCount)).map((v, i: number) => {
      const bulb = getBulb(i);
      const style = {
        animationName: `animation-${i % bulbs.length}`,
        animationDuration: `${bulb.duration ?? 1}s`,
      };
      return (
        <LiWrapper
          width={bulb.width ?? globeWidth}
          height={height ?? globeHeight}
          spacing={spacing ?? globeSpacing}
          key={i}
          style={style}
        ></LiWrapper>
      );
    });
  };

  setKeyFrames();

  return <UlWrapper>{createBulbList()}</UlWrapper>;
};
