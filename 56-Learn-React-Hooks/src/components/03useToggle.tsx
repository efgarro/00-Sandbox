import * as React from "react";

import useToggle from "../hooks/useToggle";
import { IToggleDemoProps } from "../types/hookTypes";

function ToggleDemo({ on, toggle }: IToggleDemoProps) {
  return (
    <div>
      <label className="toggle">
        <input
          onChange={toggle}
          className="toggle-checkbox"
          type="checkbox"
          checked={on}
        />
        <div className="toggle-switch"></div>
        <span className="toggle-label">{on ? "On" : "Off"}</span>
      </label>
    </div>
  );
}

export default function HookApp() {
  const [on, toggle] = useToggle(true);

  return (
    <section>
      <h1>UseToggle</h1>
      <button disabled={on} className="link" onClick={() => toggle()}>
        Turn On
      </button>
      <button disabled={!on} className="link" onClick={() => toggle()}>
        Turn Off
      </button>
      <button className="link" onClick={toggle}>
        Toggle
      </button>
      {/* <button className="link" onClick={() => toggle("nope")}>
        (Also toggles)
      </button> */}
      <ToggleDemo toggle={toggle} on={on} />
    </section>
  );
}
