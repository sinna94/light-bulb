import * as React from "react";
import "./BulbList.scss";
import styled, {keyframes} from "styled-components";
import {darken} from "polished";
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
  const setKeyFrames = () => {
    props.bulbColors?.forEach((color) => {
      const flash = keyframes`{
        0%, 100% { 
          backgroud: rgba(${color});
          box-shadow: 0px ${globeHeight / 6} ${
        globeWidth * 2
      } ${globeSpread} rgba(${darken(0.2, color)});
        }
        50% { 
          backgroud: rgba(${color},lightOffOpacity);
          box-shadow: 0px ${globeHeight / 6} ${
        globeWidth * 2
      } ${globeSpread} rgba(${darken(0.2, color)});
        }
      }`;
      keyFramesList.push(flash);
    });
  };

  const createBulbList = () => {
    return Array.from(Array(props.bulbCount)).map((v, i: number) => {
      return <li key={i}></li>;
    });
  };

  setKeyFrames();

  let keyFramesStyle = "";

  keyFramesList.forEach((keyframes, i) => {
    if (props.bulbColors && props.bulbColors[i]) {
      keyFramesStyle += `
        li:nth-child(${2 * (i + 1) + "n+" + 1}){
          backgroud: rgba(${props.bulbColors[i]})
        }
        `;
    }
  });

  console.log(keyFramesStyle);

  const LiStyledWrapper = styled.li`
    ${keyFramesStyle}
  `;

  return (
    <LiStyledWrapper>
      <ul className='lightrope'> {createBulbList()}</ul>
    </LiStyledWrapper>
  );
};
