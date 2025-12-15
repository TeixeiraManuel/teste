"use client";
import { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";

interface QRScannerProps {
  facingMode: string;
  isScanning: boolean;
  qrCode: string | null;
  onQrCodeDetected: (data: string) => void;
  webcamRef: React.RefObject<Webcam | null>;
}

export const QRScanner: React.FC<QRScannerProps> = ({
  facingMode,
  isScanning,
  qrCode,
  onQrCodeDetected,
  webcamRef,
}) => {
  const captureQrCode = () => {
    if (!webcamRef.current || !isScanning) return;
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
              onQrCodeDetected(code.data);
            }
          }
        };
      }
    }
  };

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      captureQrCode();
    }, 500);

    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <div className="relative aspect-video bg-black">
      <Webcam
        ref={webcamRef}
        audio={false}
        height={720}
        width={1280}
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode,
        }}
        screenshotFormat="image/jpeg"
        className="w-full h-auto object-cover"
      />

      {/* Scanning Overlay */}
      {isScanning && !qrCode && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-44 h-44 sm:w-48 sm:h-48">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500"></div>
            <div className="absolute top-0 right-0 w-12 h-8 border-t-4 border-r-4 border-blue-500"></div>
            <div className="absolute bottom-0 left-0 w-12 h-8 border-b-4 border-l-4 border-blue-500"></div>
            <div className="absolute bottom-0 right-0 w-12 h-8 border-b-4 border-r-4 border-blue-500"></div>

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
            className={`w-2 h-2 rounded-full ${
              isScanning ? "bg-green-500 animate-pulse" : "bg-slate-500"
            }`}
          ></div>
          <span className="text-white text-sm font-medium">
            {isScanning ? "Escaneando..." : "Pausado"}
          </span>
        </div>
      </div>
    </div>
  );
};
