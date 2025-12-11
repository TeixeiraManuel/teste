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
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  // Tipagem para deviceId
  const [deviceId, setDeviceId] = useState<string>("");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

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
    <div className="flex flex-col h-screen items-center justify-center bg-black w-full p-20 md:p-0">
      <div>
        <Webcam
          ref={webcamRef}
          audio={false}
          height={360}
          screenshotFormat="image/jpeg"
          width={720}
          videoConstraints={{
            ...videoConstraints,
            facingMode,
          }}
        />
      </div>

      <div className="flex">
        {recordedChunks.length > 0 && (
          <video
            controls
            style={{
              marginTop: 20,
              width: 720,
              height: 360,
            }}
          >
            <source
              src={URL.createObjectURL(
                new Blob(recordedChunks, { type: "video/webm" }),
              )}
              type="video/webm"
            />
          </video>
        )}
      </div>
      <div className="text-white">
        {/* {devices.map((device, key) => (
          <div>{device.label || `Device ${key + 1}`}</div>
        ))} */}
        <select
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          {devices.map((device, key) => (
            <option key={key} value={device.deviceId}>
              {device.label || `Device ${key + 1}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Home;
