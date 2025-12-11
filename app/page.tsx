"use client";
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";

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
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleCamera = (camera: boolean) => {
    if (camera) setFacingMode("user");
    else setFacingMode("environment");
    setToggle(camera);
  };

  // Função para capturar o frame da webcam e tentar ler o QR code
  const captureQrCode = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        const image = new Image();
        image.src = imageSrc;

        image.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (context) {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height);

            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height,
            );
            const code = jsQR(imageData.data, canvas.width, canvas.height, {
              inversionAttempts: "dontInvert",
            });

            if (code) {
              setQrCode(code.data);
            }
          }
        };
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      captureQrCode();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-white w-full p-20 md:p-0">
      <div>
        <Webcam
          ref={webcamRef}
          audio={false}
          height={720}
          width={1024}
          videoConstraints={{
            ...videoConstraints,
            facingMode,
          }}
          screenshotFormat="image/jpeg"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => handleCamera(!toggle)}
      >
        Trocar
      </button>
      {qrCode && (
        <div className="mt-4 text-center">
          <p className="text-xl">QR Code Detectado:</p>
          <pre>{qrCode}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
