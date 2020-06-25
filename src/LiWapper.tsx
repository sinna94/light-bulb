import styled from "styled-components";

interface ILi {
  height: number;
  width: number;
  spacing: number;
}

export const LiWrapper = styled.li<ILi>`
  position: relative;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 50%;
  margin: ${(props) => props.spacing / 2}px;
  display: inline-block;
  &::before {
    content: "";
    position: absolute;
    background: #222;
    width: ${(props) => props.width - 2}px;
    height: ${(props) => props.height / 3}px;
    border-radius: 3px;
    top: ${(props) => 0 - props.height / 6}px;
    left: 1px;
  }
  &::after {
    content: "";
    top: ${(props) => 0 - props.height / 2}px;
    left: ${(props) => props.width - 3}px;
    position: absolute;
    width: ${(props) => props.spacing + 12}px;
    height: ${(props) => props.height / 3 * 2}px;
    border-bottom: solid #222 2px;
    border-radius: 50%;
  }
  &:last-child:after {
    content: none;
  }
  &:first-child {
    margin-left: -${(props) => props.spacing}px;
  }
  &:nth-child(2n + 1) {
    animation-duration: 0.4s;
  }
  &:nth-child(4n + 2) {
    animation-duration: 1.1s;
  }
  &:nth-child(odd) {
    animation-duration: 1.8s !important;
  }
  &:nth-child(3n + 1) {
    animation-duration: 1.4s !important;
  }
`;
