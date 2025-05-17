import * as React from "react";

import useToggle from "../hooks/03useToggle";
import { IToggleDemoProps } from "../types/hookTypes";

function ToggleDemo({ isOn, toggle }: IToggleDemoProps) {
  return (
    <div>
      <label className="toggle">
        <input
          onChange={toggle}
          className="toggle-checkbox"
          type="checkbox"
          checked={isOn}
        />
        <div className="toggle-switch"></div>
        <span className="toggle-label">{isOn ? "On" : "Off"}</span>
      </label>
    </div>
  );
}

export default function HookApp() {
  const [isOn, toggle] = useToggle(true);

  return (
    <section>
      <h1>UseToggle</h1>
      <button disabled={isOn} className="link" onClick={() => toggle()}>
        Turn On
      </button>
      <button disabled={!isOn} className="link" onClick={() => toggle()}>
        Turn Off
      </button>
      <button className="link" onClick={toggle}>
        Toggle
      </button>
      {/* <button className="link" onClick={() => toggle("nope")}>
        (Also toggles)
      </button> */}
      <ToggleDemo isOn={isOn} toggle={toggle}  />
    </section>
  );
}
