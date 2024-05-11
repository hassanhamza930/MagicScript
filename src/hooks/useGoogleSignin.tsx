import { isLoadingAtom } from "@/atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {Script, User} from "@/interfaces";


export default function useHandleGoogleSignIn() {

    const [isLoading, setisLoading] = useRecoilState(isLoadingAtom);

    async function handleGoogleSignIn() {
        setisLoading(true);
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const db=getFirestore();

        await auth.signOut();
        signInWithPopup(auth, provider).then(async (result) => {

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential!.accessToken;
            const user = result.user;
            console.log(user.displayName);

            var userDataToDumpOnFirebase:User={} as User;
            userDataToDumpOnFirebase.email=user.email!;
            userDataToDumpOnFirebase.name=user.displayName!;
            userDataToDumpOnFirebase.photoUrl=user.photoURL!;

            await setDoc(doc(db,"users",user.uid),userDataToDumpOnFirebase,{merge:true});
            localStorage.setItem("uid",user.uid);
            // await setDoc(doc(db,"users",user.uid,"scripts","demo"),{
            //     name:"Demo Script",
            //     lines:[
            //         {
            //             text:"Hello, My name is Hamza, and this is the most confident i have ever sounded on call",
            //         },
            //         {
            //             text:"You can only relate to the feeling once you've been through this experience, You're trying to remember what to say and how to say it while staying confident and you end up blanking and taking 3 second long pauses. Sounds familiar right?"
            //         },
            //         {
            //             text:"Newscasters have been using teleprompters for 50+ Years, Inspired by that, I created Magic Script"
            //         },
            //         {
            //             text:"Magic Script is a teleprompter designed specifically for sales people, to make cold calling a breeze"
            //         },
            //         {
            //             text:"Using a Teleprompter allows you to stay focused, Keep the conversation on track, Always sound more confident on calls, and close more deals"
            //         },
            //         {
            //             text:"I'm actively adding features like, The Ability to Pivot and create multiple scenarios within one script, Custom shortcuts to handle common objections, and much more"
            //         },
            //         {
            //             text:"Visit our website, to Sign up for early bird pricing and get lifetime access for just $10 and support development."
            //         },
            //         {
            //             text:"Happy Selling!"
            //         }
            //     ]
            // } as Script,{merge:true});
            setisLoading(false);
            window.location.href="/"


        }).catch((error) => {
            setisLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorMessage);
        });


    }


    return { handleGoogleSignIn };

}