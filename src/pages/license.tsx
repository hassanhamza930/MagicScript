import { currentUserAtom, isLoadingAtom } from "@/atoms/atoms";
import { Button } from "@/components/ui/button";
import { User } from "@/interfaces";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { toast } from "sonner";



//subscription productid
//Phz1QXn6QoI9gSSai17qJQ==

function License() {

    const [license, setlicense] = useState("");
    const [loading, setloading] = useRecoilState(isLoadingAtom);
    const [loggedInUser, setloggedInUser] = useRecoilState(currentUserAtom);
    const db = getFirestore();

    async function activateLicense() {
        try {
            setloading(true);
            const requestBody = new URLSearchParams();
            requestBody.append('product_id', 'Phz1QXn6QoI9gSSai17qJQ==');
            requestBody.append('license_key', license);
            requestBody.append('increment_uses_count', "true");
            const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
                method: 'POST',
                body: requestBody,
            });
            const data = await response.json();
            console.log(data);

            if (data.purchase.subscription_cancelled_at != null) {
                alert("You have cancelled your subscription license, Please buy a new license key")
                setloading(false);
                return;
            }

            else if (data.purchase.subscription_ended_at != null) {
                alert("Your subscription has ended, please buy a new license key")
                setloading(false)
                return;
            }

            else if (data.purchase.subscription_failed_at != null) {
                alert("Your payment may have failed, please fix your payment method and try again.")
                setloading(false)
                return;
            }

            else if (data.success) {
                await setDoc(doc(db, "users", localStorage.getItem("uid") as string), { plan: "Paid", licenseKey: license } as User, { merge: true });
                toast.success("License Activated Successfully");
                setloading(false);

            }

            if (!data.success) {
                setloading(false);
                throw new Error(data.message);
            }
        } catch (error) {
            if (error?.response?.status === 404) {
                alert("Invalid Licensce Key, Contact support at hassanhamza930@gmail.com");
                console.log('License key doesn\'t exist');
                setloading(false);
                return;
            }

            setloading(false);
            alert("Invalid Licensce Key, Contact support at hassanhamza930@gmail.com");
            console.log('Verifying license key failed', error);
        }
    }



    return (
        <div className="relative h-full w-full flex justify-start items-start p-10 tracking-tighter">
            <div style={{ fontFamily: "Roboto" }} className="tracking-tight relative h-full w-full flex flex-col justify-start items-start">
                {
                    loggedInUser.plan != "Paid" &&
                    <>
                        <div className="text-3xl font-medium text-white/80">Activate your license</div>
                        <div className="text-md font-regular text-white/80">Please Activate your license to start using the app and supercharge your cold calling</div>
                    </>
                }
                {
                    loggedInUser.plan != "Paid" &&
                    <div className="flex flex-row justify-start items-center gap-2 mt-5">
                        <input value={license} onChange={(e) => { setlicense(e.target.value) }} placeholder="Enter License Key" className="w-96 rounded-md bg-white/90 px-5 py-2"></input>
                        <Button onClick={() => { activateLicense() }} className="py-5">Activate</Button>
                    </div>

                }

                <div className=" w-[550px] bg-gradient-to-br from-[#57ebde] to-[#aefb2a] flex flex-col justify-center items-center text-center rounded-xl overflow-hidden tracking-tight mt-10">
                    <div className="h-full w-full bg-yellow-400 backdrop-blur-xl p-5 flex flex-col justify-start items-start">
                        <span className="text-2xl font-medium text-start">
                            {
                                loggedInUser.plan == "Paid" ? "Wohoo! you are on the lifetime access plan" : "Get Access Today!"
                            }
                        </span>
                        <span className="text-sm opacity-70 text-start">

                            {
                                loggedInUser.plan == "Paid" ? "You will have early access to all the features that are under dev!" : "Take advantage of early bird pricing and get access now along with all future updates."
                            }
                        </span>



                        <div className="flex flex-row justify-start items-center gap-2 mt-4">
                            <FaCheck size={15} />
                            <div className="text-sm font-normal opacity-80">
                                Node Based Sales Script Builder to map out all flows
                            </div>
                        </div>

                        <div className="flex flex-row justify-start items-center gap-2 mt-1">
                            <FaCheck size={15} />
                            <div className="text-sm font-normal opacity-80 text-start">
                                Pivot Easily with a beautiful teleprompter
                            </div>
                        </div>

                        <div className="flex flex-row justify-start items-center gap-2 mt-1">
                            <FaCheck size={15} />
                            <div className="text-sm font-normal opacity-80 text-start">
                                Detailed Analytics to see where customers are dropping off
                            </div>
                        </div>


                        {
                            loggedInUser.plan != "Paid" &&
                            <>
                                <Button onClick={() => { window.open("https://hassanhamza930.gumroad.com/l/closeysub") }} className="bg-black/80 hover:text-white hover:bg-blue-600 px-6 py-2 text-md text-white/80 font-normal mt-10">
                                    Start 1 Week Free Trial
                                </Button>
                                <div className="mt-4 text-sm ml-1">Cancel anytime</div>
                                <div className="mt-1 text-sm ml-1">$10/ Month Afterwards</div>
                            </>
                        }


                    </div>
                </div>

                {
                    loggedInUser.plan == "Paid" &&
                    <button onClick={()=>{window.open('https://app.gumroad.com/library')}} className="py-2 px-5 text-sm rounded-md mt-5 bg-white hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300 ">
                        Manage Subscription
                    </button>
                }

            </div>
        </div>
    );
}

export default License;