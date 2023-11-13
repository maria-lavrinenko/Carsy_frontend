import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./Carousel.css";

export const CarouselItem = ({ src, width }) => {
  return <img className="carousel-item" style={{ width: width }} src={src} />;
};

const Carousel = ({ children, indicators }) => {
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = children.length - 1;
    } else if (newIndex >= children.length) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };
  if (children.length > 1) {
    useEffect(() => {
      const interval = setInterval(() => {
        if (!paused) {
          updateIndex(activeIndex + 1);
        }
      }, 1000);
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    });
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {children}
      </div>
      {indicators && (
        <div className="indicators">
          <button
            onClick={() => {
              updateIndex(activeIndex - 1);
            }}
          >
            Prev
          </button>
          {children.map((child, index) => {
            return (
              <button
                className={`${index === activeIndex ? "active" : ""}`}
                onClick={() => {
                  updateIndex(index);
                }}
              >
                {index + 1}
              </button>
            );
          })}
          <button
            onClick={() => {
              updateIndex(activeIndex + 1);
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
