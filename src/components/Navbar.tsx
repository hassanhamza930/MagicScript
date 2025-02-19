import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";


export const NavBar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisibile] = useState(1);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;
    setVisibile(
      // eslint-disable-next-line
      // @ts-ignore
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
      currentScrollPos < 10
    );
    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  const navigate=useNavigate();


  return (
    <motion.nav
      initial={{ top: -32, opacity: 0 }}
      animate={{ top: -10, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={cn(
        "px-0 md:px-[20%] pt-8  fixed left-0 w-full z-50 ease-in-out transform flex justify-center items-center",
        visible ? "top-0" : "-top-32"
      )}
    >
      <div className=" rounded-xl px-5 py-2  flex justify-between items-center h-full w-3/4 bg-white/80 shadow-md border-2 bg-clip-padding backdrop-filter backdrop-blur-lg ">

        <Link to={"/demo"} className="">
          <img
            src="/assets/logo.svg"
            alt="logo"
            className="h-10 w-10 md:h-12 md:w-12 rounded-md bg-cover object-cover bg-center cursor-pointer"
          />
        </Link>

        <div className="hidden md:flex flex-row justify-start items-center gap-5 text-gray-900 font-bold">
          <Button variant={"ghost"} className="text-sm bg-black/80 text-white font-normal shadow-sm hover:bg-yellow-500/80 hover:shadow-2xl shadow-yellow-600/60 hover:text-black px-5 py-2">Get Started</Button>
        </div>

        {/* <div className="fkex md:hidden flex-row justify-start items-center gap-5 text-gray-900 font-bold">
          <Button onClick={()=>{navigate("/demo")}} variant={"ghost"} className="text-md">Demo</Button>
        </div> */}




      </div>
    </motion.nav>
  );
};
