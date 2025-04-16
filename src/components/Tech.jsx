import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <div className="flex flex-col flex-wrap justify-center gap-10">
      <motion.div initial="hidden" animate="show" variants={textVariant(1)}>
        <h2 className="text-4xl font-bold text-gray-300 mb-4 relative inline-block">
          My Code Gear
          <span className="block h-1 w-1/2 bg-blue-700 mx-auto mt-2 rounded-full"></span>
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Technologies I’ve used or learned over time — some in real-world
          projects, others as part of my continuous growth as a developer.
        </p>
      </motion.div>
      <div className="flex flex-wrap flex row justify-around gap-5">
        {technologies.map((technology) => (
          <div className="w-28 text-white text-center h-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
            {technology.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
