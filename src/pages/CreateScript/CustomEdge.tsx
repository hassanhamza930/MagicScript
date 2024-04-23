// import { FiX } from "react-icons/fi";
import {
  EdgeLabelRenderer,
  EdgeProps,
  SimpleBezierEdge,
  // getStraightPath,
  // useReactFlow,
} from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  sourcePosition,
  target,
  targetPosition,
  animated,
}: EdgeProps) {
  // const { setEdges } = useReactFlow();
  // const [, labelX, labelY] = getStraightPath({
  //   sourceX,
  //   sourceY,
  //   targetX,
  //   targetY,
  // });

  return (
    <>
      {/* <BaseEdge id={id} path={edgePath}  /> */}
      <SimpleBezierEdge
        id={id}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        source={source}
        sourcePosition={sourcePosition}
        target={target}
        targetPosition={targetPosition}
        animated={animated}
      />

      <EdgeLabelRenderer>
        {/* <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="bg-slate-100/30 w-6 h-6 rounded-full text-black text-lg font-bold flex items-center justify-center"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          <FiX />
        </button> */}
        <></>
      </EdgeLabelRenderer>
    </>
  );
}
