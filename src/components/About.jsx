import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { styles } from "../style";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import useIsMobile from "../hooks/useIsMobile";

const ServicesCard = ({ index, title, icon }) => {
const isMobile=useIsMobile();

  return (
    <>
    {!isMobile && <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("", "", 0.3 * index, 0.5)}
        className="w-full green-pink-gradient  rounded-[20px] shadow-card"
      >
        <div
          option={{ max: 45, scale: 1, speed: 450 }}
          className="bg-tertiary rounded-[20px] py-3 px-6 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt="tittle" className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[16px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  }

{isMobile && <Tilt className="xs:w-[250px] w-[47%]">
      <div
        
        className="w-full green-pink-gradient  rounded-[20px] shadow-card"
      >
        <div
          option={{ max: 45, scale: 1, speed: 450 }}
          className="bg-tertiary rounded-[20px] py-3 px-6 min-h-[180px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt="tittle" className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[12px] font-bold text-center">
            {title}
          </h3>
        </div>
      </div>
    </Tilt>
  }
  </>
  );
};

const About = () => {

  const isMobile=useIsMobile();


  return (
    <>
     {!isMobile  && <motion.div variants={textVariant(0.1)}>
        <p className={`${styles.sectionSubText}`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText}`}>Overview</h2>
        <motion.p
          variants={fadeIn("left", "spring", 0.1, 0.5)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I’m a passionate and results-driven developer with practical
          experience in JavaScript, and Node.js — building robust
          solutions using frameworks like React.js, Next.js, Express.js, and much more.
          I’m quick to adapt, love solving complex problems, and collaborate
          closely with clients to create scalable, user-focused applications. My
          approach blends clean code with creative thinking, aiming to deliver
          not just products, but meaningful digital experiences. Let’s bring
          your ideas to life — with precision, performance, and purpose.
        </motion.p>
      </motion.div>}

      {isMobile  && <div >
        <p className={`${styles.sectionSubText}`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText}`}>Overview</h2>
        <p
          variants={fadeIn("left", "spring", 0.1, 0.5)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I’m a passionate and results-driven developer with practical
          experience in JavaScript, and Node.js — building robust
          solutions using frameworks like React.js, Next.js, Express.js, and much more.
          I’m quick to adapt, love solving complex problems, and collaborate
          closely with clients to create scalable, user-focused applications. My
          approach blends clean code with creative thinking, aiming to deliver
          not just products, but meaningful digital experiences. Let’s bring
          your ideas to life — with precision, performance, and purpose.
        </p>
      </div>}

      <div className="mt-20 flex flex-wrap justify-between gap-4">
        {services.map((service, index) => (
          <ServicesCard key={index} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
