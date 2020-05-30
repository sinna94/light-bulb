import * as React from "react";
import "./BulbList.scss";
import styled, {css, keyframes} from "styled-components";
import {darken} from "polished";

interface IBulbListProps {
  bulbCount: number;
  bulbColors: string[];
}

const globeWidth = 12;
const globeHeight = 28;
const globeSpacing = 40;
const globeSpread = 3;
const lightOffOpacity = 0.4;

export const BulbList = (props: IBulbListProps) => {
  /**
   * return bulbList
   */
  const createBulbList = () => {
    return Array.from(Array(props.bulbCount)).map((v, i: number) => {
      return <li key={i}>{i}</li>;
    });
  };

  let keyFramesStyle = "";
  const keyf = keyframes`{
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }`;
  props.bulbColors.forEach((color, i) => {
    const index = i % props.bulbColors.length;

    const flash = keyframes`{
       0%, 100% { 
        background: ${color};
        box-shadow: 0px ${globeHeight / 6}px ${
      globeWidth * 2
    }px ${globeSpread}px ${darken(0.2, color)};
      }
      50% { 
        background: ${color};
        box-shadow: 0px ${globeHeight / 6}px ${
      globeWidth * 2
    }px ${globeSpread}px ${darken(0.2, color)};
      } 
    }`;

    console.log(index);
    keyFramesStyle += `
        &:nth-child(${2 * (i + 1) + "n+" + i}){
          animation: ${()=> css`${keyf} 1s linear infinite;`};
          background: ${color};
          box-shadow: 0px ${globeHeight / 6}px ${
            globeWidth * 2
          }px ${globeSpread}px ${color};
        }
        `;
  });

  console.log(keyFramesStyle);

  const UlStyledWrapper = styled.ul`
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    z-index: 1;
    margin: -15px 0 0 0;
    padding: 0;
    pointer-events: none;
    width: 100%;
    background-color: black;
    & > li {
      position: relative;
      animation-fill-mode: both;
      animation-iteration-count: infinite;
      list-style: none;
      margin: 0;
      padding: 0;
      display: block;
      width: ${globeWidth}px;
      height: ${globeHeight}px;
      border-radius: 50%;
      margin: ${globeSpacing / 2}px;
      display: inline-block;
      ${keyFramesStyle}
    }
  `;

  return <UlStyledWrapper>{createBulbList()}</UlStyledWrapper>;
};
