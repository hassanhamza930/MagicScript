import { Route, Routes } from "react-router-dom";
import Demo from "../Demo";
import LoggedInNavBar from "./loggedInNavbar";
import Scripts from "../scripts";
import NewScript from "../newScript";
import Play from "../play";
import EditScript from "../editScript";
import License from "../license";
import Feedback from "../feedback";
import NewScriptExperimental from "../newScriptExperimental/newScriptExperimental";
import Analytics from "../analytics";
import { useEffect } from "react";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { User } from "@/interfaces";

function LoggedInRoutes() {

    const db = getFirestore();

    async function checkLicense(): Promise<boolean> {
        var userDoc = (await getDoc(doc(db, "users", localStorage.getItem("uid") as string))).data() as User;
        if(userDoc.early==true){
            return true;
        }
        else if (userDoc.licenseKey == undefined) {
            return false;
        }

        try {
            const requestBody = new URLSearchParams();
            requestBody.append('product_id', 'Phz1QXn6QoI9gSSai17qJQ==');
            requestBody.append('license_key', userDoc.licenseKey);
            const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
                method: 'POST',
                body: requestBody,
            });
            const data = await response.json();
            console.log(data);

            if (data.purchase.subscription_cancelled_at != null) {
                return false;
            }

            else if (data.purchase.subscription_ended_at != null) {
                alert("Your subscription has ended, please buy a new license key")
                return false;
            }

            else if (data.purchase.subscription_failed_at != null) {
                alert("Your payment may have failed, please fix your payment method and try again.")
                return false;
            }

            else if(data.success==true){
                console.log(data.subscription_cancelled_at)
                console.log(data.subscription_ended_at)
                console.log(data.subscription_failed_at)
                return true;
            }

            return false

        }

        catch (error) {
            if (error?.response?.status === 404) {
                console.log('License key doesn\'t exist');
                return false;
            }

            return false
        }
    }


    useEffect(() => {
        //need to check license here
        checkLicense().then(async (isValid) => {
            if(isValid==false){
                await setDoc(doc(db, "users", localStorage.getItem("uid") as string), { plan: "Free" } as User, { merge: true });
            }
            else{
                // await setDoc(doc(db, "users", localStorage.getItem("uid") as string), { plan: "Paid" } as User, { merge: true });
            }
        })

    }, [])




    return (
        <>
            {
                window.innerWidth < 1280 ?
                    <div className='fixed z-10 h-screen w-full bg-black/80 backdrop-blur-sm flex justify-center items-center'>
                        <div className='bg-gradient-to-br from-[#57ebde] to-[#aefb2a] h-96 w-4/5 md:h-96 md:w-96 rounded-2xl overflow-hidden'>
                            <div className="bg-yellow-300/60 h-full w-full flex flex-col justify-center items-center tracking-tight text-center p-5 text-black/80">
                                <div className="text-3xl font-medium">Desktop Only 🙁 </div>
                                <div className="text-sm font-normal">MagicScript looks best on desktop and is designed to be used with the phone in the other hand.</div>
                                <div className="text-sm font-normal mt-10">Please visit on Desktop to start using</div>
                                <div className="text-sm font-bold">https://magicscript.vercel.app</div>
                            </div>
                        </div>
                    </div> :
                    <div className="relative flex justify-start flex-row items-center h-full w-full bg-black/80">
                        <LoggedInNavBar />
                        <div className="relative w-full h-full flex justify-start items-start">
                            <Routes>
                                <Route path="/" element={<Scripts />} />
                                <Route path="/newscript" element={<NewScript />} />
                                <Route path="/newscriptexperimental" element={<NewScriptExperimental />} />
                                <Route path="/edit/:scriptid" element={<NewScriptExperimental />} />
                                <Route path="/play/:scriptid" element={<Play />} />
                                <Route path="/license" element={<License />} />
                                <Route path="/feedback" element={<Feedback />} />
                                <Route path="/analytics" element={<Analytics />} />
                            </Routes>
                        </div>
                    </div>
            }
        </>

    );
}

export default LoggedInRoutes;