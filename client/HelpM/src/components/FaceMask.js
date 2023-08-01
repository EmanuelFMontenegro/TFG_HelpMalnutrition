import React, {useEffect, useRef} from 'react';
import {Svg, Rect} from 'react-native-svg';
import * as d3 from 'd3';

const FaceMask = ({faceLandmarks}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const maskPoints = [
      [50, 50],
      [200, 50],
      [200, 200],
      [50, 200],
    ];

    const lineGenerator = d3.line();

    svg
      .append('path')
      .datum(maskPoints)
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 2);

    
    if (faceLandmarks) {
      
    }
  }, [faceLandmarks]);

  return (
    <Svg ref={svgRef} width="400" height="400">
      
      <Rect
        x="50"
        y="50"
        width="150"
        height="150"
        stroke="blue"
        strokeWidth="5"
        fill="transparent"
      />
    </Svg>
  );
};

export default FaceMask;
