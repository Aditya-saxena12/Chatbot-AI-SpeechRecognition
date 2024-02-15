import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

//App Component
const App = () => {

  //State variables
  const [textToCopy, setTextToCopy] = useState(); //use of state for text to copy
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  //function to start listening to Speech
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  
  //Destructuring values from useSpeechRecognition hook
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();


  //If Browser doesnt support Speech Recognition
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  //Rendering JSX
  return (
    <>
      <div className="container">
        <h2>Speech to Text Converter</h2>
        <br />
        <p>
          An AI that converts speech from the microphone to text and makes it
          available to your React components.
        </p>

        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
