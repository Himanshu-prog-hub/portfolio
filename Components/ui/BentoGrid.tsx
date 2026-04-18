'use client'

import { cn } from "@/utils/cn";
import { BackgroundGradientAnimation } from "./GradientBG";
import GridGlobe from "./GridGlobe";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { useState } from "react";
import animationData from "@/data/confetti.json"
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";
import { TechStack } from "./TechStack"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
  index = 0,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
  index?: number;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('mishra00.11himanshu@gmail.com');
    setCopied(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.1, 0.5),
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl",
        "border border-white/[0.1] group/bento",
        "hover:shadow-xl transition duration-200 shadow-input dark:shadow-none",
        "justify-between flex flex-col space-y-4",
        id === 1 && "hover:border-purple/30",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 ? 'flex justify-center' : ''} h-full`}>

        {/* Background image layer */}
        <div className="w-full h-full absolute">
          {img && (
            <div className="relative w-full h-full overflow-hidden">
              {id === 1 ? (
                <>
                  {/* Solid dark base */}
                  <div className="absolute inset-0 bg-[#04071d]" />

                  {/* Photo — full-bleed background.
                      Desktop: object-position pushes face to right half of card so left text area is clean.
                      Mobile:  object-position centers face so it appears at the top of the card. */}
                  <motion.img
                    src={img.startsWith('/') ? img : `/${img}`}
                    alt="Himanshu Mishra"
                    fetchPriority="high"
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.75, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="absolute inset-0 w-full h-full object-cover object-[50%_5%] md:object-[65%_45%] transition-transform duration-700 ease-out group-hover/bento:scale-[1.03]"
                  />

                  {/* Mobile: gradient only covers bottom third so photo is clearly visible at top */}
                  <div className="absolute inset-0 sm:hidden pointer-events-none"
                       style={{ background: 'linear-gradient(to top, #04071d 18%, rgba(4,7,29,0.82) 34%, rgba(4,7,29,0.03) 52%, transparent 100%)' }} />

                  {/* Desktop: left-to-right gradient so text on left half is readable */}
                  <div className="absolute inset-0 hidden sm:block pointer-events-none"
                       style={{ background: 'linear-gradient(to right, #04071d 18%, rgba(4,7,29,0.85) 28%, rgba(4,7,29,0.6) 40%, rgba(4,7,29,0.3) 54%, rgba(4,7,29,0.1) 66%, rgba(4,7,29,0.03) 76%, transparent 88%)' }} />

                  {/* Ambient purple glow (right side / face area) */}
                  <div className="absolute inset-0 pointer-events-none opacity-20"
                       style={{ background: 'radial-gradient(ellipse at 75% 25%, rgba(120,80,255,0.4) 0%, transparent 60%)' }} />

                  {/* Hover shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple/[0.06] via-transparent to-transparent z-[1] opacity-0 transition-opacity duration-700 group-hover/bento:opacity-100" />
                </>
              ) : (
                <img
                  src={img}
                  alt=""
                  role="presentation"
                  className={cn(imgClassName, "object-cover object-center")}
                />
              )}
            </div>
          )}
        </div>

        {/* Spare image */}
        <div className={`absolute right-0 -bottom-5 ${id === 5 && 'w-full opacity-80'}`}>
          {spareImg && (
            <img
              src={spareImg}
              alt=""
              role="presentation"
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>

        {id === 6 && <BackgroundGradientAnimation />}

        {/* Content layer */}
        <div
          className={cn(
            titleClassName,
            "transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10",
            id === 1 && "group-hover/bento:translate-x-2 z-10 pt-[360px] sm:pt-0 sm:max-w-[46%] gap-6 sm:gap-0 sm:justify-between",
            id !== 1 && "group-hover/bento:translate-x-2",
            id === 2 && "z-30"
          )}
        >
          {id === 1 ? (
            <>
              {/* TOP GROUP */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex flex-col gap-4 z-10"
              >
                <span className="inline-flex items-center gap-1.5 w-fit text-[9px] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/40 font-semibold uppercase tracking-widest">
                  About me
                </span>
                <div className="font-sans text-sm lg:text-[15px] font-normal text-white/80 leading-relaxed">
                  {title}
                </div>
                <span className="inline-flex items-center gap-1.5 w-fit whitespace-nowrap text-[10px] px-3 py-1.5 rounded-full border border-purple/35 bg-purple/[0.08] text-purple/80 font-semibold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-purple animate-pulse" />
                  SD2 · Serko · Bengaluru
                </span>
              </motion.div>

              {/* BOTTOM GROUP */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex flex-col gap-2.5 z-10"
              >
                <a
                  href="/Himanshu_Mishra_Resume_2026.pdf"
                  download
                  className={cn(
                    "flex items-center justify-center gap-2 w-full py-2.5 rounded-full",
                    "text-xs font-semibold text-white",
                    "bg-gradient-to-r from-purple/80 to-indigo-500/80",
                    "hover:from-purple hover:to-indigo-500",
                    "transition-all duration-200"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Resume
                </a>

                <a
                  href="https://www.linkedin.com/in/himanshu-mishra-0b2795191/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center justify-center gap-2 w-full py-2.5 rounded-full",
                    "text-xs font-semibold text-white/70",
                    "bg-white/[0.05] hover:bg-white/[0.09] hover:text-white",
                    "transition-all duration-200"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn Profile
                </a>
              </motion.div>
            </>
          ) : (
            <>
              <div className="font-sans font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-base z-10">
                {description}
              </div>
              <div className="font-sans font-bold text-lg lg:text-3xl max-w-96 z-10">
                {title}
              </div>
            </>
          )}

          {id === 2 && <GridGlobe />}
          {id === 3 && <TechStack />}

          {id === 6 && (
            <div className="mt-5 relative">
              <div className="absolute -bottom-5 right-0">
                <Lottie
                  animationData={animationData}
                  loop={copied}
                  autoplay={copied}
                  rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                />
              </div>
              <MagicButton
                title={copied ? 'Email copied' : 'Copy my email'}
                icon={<IoCopyOutline />}
                position="left"
                otherClasses="bg-[#161a31]"
                handleClick={handleCopy}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
