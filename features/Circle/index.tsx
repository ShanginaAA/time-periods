import React, { useEffect, useRef, useState } from 'react';
import './Circle.scss';

type PointPositions = {
  x: number;
  y: number;
  select: boolean;
};

const Circle = () => {
  const points = 6;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pointPositions, setPointPositions] = useState<PointPositions[]>();

  const calculatePositions = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const center = { x: rect.width / 2, y: rect.height / 2 };
    const radius = rect.width * 0.5;

    console.log(rect.width, rect.height);
    const positions = [...Array(points)].map((_, index) => {
      const angle = (2 * Math.PI * index) / points;
      return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
        select: points == index + 1,
      };
    });

    setPointPositions(positions);
  };

  useEffect(() => {
    calculatePositions();
    window.addEventListener('resize', calculatePositions);

    return () => window.removeEventListener('resize', calculatePositions);
  }, []);

  return (
    <div className="container-circle" ref={containerRef}>
      <div className="circle"></div>
      {pointPositions &&
        pointPositions.map((position, index) => {
          return (
            <div
              key={index}
              className="point"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
              }}
            >
              <span className="point-content">{index + 1}</span>
            </div>
          );
        })}
    </div>
  );
};

export default Circle;
