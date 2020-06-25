import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {BulbList} from "./BlubList";

ReactDOM.render(
  <React.StrictMode>
    <BulbList
      bulbCount={30}
      row={1}
      bulbs={[
        {color: "#00f7a5", width: 25, duration: 0.8},
        {color: "#00ffff", duration: 1.4},
        {color: "#f70094", duration: 1.2},
      ]}
    />
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
