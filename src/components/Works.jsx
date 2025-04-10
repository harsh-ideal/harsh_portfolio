import React from "react";
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";
import { styles } from "../style";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Works = () => {
  return (
    <>
      <motion.dev variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My Work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.dev>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following project showcase my skill and experience through real world
          example of my work. Each project is priefly describe with link project
          repositry and live demos in it. It reflect my ability to solve the
          complex problem , work with different technology, and merge project
          effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project,index)=>(
          <ProjectCard key={`project=${index}`} {...project} index={index}/>
        ))}

      </div>
    </>
  );
};

const ProjectCard=({index, name, description,tags, image, source_code_link})=>{


  return(
    <motion.dev variants={fadeIn("up","spring", index*0.5, 0.75)}>
      <Tilt
  tiltMaxAngleX={45}
  tiltMaxAngleY={45}
  scale={1}
  transitionSpeed={450}
  className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
>
        <div className="relative w-full h-[230px]">
          <img src={image} alt={name} className="w-full h-full Object-cover rounded-2xl"/>

<div className="absolute inset-0 flex justify-end m-3 card-img_hover">
  <div onClick={()=>{window.open(source_code_link,"_blank")}} className="black-gradiant w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
<img src={github} alt="Github" className="w-1/2 h-1/2 object-contain"/>
  </div>
</div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag)=>(
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}

        </div>

      </Tilt>
    </motion.dev>
  )
}

export default SectionWrapper(Works, "");
