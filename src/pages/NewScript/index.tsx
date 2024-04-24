import { Script, ScriptLine } from "@/interfaces";
import { useState } from "react";

interface ScriptProps {
  script: Script;
  setScript: React.Dispatch<React.SetStateAction<Script>>;
}

interface ScriptLineProps {
  line: ScriptLine;
  onUpdateText: (text: string) => void;
}

const ScriptLineComponent: React.FC<ScriptLineProps> = ({
  line,
  onUpdateText,
}) => {
  const [text, setText] = useState(line.text);

  const handleUpdateText = (textData: string) => {
    onUpdateText(textData);
  };

  return (
    <li className="mb-2">
      <div className="flex">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleUpdateText(e.target.value);
          }}
          className="mr-2 px-2 py-1 bg-gray-100 text-black rounded"
        />
      </div>
    </li>
  );
};

const ScriptComponent: React.FC<ScriptProps> = ({ script, setScript }) => {
  const [newMessageText, setNewMessageText] = useState("");

  const handleAddNewMessage = (line: ScriptLine) => {
    const updatedScript = { ...script };

    const addNewMessageRecursive = (lines: ScriptLine[]): ScriptLine[] => {
      return lines.map((l) => {
        if (l === line) {
          return {
            ...l,
            newMessages: [...(l.newMessages || []), { text: newMessageText }],
          };
        } else if (l.newMessages) {
          return {
            ...l,
            newMessages: addNewMessageRecursive(l.newMessages),
          };
        }
        return l;
      });
    };

    updatedScript.lines = addNewMessageRecursive(script.lines);
    setScript(updatedScript);
    setNewMessageText("");
  };

  const handleAddNewScriptLine = (index: number) => {
    const updatedScript = { ...script };
    const newLine: ScriptLine = { text: "" };
    updatedScript.lines.splice(index + 1, 0, newLine);
    setScript(updatedScript);
  };

  const handleAddNewScript = () => {
    const updatedScript = { ...script };
    updatedScript.lines.push({ text: "" });
    setScript(updatedScript);
  };

  const handleUpdateLineText = (updatedText: string, index: number) => {
    const updatedScript = { ...script };
    updatedScript.lines[index].text = updatedText;
    setScript(updatedScript);
  };

  const renderScriptLines = (lines: ScriptLine[], parentIndex: number = 0) => {
    return (
      <ul className="pl-4 text-white">
        {lines.map((line, index) => (
          <li key={index} className="mb-2 flex">
            <ScriptLineComponent
              line={line}
              onUpdateText={(text) =>
                handleUpdateLineText(text, parentIndex + index)
              }
            />
            <button
              className="ml-2 px-2 bg-blue-500 text-white rounded"
              onClick={() => handleAddNewMessage(line)}
            >
              +f
            </button>
            <button
              className="ml-2 px-2 bg-blue-500 text-white rounded"
              onClick={() => handleAddNewScriptLine(parentIndex + index)}
            >
              +b
            </button>
            {line.newMessages &&
              renderScriptLines(line.newMessages, parentIndex + index)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{script.name}</h2>
      {renderScriptLines(script.lines)}
      <button
        className="ml-2 px-2 bg-blue-500 text-white rounded"
        onClick={handleAddNewScript}
      >
        +b
      </button>
    </div>
  );
};
const App: React.FC = () => {
  const scriptData: Script = {
    name: "Main Script",
    lines: [
      {
        text: "Line 1",
      },
      {
        text: "Line 1",
      },
      {
        text: "Line 1",
      },
      {
        text: "Line 1",
      },
      {
        text: "Line 2",
        newMessages: [
          {
            text: "Subline 1",
          },
          {
            text: "Subline 2",
            newMessages: [
              {
                text: "Sub-subline 1",
              },
            ],
          },
        ],
      },
    ],
  };
  const [script, setScript] = useState(scriptData);

  return (
    <div className="container mx-auto py-8">
      {/* <h1 className="text-3xl font-bold mb-8">Script Structure</h1> */}
      <ScriptComponent script={script} setScript={setScript} />;
    </div>
  );
};

export default App;
