import { motion } from 'framer-motion';
import { styles } from '../style';
import { lazy, Suspense } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import computerImg from '../assets/computer_placeholder.webp';
import linkedinIcon from "../assets/LinkedIn_icon.svg.webp"
import githubIcon from "../assets/github.webp"
import { Resume } from '../assets';


const ComputersCanvas = lazy(() => import("./canvas/Computers"));

const Hero = () => {

  const isMobile = useIsMobile();

  

  return (
    <section className='relative w-full h-[90vh] lg:h-[90vh] mx-auto'>
      {isMobile && <div className="flex gap-5 mt-[4.5rem] mx-10">
        <a href={"https://www.linkedin.com/in/harsh-srivastava21/"} target="_blank" rel="noopener noreferrer"><img src={linkedinIcon} width={30} className='mt-4' alt="Linked"/></a>
              <a href={"https://github.com/harsh-ideal"} target="_blank" rel="noopener noreferrer"><img src={githubIcon} className='mt-4' alt="Github" width={32}/></a>
              <a href={"https://drive.google.com/file/d/1csn8vmys1j7vrX-rkfiQGWiU4_mlzWFU/view?usp=sharing"} target="_blank" rel="noopener noreferrer"><img src={Resume} className='mt-5 -mx-1' alt="Resume" width={45}/></a>
         </div>}
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row item-start gap-5`}>
      
<div className='flex flex-col justify-center items-center mt-[-5rem] lg:mt-5'>
  <div className='w-5 h-5 rounded-full bg-[#915eff]'/>
  <div className='w-1 sm:h-80 h-40 violet-gradient'/>
</div>

<div className='mt-[-5rem] lg:m-0'>
  <h1 className={`${styles.heroHeadText} text-white`}>Hi, I'm  <span className='text-[#915eff]'>Harsh Srivastava</span></h1>
  <p className={`${styles.heroSubText} mt-2 text-white-100`}>
  Built an interactive space <br className="sm:block hidden"/>where my work speaks for itself.
  </p>
</div>
</div>

{isMobile ? (
        <img src={computerImg} alt="3D model placeholder" className='w-[75%] mx-auto h-full object-contain mt-[-5rem]' />
      ) : (
       <Suspense fallback={<div></div>}>
   <ComputersCanvas />
</Suspense>
      )}
      

<div className='absolute xs:bottom-10 bottom-32  w-full flex justify-center items-center'>
  <a href='#about'>
<div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
  <motion.div animate={{y:[0,24,0]}} transition={{duration:1.5, repeat:Infinity,repeatType:"loop"}} className='w-3 h-3 rounded-full bg-secondary mb-1'/>
</div>
  </a>
</div>
      

    </section>
  )
}

export default Hero