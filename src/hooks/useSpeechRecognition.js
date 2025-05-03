import { useRef , useEffect } from "react";

export const useSpeechRecognition = (onResultCallback) => {
  const recognitionRef = useRef(null);
  useEffect(()=> {
    if("webkitSpeechRecognition" in window) {
     const recognition = new window.webkitSpeechRecognition();
     recognition.continuous = true;
     recognition.lang = "es-ES";
     recognition.onresult = (event) => {
        const transcript = event.results[event.results.length -1][0].transcript;
        console.log("texto detectado:", transcript);
        onResultCallback?.(transcript);
     }
      recognition.onerror = (event) => {
				console.error("Error en reconocimiento de voz:", event.error);
			};  recognitionRef.current = recognition;
  }
    else {
    alert("Tu navegador no soporta reconocimiento de voz.");
  }
    
  },[onResultCallback])
const start = () => recognitionRef.current?.start();
const stop = () => recognitionRef.current?.stop(); 

return { start, stop, recognition: recognitionRef.current };
};


