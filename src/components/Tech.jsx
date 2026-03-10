import React, { lazy, Suspense } from "react";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { technologies } from "../constants";

const BallCanvasGroup = lazy(() => import("./canvas/Ball"));

const Tech = () => {
  return (
    <div className="flex flex-col max justify-center items-center gap-10 -mb-[8rem]">
      <motion.div initial="hidden" animate="show" variants={textVariant(1)}>
        <h2 className="text-4xl font-bold text-gray-300 mb-4 relative inline-block">
          My Code Gear
          <span className="block h-1 w-1/2 bg-blue-700 mx-auto mt-2 rounded-full"></span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 text-center max-w-3xl">
          Technologies I’ve used or learned over time — some in real-world
          projects, others as part of my continuous growth as a developer.
        </p>
      </motion.div>

      {/* Single Canvas with all balls */}
      <div className="w-[90vw] lg:w-[98vw] h-[800px] lg:h-[450px]">
        <Suspense fallback={<div></div>}>
          <BallCanvasGroup />
        </Suspense>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
