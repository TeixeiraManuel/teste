"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

// Tipagem para as configurações da webcam
const videoConstraints = {
  width: 1280,
  height: 720,
};

const Home = () => {
  const webcamRef = useRef<any>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  );
  const [toggle, setToggle] = useState<boolean>(false);
  // Tipagem para deviceId
  const [deviceId, setDeviceId] = useState<string>("");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const handleCamera = (camera: boolean) => {
    if (camera) setFacingMode("user");
    else setFacingMode("environment");
    setToggle(camera);
    console.log(camera);
  };
  // Função para filtrar os dispositivos de vídeo
  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(
        mediaDevices.filter(
          ({ kind }: MediaDeviceInfo) => kind === "videoinput",
        ),
      ),
    [setDevices],
  );
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-white w-full p-20 md:p-0">
      <div>
        <Webcam
          ref={webcamRef}
          audio={false}
          height={10000}
          width={10000}
          videoConstraints={{
            ...videoConstraints,
            facingMode,
          }}
        />
      </div>
      <button
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => handleCamera(!toggle)}
      >
        Trocar
      </button>
    </div>
  );
};

export default Home;
