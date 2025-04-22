import React, { useEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { styles } from "../style";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import useIsMobile from "../hooks/useIsMobile";
import { FaLink } from "react-icons/fa";

const Works = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.25, type: "spring" }}
            viewport={{ once: true }}
          >
            <p className={`${styles.sectionSubText}`}>My Work</p>
            <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
          </motion.div>

          <div className="w-full flex">
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
            >
              Following project showcase my skill and experience through real
              world example of my work. Each project is priefly describe with
              link project repositry and live demos in it. It reflect my ability
              to solve the complex problem , work with different technology, and
              merge project effectively.
            </motion.p>
          </div>

          <div className="mt-20 flex flex-wrap gap-7">
            {projects.map((project, index) => (
              <ProjectCard
                key={`project=${index}`}
                {...project}
                index={index}
              />
            ))}
          </div>
        </>
      )}
      {isMobile && (
        <>
          <div variants={textVariant(0.2)}>
            <p className={`${styles.sectionSubText}`}>My Work</p>
            <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
          </div>

          <div className="w-full flex">
            <p
              variants={fadeIn("", "", 0.1, 1)}
              className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
            >
              Each project here reflects real-world challenges turned into
              clean, efficient solutions. From frontend polish to backend
              architecture — the focus has always been on performance,
              scalability, and user experience. Technologies change, trends
              evolve — but solid logic, clean code, and problem-solving stay
              timeless. These aren’t just projects, they’re proof of
              consistency, curiosity, and the ability to build things that
              actually work.
            </p>
          </div>

          <div className="mt-20 flex flex-wrap gap-7">
            {projects.map((project, index) => (
              <ProjectCard
                key={`project=${index}`}
                {...project}
                index={index}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

const ProjectCard = React.memo(
  ({
    index,
    name,
    description,
    tags,
    image,
    summary,
    WithCompany,
    companyname,
    link,
    source_code_links,
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useIsMobile();
    const modalRef = useRef();

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(); // closeModal should be your modal close function
      }
    };
  
    useEffect(() => {
      if (isModalOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isModalOpen]);

    const openModal = () => {
      document.body.style.overflow = "hidden";
      setIsModalOpen(true);
    };

    const closeModal = () => {
      document.body.style.overflow = "auto";
      setIsModalOpen(false);
    };

    return (
      <>
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
          >
            {" "}
            <Tilt
              tiltMaxAngleX={45}
              tiltMaxAngleY={45}
              scale={1}
              transitionSpeed={450}
              className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
            >
              <div className="relative w-full h-[230px]" onClick={openModal}>
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full Object-cover rounded-2xl"
                />

                <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                  <div
                    onClick={() => {
                      window.open(source_code_links, "_blank");
                    }}
                    className="black-gradiant w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                  >
                    <img
                      src={github}
                      alt="Github"
                      className="w-1/2 h-1/2 object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5" onClick={openModal}>
                <h3 className="text-white font-bold text-[20px]">{name}</h3>
                {WithCompany && <h5 className="text-white font-semibold text-[15px]">({companyname})</h5>}
                <p className="mt-2 text-secondary text-[13px]">{summary}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <p key={tag.name} className={`text-[12px] ${tag.color}`}>
                    #{tag.name}
                  </p>
                ))}
              </div>
            </Tilt>
          </motion.div>
        )}

        {isMobile && (
          <div>
            <Tilt
              tiltMaxAngleX={45}
              tiltMaxAngleY={45}
              scale={1}
              transitionSpeed={450}
              className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
            >
              <div className="relative w-full h-[230px]" onClick={openModal}>
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full Object-cover rounded-2xl"
                />
              </div>

              <div className="mt-5" onClick={openModal}>
                <h3 className="text-white font-bold text-[20px]">{name}</h3>
               {WithCompany && <h5 className="text-white font-semibold text-[14px]">({companyname})</h5>}
                <p className="mt-2 text-secondary text-[12px]">{summary}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <p key={tag.name} className={`text-[11px] ${tag.color}`}>
                    #{tag.name}
                  </p>
                ))}
              </div>
            </Tilt>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-tertiary z-50 rounded-2xl shadow-xl mt-[5rem] w-[60%] max-w-4xl  p-6 relative max-h-[90vh] overflow-y-auto scrollbar-hide">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute text-3xl top-1 right-1 text-gray-400 hover:text-red-800"
              >
                &times;
              </button>

              {/* Image */}
              <img
                src={image}
                alt="Modal Visual"
                className="w-full  object-cover rounded-lg mb-4"
              />

              {/* Heading */}
              <h2 className="text-2xl font-semibold mb-2 text-center">
                {name}
              </h2>

              {/* Summary */}
              <p className="text-gray-600 text-center mb-6">{description}</p>

              {/* Button */}
              <div className="flex justify-center">
                {source_code_links&& 
                source_code_links.map((source_code_link,index)=>(
                  <a
                  href={source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 mx-2 py-2 rounded-xl hover:bg-blue-700 transition inline-block text-center"
                  key={index}
                >
                  Source Code {index+1}
                </a>
                ))
               }
                {link&& <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 mx-2 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition inline-block text-center"
                >
                  Vist to Project
                </a>}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

export default SectionWrapper(Works, "");
