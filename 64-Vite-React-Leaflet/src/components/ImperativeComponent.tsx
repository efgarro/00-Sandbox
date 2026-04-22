import React, { useRef } from "react";
import { select } from "d3-selection";

let counter = 0;

const ImperativeComponent = () => {
  const impRef = useRef(null);
 
  React.useEffect(() => {
    console.log("impRef.current");
    console.log(impRef.current);
    appendSvg();
    // return () => {
    //   console.log("cleanup");
    //   select(impRef.current).selectAll("svg").remove();
    // };
  }, []); // Logs once after the initial mount

  const appendSvg = () => {
    if (!impRef.current) return;
    select(impRef.current).selectAll("svg").remove();
    select(impRef.current)
      .append("svg")
      .attr("class", "svgContainer")
      .attr("width", 600)
      .attr("height", 300)
      .append("g");
  };
  counter = counter + 1;
  console.log(counter);
  return (
    <>
      <p>{`${counter}`}</p>
      <div ref={impRef}>ImperativeComponent</div>
    </>
  );
};

export default ImperativeComponent;
