import { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import LoggedInRoutes from './pages/components/loggedInRoutes';
import LoggedOutRoutes from './pages/components/loggedOutRoutes';
import { useRecoilState } from 'recoil';
import { currentUserAtom, isLoadingAtom } from './atoms/atoms';
import { collection, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { User } from './interfaces';
import { Toaster } from 'sonner';


const firebaseConfig = {
  apiKey: "AIzaSyAdO9N2dgBZEYtV4ROrytZ0nTtjfJrgGqg",
  authDomain: "chatapp-dda45.firebaseapp.com",
  databaseURL: "https://chatapp-dda45.firebaseio.com",
  projectId: "chatapp-dda45",
  storageBucket: "chatapp-dda45.appspot.com",
  messagingSenderId: "912752217974",
  appId: "1:912752217974:web:982e468b1ac21864f77457"
};


function App() {
  const [count, setCount] = useState(0)
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem("uid")==undefined?false:true);
  const [loading, setloading] = useRecoilState(isLoadingAtom);
  const [loggedInUser, setloggedInUser] = useRecoilState(currentUserAtom);
  const db=getFirestore();

  useEffect(()=>{
    if(localStorage.getItem("uid")!=undefined){
      onSnapshot(doc(db, "users",localStorage.getItem("uid") as string), (doc) => {
        if (doc.exists()) {
          setloggedInUser(doc.data() as User);
          setloading(false);
        } 
        else {
          localStorage.clear();
        }
      });
    }
  },[])



  return (
    <div style={{ fontFamily: "Roboto" }} className='h-screen w-full flex justify-start items-start'>
        <Toaster />
        {
          loading==true&&
          <div className='h-screen w-full fixed z-50 bg-black/80'>
          </div>
        }
        {
          isLoggedIn==true?
          <LoggedInRoutes/>:
          <LoggedOutRoutes/>
        }
    </div>
  )
}

export default App
