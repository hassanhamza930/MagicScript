import { motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import Toast from 'awesome-toast-component'
import { useNavigate } from "react-router-dom";




function EarlyAccess() {

    const db = getFirestore();
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [targetAudience, settargetAudience] = useState("");
    const [socialProfile, setsocialProfile] = useState("");
    const navigate = useNavigate();

    async function handleDataSubmit() {
        if (email != "" && targetAudience != "" && socialProfile != "") {
            await setDoc(doc(db, "waitlist", email), {
                email: email,
                targetAudience: targetAudience,
                socialProfile: socialProfile,
                time: Timestamp.now()
            }, { merge: true })
            new Toast("Submitted Successfully", { theme: 'light' })
            setTimeout(() => { navigate("/earlyAccessSubmitted") }, 1000);
        }
        else {
            new Toast("Please enter all details", { theme: 'light' })
        }
    }




    return (
        <div className={`h-screen w-full flex justify-start items-start bg-black/90 overflow-x-hidden`}>

            <div className="absolute z-10  w-full flex justify-center items-start py-5 overflow-hidden ">
                <motion.img
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    // transition={{ duration: 0.5, ease: "easeInOut" }}
                    src="/assets/logoYellow.svg" className="h-24 w-24 rounded-md bg-cover bg-center">

                </motion.img>

            </div>


            <div className="relative h-full w-full flex flex-col justify-center items-center text-white/90 overflow-hidden">


                <form onSubmit={(e) => { e.preventDefault(); handleDataSubmit() }} className="w-[30%] flex-col tracking-tight text-white/90 flex justify-center items-start">

                    <div className="text-center w-full text-md font-normal tracking-tight text-white/60">Apply for Early Access</div>



                    <div className="mt-5 text-md opacity-80">Email*</div>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="johndoe@gmail.com" className="shadow-2xl outline-none mt-1 text-sm bg-white/90 text-black/90 rounded-md w-full px-4 py-3"></input>


                    <div className="mt-5 text-md opacity-80">Target Audience*</div>
                    <input value={targetAudience} onChange={(e) => { settargetAudience(e.target.value) }} placeholder="Business Owners ..." className="shadow-2xl outline-none mt-1 text-sm bg-white/90 text-black/90 rounded-md w-full px-4 py-3"></input>

                    <div className="mt-5 text-md opacity-80">Please mention your social profile*</div>
                    <input value={socialProfile} onChange={(e) => { setsocialProfile(e.target.value) }} placeholder="Youtube, Instagram, Facebook ..." className="shadow-2xl outline-none mt-1 text-sm bg-white/90 text-black/90 rounded-md w-full px-4 py-3"></input>


                    <button type="submit" onClick={() => { }} className="flex flex-row justify-center items-center gap-2 text-white/90 hover:text-white px-5 py-2 w-full rounded-md shadow-purple-600/60 transition-all duration-200 shadow-2xl hover:shadow-purple-600 bg-blue-600 hover:scale-[1.05] text-sm text-white mt-16">
                        {"Submit"}
                    </button>


                </form>
            </div>


        </div>
    );
}

export default EarlyAccess;