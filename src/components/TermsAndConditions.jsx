import React, { useState, useEffect } from "react";

import Marquee from "react-fast-marquee";

import Lipsum from "./Lipsum";

const getHint = (count) => {
  switch (true) {
    case count < 5:
      return "Accept button will be enabled when you read the conditions.";
    case count < 15:
      return "You clicked multiple times on a disabled button.";
    case count < 30:
      return "Do you really think this will do something?";
    case count < 50:
      return "You should be reading instead of clicking like a maniac...";
    case count < 70:
      return "Please, read it.";
    case count < 90:
      return "Pretty please?";
    case count < 110:
      return `You clicked ${count} times already... STOP IT!`;
    case count < 130:
      return `Okay, fine! Here is TL;DR version:`;
    case count < 200:
      return `0. Don't be a dick to people.`;
    case count < 220:
      return `1. You can do whatever you want with this software.`;
    case count < 240:
      return `2. This software has a *LOT* of bugs.`;
    case count < 260:
      return `3. Drugs are bad, mm'kay?`;
    case count < 265:
      return `k thx bye`;
    default:
      return undefined;
  }
};

const TermsAndConditions = () => {
  const [enabled, setEnabled] = useState(false);
  const [modalPresented, setModalPresented] = useState(false);
  const [hintHovered, setHintHovered] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 280) {
      setEnabled(true);
    }
  }, [count]);

  useEffect(() => {
    if (count === 285) {
      setModalPresented(false);
    }
  }, [count]);

  const hint = getHint(count);
  const displayHint = hintHovered && hint !== undefined;
  const emptyHint = hint === undefined;

  const acceptHandler = () => {
    // Additional logic related to accepting terms can be added here

    // Close the modal after accepting terms
    setModalPresented(false);
  };

  return (
    <div className="container">
      <div className="body-content">
      <h3 onClick={() => setModalPresented(true)} className="btn btn-link">
        Terms and conditions
      </h3>
    </div>
      <div
        className={`modal ${!modalPresented ? "disabled" : ""}`}
        style={{ display: "block" }}
      >
        <h1>View our Terms and Conditions</h1>
        <div className="text">
          <Marquee>{Lipsum()}</Marquee>
        </div>
        <div className="footer">
          <div
            className={`hint ${emptyHint ? "hidden" : ""} ${
              displayHint ? "" : "disabled"
            }`}
          >
            {hint}
          </div>
          <a
            href="#"
            className={`accept ${!enabled ? "disabled" : ""}`}
            onClick={acceptHandler}
            onMouseEnter={() => {
              setHintHovered(true);
            }}
            onMouseLeave={() => {
              setHintHovered(false);
            }}
          >
            Accept
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
