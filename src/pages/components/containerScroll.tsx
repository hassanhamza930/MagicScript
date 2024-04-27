import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
    titleComponent,
    children,
  }: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
  }) => {
    const containerRef = useRef<any>(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
    });
    const [isMobile, setIsMobile] = useState(false);
   
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }, []);
   
    const scaleDimensions = () => {
      return false ? [0.7, 0.9] : [1.05, 1];
    };
   
    const rotate = useTransform(scrollYProgress, [0, 2], [0, 30]);
    const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
    const translate = useTransform(scrollYProgress, [0, 1], [0, 0]);
   
    return (
      <div
        className="scale-[0.45] md:scale-100 h-[550px] w-[850px] flex items-center justify-center relative -mt-24 md:-mt-0"
        ref={containerRef}
      >
        <div
          className="py-0 md:py-0 w-full relative"
          style={{
            perspective: "1000px",
          }}
        >
          {/* <Header translate={translate} titleComponent={titleComponent} /> */}
          <Card rotate={rotate} translate={translate} scale={scale}>
            {children}
          </Card>
        </div>
      </div>
    );
  };
  

  export const Header = ({ translate, titleComponent }: any) => {
    return (
      <motion.div
        style={{
          translateY: translate,
        }}
        className="div max-w-5xl mx-auto text-center"
      >
        {titleComponent}
      </motion.div>
    );
  };
   
  export const Card = ({
    rotate,
    scale,
    children,
  }: {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    children: React.ReactNode;
  }) => {
    return (
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          boxShadow:
            "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        }}
        className="max-w-5xl mx-auto w-full border-4 border-[#6C6C6C] p-2 bg-[#222222] rounded-[30px] shadow-2xl"
      >
        <div className=" h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl ">
          {children}
        </div>
      </motion.div>
    );
  };