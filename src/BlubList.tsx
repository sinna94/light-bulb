import * as React from "react";
import "./BulbList.scss";
import {rgba} from "polished";

interface IBulbListProps {
  bulbCount: number;
  row: number;
  bulbColors?: string[];
}

const globeWidth = 12;
const globeHeight = 28;
const globeSpacing = 40;
const globeSpread = 3;
const lightOffOpacity = 0.4;

const defaultColors = ["#00f7a5", "#00ffff", "#f70094"];

export const BulbList = (props: IBulbListProps) => {
  const bulbColors =
    !props.bulbColors || props.bulbColors.length === 0
      ? defaultColors
      : props.bulbColors;

  const styleSheet = document.styleSheets[0] as CSSStyleSheet;
  const setKeyFrames = () => {
    bulbColors.forEach((color, index) => {
      const flash = `@keyframes animation-${index} {
        0%, 100% { 
          box-shadow: 0px ${globeHeight / 6}px ${
        globeWidth * 2
      }px ${globeSpread}px ${rgba(color, 1)};
          background: ${rgba(color, 1)};
        }
        50% { 
          box-shadow: 0px ${globeHeight / 6}px ${
        globeWidth * 2
      }px ${globeSpread}px ${rgba(color, 0.2)};
          background: ${rgba(color, lightOffOpacity)};
        }
      }`;
      styleSheet.insertRule(flash, styleSheet.cssRules.length);
    });
  };

  const createBulbList = () => {
    return Array.from(Array(props.bulbCount)).map((v, i: number) => {
      const style = {
        animationName: `animation-${i % bulbColors.length}`,
        animationDuration: "1s",
      };
      return <li key={i} style={style}></li>;
    });
  };

  setKeyFrames();

  const createBulbRow = () => {
    return Array.from(Array(props.row)).map((v, i) => {
      return (
        <ul className='lightrope' key={i}>
          {" "}
          {createBulbList()}
        </ul>
      );
    });
  };

  return <>{createBulbRow()}</>;
};
