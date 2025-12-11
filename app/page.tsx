"use client";

import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";

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
  const [isScanning, setIsScanning] = useState<boolean>(true);

  const handleCamera = (camera: boolean) => {
    if (camera) setFacingMode("user");
    else setFacingMode("environment");
    setToggle(camera);
  };

  const captureQrCode = () => {
    if (webcamRef.current && isScanning) {
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
              setIsScanning(false);
            }
          }
        };
      }
    }
  };

  const resetScan = () => {
    setQrCode(null);
    setIsScanning(true);
  };

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      captureQrCode();
    }, 500);

    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            QR Code Scanner
          </h1>
          <p className="text-slate-400">Aponte a câmera para um código QR</p>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
          {/* Camera Section */}
          <div className="relative aspect-video bg-black">
            <Webcam
              ref={webcamRef}
              audio={false}
              height={720}
              width={1280}
              videoConstraints={{
                ...videoConstraints,
                facingMode,
              }}
              screenshotFormat="image/jpeg"
              className="w-full h-auto object-cover"
            />

            {/* Scanning Overlay */}
            {isScanning && !qrCode && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-44 h-44 sm:w-48 sm:h-48">
                  {/* Corner borders */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500"></div>
                  <div className="absolute top-0 right-0 w-12 h-8 border-t-4 border-r-4 border-blue-500"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-8 border-b-4 border-l-4 border-blue-500"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-8 border-b-4 border-r-4 border-blue-500"></div>

                  {/* Scanning line */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Status indicator */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <div
                  className={`w-2 h-2 rounded-full ${isScanning ? "bg-green-500 animate-pulse" : "bg-slate-500"}`}
                ></div>
                <span className="text-white text-sm font-medium">
                  {isScanning ? "Escaneando" : "Pausado"}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 bg-slate-800/80 border-t border-slate-700/50">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                onClick={() => handleCamera(!toggle)}
              >
                {toggle ? "Câmera Traseira" : "Câmera Frontal"}
              </button>

              {qrCode && (
                <button
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                  onClick={resetScan}
                >
                  Escanear Novamente
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Result Section */}
        {qrCode && (
          <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-2xl animate-fade-in">
            <div className="mb-4">
              <div className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
                <span className="text-green-400 font-semibold">
                  Código Detectado
                </span>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="mb-2">
                <span className="text-slate-400 text-sm font-medium">
                  Conteúdo:
                </span>
              </div>
              <div className="bg-black/30 rounded p-3 border border-slate-700/30">
                <pre className="text-slate-200 text-sm whitespace-pre-wrap break-all font-mono">
                  {qrCode}
                </pre>
              </div>
            </div>

            {qrCode.startsWith("http") && (
              <div className="mt-4">
                <a
                  href={qrCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Abrir Link
                </a>
              </div>
            )}
          </div>
        )}

        <style jsx>{`
          @keyframes scan {
            0% {
              top: 0;
            }
            100% {
              top: 100%;
            }
          }
          .animate-scan {
            animation: scan 2s linear infinite;
          }
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Home;
