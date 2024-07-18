"use client";

import React, { useState } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    description: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );

  // translate the tooltip
  // const translateX = useSpring(
  //   useTransform(x, [-100, 100], [-50, 50]),
  //   springConfig
  // );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <div className="grid grid-cols-3 gap-2  border-4 border-primaryBg  p-2 rounded-lg   ">
      {items.map((item) => (
        <div
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          className=" bg-white text-black text-sm rounded-lg block text-center relative group hover:bg-primaryBg/80 hover:text-white duration-300 p-3"
          onMouseMove={handleMouseMove}
        >
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                // translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs 
              flex-col items-center justify-center rounded-lg bg-[#272727] z-50 shadow-xl px-4 py-2"
            >
              <div className="font-bold text-white relative z-30 text-lg">
                {/* {item.name} */}
              </div>
              <div className="text-white text-sm">{item.description}</div>
            </motion.div>
          )}

          {item.name}
        </div>
      ))}
    </div>
  );
};
