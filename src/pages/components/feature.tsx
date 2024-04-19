

interface Feature {
    title:string
    description:string
    image:any
}

function Feature(props:Feature) {
    return (
        <div className="h-80 w-80 bg-white/10 rounded-xl flex flex-none p-5 flex-col justify-start items-start tracking-normal">
            <div style={{ backgroundImage: `url('${props.image}')` }} className="h-72 bg-cover rounded-xl overflow-hidden bg-no-repeat bg-center w-full">
            </div>

            <div className='text-white/90 font-medium text-xl mt-2'>
                {props.title}
            </div>
            <div className='text-white/60 text-sm'>
                {props.description}
            </div>


        </div>
    );
}

export default Feature;