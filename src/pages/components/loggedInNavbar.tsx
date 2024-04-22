import { currentUserAtom } from "@/atoms/atoms";
import { useRecoilState } from "recoil";
import { FiAlignLeft, FiBarChart, FiDollarSign, FiLogOut, FiMessageSquare } from "react-icons/fi";
import { FaAlignLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function LoggedInNavBar() {

    const [loggedInUser, setloggedInUser] = useRecoilState(currentUserAtom);
    const navigate=useNavigate();

    interface NavItemProps{
        icon:any;
        title:string;
        onClick:any;
    }

    const NavItem=(props:NavItemProps)=>{
        
        const [current, setcurrent] = useState(false);

        useEffect(()=>{
            if(window.location.pathname=="/"+props.title.toLowerCase() || window.location.pathname=="/" && props.title=="Scripts"){
                setcurrent(true);
            }
        },[])

        return(
            <button onClick={()=>[props.onClick()]} className={`text-start flex flex-row justify-start items-center gap-2 w-full px-4 py-2 rounded-sm text-md shadow-2xl shadow-yellow-600/20 mb-3 hover:scale-105 transiton-all duration-300 ${current==true?"bg-white/80 text-black font-medium":"hover:bg-white/20 hover:text-white/90 bg-white/5 text-white/60"}`}>
                    {props.icon}
                    <div>{props.title}</div>
            </button>
        )
    }

    return (
        <div className="h-full w-80 flex-none bg-[#0F090C]/90 flex justify-start items-start flex-col py-10 px-4">

            <div className="flex flex-row justify-start items-center gap-2 bg-white/20 shadow-2xl shadow-yellow-600/20 text-white/80 w-full p-2 rounded-md mb-10">
                <div style={{ backgroundImage: `url('${loggedInUser.photoUrl}')` }} className="bg-white/20 transition-all duration-300 h-10 w-10 rounded-full bg-cover bg-center flex flex-none"></div>
                <div className="flex flex-col justify-center items-start gap-0 text-start">
                    <div className="text-md font-bold">{loggedInUser.name==undefined?"xxxx":loggedInUser.name}</div>
                    <div className="text-sm font-normal">{loggedInUser.email==undefined?"xxxx":loggedInUser.email}</div>
                </div>
            </div>

            <NavItem icon={<FiAlignLeft size={15}/>} title="Scripts" onClick={()=>{navigate('/')}} />
            <NavItem icon={<FiBarChart size={15}/>} title="Analytics" onClick={()=>{navigate('/analytics')}} />
            <NavItem icon={<FiDollarSign size={15}/>} title="License" onClick={()=>{navigate('/license')}} />
            <div className="w-full h-[2px] bg-white/10 mb-5 mt-3"></div>
            <NavItem icon={<FiMessageSquare size={15}/>} title="Feedback" onClick={()=>{navigate('/feedback')}} />
            <NavItem icon={<FiLogOut size={15}/>} title="Log Out" onClick={()=>{localStorage.clear();window.location.href="/"}} />


        </div>
    );
}

export default LoggedInNavBar;