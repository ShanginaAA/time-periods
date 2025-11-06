import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import './Circle.scss';
import gsap from 'gsap';

type PointPositions = {
  x: number;
  y: number;
  select: boolean;
};

const Circle = () => {
  const points = 6;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pointPositions, setPointPositions] = useState<PointPositions[]>();
  const [rotateAngle, setRotateAngle] = useState<number>(0);
  const [activePoint, setActivePoint] = useState<number>(0);

  const calculatePositions = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const center = { x: rect.width / 2, y: rect.height / 2 };
    const radius = rect.width * 0.5;

    const positions = [...Array(points)].map((_, index) => {
      const angle = (2 * Math.PI * index) / points;
      return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
        select: points == index + 1,
      };
    });

    setPointPositions(positions);
    setActivePoint(positions.length - 1);
  };

  const getAngleBetweenPoints = (curIndex: number, tarIndex: number, totalPoints: number) => {
    return (tarIndex - curIndex) * (360 / totalPoints);
  };

  useEffect(() => {
    calculatePositions();
    window.addEventListener('resize', calculatePositions);

    return () => window.removeEventListener('resize', calculatePositions);
  }, []);

  const onEnter = ({ currentTarget }: MouseEvent<HTMLDivElement>) => {
    if (currentTarget.classList.contains('active-point')) return;

    const content = currentTarget.querySelector('.point-content');

    gsap.to(currentTarget, {
      duration: 0.4,
      scale: 1,
      backgroundColor: '#f4f5f9',
    });
    gsap.to(content, {
      duration: 0.2,
      opacity: 1,
    });
  };

  const onLeave = ({ currentTarget }: MouseEvent<HTMLDivElement>) => {
    if (currentTarget.classList.contains('active-point')) return;

    const content = currentTarget.querySelector('.point-content');

    gsap.to(content, { duration: 0.2, opacity: 0 });
    gsap.to(currentTarget, { duration: 0.4, scale: 0.107, backgroundColor: '#42567a' });
  };

  const handlePointClick = (index: number) => {
    if (index == activePoint) return;

    const totalPoints = pointPositions?.length || 0;
    const angleToRotate = getAngleBetweenPoints(index, activePoint, totalPoints);

    const contents = containerRef.current?.querySelectorAll('.point-content');

    setRotateAngle(rotateAngle + angleToRotate);
    setActivePoint(index);

    // Находим предыдущую активную точку
    const previousActivePoint = containerRef.current?.querySelector('.point.active-point');
    const previousContent = previousActivePoint?.querySelector('.point-content');

    // Анимация для сброса предыдущей активной точки
    if (previousActivePoint && previousContent) {
      gsap.to(previousActivePoint, {
        duration: 1,
        scale: 0.107,
        backgroundColor: '#42567a',
      });
      gsap.to(previousContent, {
        duration: 1,
        opacity: 0,
      });
    }

    gsap.to(containerRef.current, {
      duration: 1,
      rotation: rotateAngle + angleToRotate,
    });

    contents?.forEach((content) => {
      gsap.to(content, {
        duration: 1,
        rotation: -(rotateAngle + angleToRotate),
      });
    });
  };

  return (
    <div className="container-circle" ref={containerRef}>
      <div className="circle"></div>
      {pointPositions &&
        pointPositions.map((position, index) => {
          const isActivePoint = index === activePoint;
          console.log(index, isActivePoint);
          return (
            <div
              key={index}
              className={`point ${isActivePoint ? 'active-point' : ''}`}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              onClick={() => handlePointClick(index)}
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
