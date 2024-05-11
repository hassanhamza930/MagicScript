import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { IoReorderThreeSharp } from "react-icons/io5";

const handleStyle = { left: 10 };

export default function InputNode({ data }) {

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <>
            <Handle className='bg-blue-600 h-[10px] w-[10px] ' type="target" position={Position.Top} />
            <div className='bg-white rounded-sm flex flex-row py-1 px-2 justify-start items-center w-64'>
                <div className='flex flex-col justify-center items-center h-full gap-[2px] w-[10px]'>
                        <div className='w-full h-[1px] bg-black/90'></div>
                        <div className=' w-full h-[1px] bg-black/90'></div>
                        <div className='w-full h-[1px] bg-black/90'></div>
                </div>
                <input value={data.value} id="text" name="text" onChange={onChange} className="nodrag h-full w-full text-xs p-2 outline-none" />
            </div>
            <Handle className='bg-blue-600 h-[10px] w-[10px] ' type="source" position={Position.Bottom} id="a" />

        </>
    );
}