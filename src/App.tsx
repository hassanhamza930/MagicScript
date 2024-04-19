import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landingPage'
import Demo from './pages/Demo'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import EarlyAccess from './pages/earlyAccess';
import EarlyAccessSubmiited from './pages/earlyAccessSubmitted';

const firebaseConfig = {
  apiKey: "AIzaSyCYyQEMivIp0rCXMkXL55dBG8hiiVf67vg",
  authDomain: "onesmallstep-v2.firebaseapp.com",
  projectId: "onesmallstep-v2",
  storageBucket: "onesmallstep-v2.appspot.com",
  messagingSenderId: "201665148939",
  appId: "1:201665148939:web:93457bb9b74f09313faf0e",
  measurementId: "G-VJFHPWPQMQ"
};




function App() {
  const [count, setCount] = useState(0)
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <div style={{fontFamily:"Roboto"}} className='h-screen w-full'>
      <Routes>
        <Route path='/' element={<Demo/>} />
      </Routes>

    </div>
  )
}

export default App
