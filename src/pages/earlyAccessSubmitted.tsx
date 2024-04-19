
import { motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import Toast from "awesome-toast-component";


function EarlyAccessSubmiited() {

    const db = getFirestore();



    return (
        <div className={`h-full bg-black/90 w-full flex flex-col justify-center items-center overflow-hidden`}>



            <div className="relative w-full text-center flex flex-col justify-center items-center text-white/90">

            <motion.img
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    // transition={{ duration: 0.5, ease: "easeInOut" }}
                    src="/assets/logoYellow.svg" className="h-36 w-36 rounded-md bg-cover bg-center -mt-24 mb-24">

                </motion.img>

                <motion.div
                    style={{ fontFamily: "Pacifico" }}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="tracking-tight text-6xl md:text-8xl
        flex justify-center items-center
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-orange-500 via-[#DC8686] to-yellow-500 h-36 w-full mb-0
            animate-text">

                    CourseCanvas
                </motion.div>

                <div className="text-center tracking-tight">
                    You have successfully applied for early access 🙌🎉,
                    <br />
                    You will hear from us on your email shortly

                </div>



            </div>


        </div>
    );
}

export default EarlyAccessSubmiited;