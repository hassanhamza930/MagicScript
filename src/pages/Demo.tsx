
var salesScript=[
  "Hello John,How are you doing today?"
]



function Demo() {
  return ( 
    <div className="h-full w-full flex justify-center items-center bg-black/80 text-white/90">
        <div style={{fontFamily:"Roboto"}} className="text-7xl font-semibold tracking-tight">
            {
              "Hello John, How are you doing today?".split(",").map((item, index) => {
                return <div key={index}>{item}</div>
              })
            }
        </div>

    </div>
   );
}

export default Demo;