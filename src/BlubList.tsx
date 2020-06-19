import * as React from "react";
import "./BulbList.scss";
import styled, {keyframes} from "styled-components";
import {transparentize, opacify, rgba} from "polished";
import {prototype} from "stream";

interface IBulbListProps {
  bulbCount: number;
  bulbColors?: string[];
}

const keyFramesList: any[] = [];

const globeWidth = 12;
const globeHeight = 28;
const globeSpacing = 40;
const globeSpread = 3;
const lightOffOpacity = 0.4;

export const BulbList = (props: IBulbListProps) => {
  const styleSheet = document.styleSheets[0] as CSSStyleSheet;
  console.log(styleSheet);
  console.log(opacify(lightOffOpacity, "#f70094"));
  const setKeyFrames = () => {
    props.bulbColors?.forEach((color, index) => {
      // FixMe: box-shadow 적용 안 됨
      const flash = `@keyframes animation-${index} {
        0%, 100% { 
          background: ${rgba(color, 1)};
          box-shadow: 0px ${globeHeight / 6}px ${globeWidth * 2}px ${globeSpread}px ${rgba(color, 1)});
        }
        50% { 
          box-shadow: 0px ${globeHeight / 6}px ${
            globeWidth * 2
          }px ${globeSpread}px ${rgba(color, 0.2)};
          background: ${rgba(color, lightOffOpacity)};
        }
      }`;
      console.log(flash);
      styleSheet.insertRule(flash, styleSheet.cssRules.length);
    });
  };

  const createBulbList = () => {
    return Array.from(Array(props.bulbCount)).map((v, i: number) => {
      const style = {
        animationName: `animation-${i % (props.bulbColors?.length ?? 0)}`,
        animationDuration: "1s",
      };
      console.log(i % (props.bulbColors?.length ?? 0));
      return <li key={i} style={style}></li>;
    });
  };

  setKeyFrames();
  return (
    <li>
      <ul className='lightrope'> {createBulbList()}</ul>
    </li>
  );
};
