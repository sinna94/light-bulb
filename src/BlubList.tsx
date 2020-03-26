import * as React from "react";
import "./BulbList.scss";

export interface IBulbListProps {
  bulbCount: number;
  bulbColors?: string[];
}

export function BulbList(props: IBulbListProps) {
  const createBulbList = () => {
    return Array.from(Array(props.bulbCount)).map((v, i: number) => {
      return <li key={i}></li>;
    });
  };

  return <ul className='lightrope'> {createBulbList()}</ul>;
}
