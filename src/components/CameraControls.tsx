"use client";

interface CameraControlsProps {
  toggle: boolean;
  qrCode: string | null;
  onCameraToggle: () => void;
  onResetScan: () => void;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  toggle,
  qrCode,
  onCameraToggle,
  onResetScan,
}) => {
  return (
    <div className="p-6 bg-slate-800/80 border-t border-slate-700/50">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          onClick={onCameraToggle}
        >
          {toggle ? "Câmera Traseira" : "Câmera Frontal"}
        </button>

        {qrCode && (
          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            onClick={onResetScan}
          >
            Escanear Novamente
          </button>
        )}
      </div>
    </div>
  );
};
