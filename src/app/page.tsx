"use client";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { QRScanner } from "../components/QRScanner";
import { ValidationModal } from "../components/ValidationModal";
import { CameraControls } from "../components/CameraControls";
import { TestInfo } from "../components/TestInfo";
import { MOCK_USERS, MOCK_PRODUCTS, VALID_QR_FORMAT } from "@/data/mockData";
import { ValidationResult, ScannedData } from "@/types";

export default function Home() {
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  );
  const [toggle, setToggle] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);

  const handleCamera = (camera: boolean) => {
    if (camera) setFacingMode("user");
    else setFacingMode("environment");
    setToggle(camera);
  };

  const validateQRCode = (data: string): ValidationResult => {
    // Verifica formato: PRODUTO_ID|USER_ID
    if (!VALID_QR_FORMAT.test(data)) {
      return {
        success: false,
        message: "Formato de QR Code inválido.",
        details: "Formato esperado: PRODUTO_ID|USER_ID (ex: PROD001|joao123)",
        errorType: "FORMAT_ERROR",
      };
    }

    const [productId, userId] = data.split("|");

    // Busca produto nos dados fictícios
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    const user = MOCK_USERS.find((u) => u.id === userId);

    // Valida produto
    if (!product) {
      return {
        success: false,
        message: `Produto "${productId}" não encontrado.`,
        productId,
        userId,
        errorType: "PRODUCT_NOT_FOUND",
      };
    }

    // Valida usuário
    if (!user) {
      return {
        success: false,
        message: `Usuário "${userId}" não autorizado.`,
        productId,
        userId,
        productName: product.name,
        errorType: "USER_NOT_FOUND",
      };
    }

    // Verifica status do produto
    if (product.status !== "Ativo") {
      return {
        success: false,
        message: `Produto "${product.name}" está ${product.status.toLowerCase()}.`,
        productId,
        userId,
        productName: product.name,
        productStatus: product.status,
        userName: user.name,
        errorType: "PRODUCT_INACTIVE",
      };
    }

    // Verifica validade do produto
    const expirationDate = new Date(product.expiration);
    const today = new Date();
    if (expirationDate < today) {
      return {
        success: false,
        message: `Produto "${product.name}" está expirado.`,
        productId,
        userId,
        productName: product.name,
        expirationDate: product.expiration,
        userName: user.name,
        errorType: "PRODUCT_EXPIRED",
      };
    }

    return {
      success: true,
      message: "Validação realizada com sucesso!",
      productId,
      userId,
      productName: product.name,
      productCategory: product.category,
      productBatch: product.batch,
      productExpiration: product.expiration,
      productStatus: product.status,
      userName: user.name,
      userRole: user.role,
      userDepartment: user.department,
      scanTime: new Date().toLocaleString("pt-BR"),
    };
  };

  const simulateBackendCall = async (
    validationData: ValidationResult,
  ): Promise<{
    success: boolean;
    transactionId: string;
    timestamp: string;
    serverResponse: string;
  }> => {
    // Simulação de chamada API com delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula resposta do backend
        const response = {
          success: validationData.success,
          transactionId: `TRX-${Date.now()}`,
          timestamp: new Date().toISOString(),
          serverResponse: validationData.success
            ? "Registro de validação armazenado com sucesso."
            : "Erro registrado no sistema.",
        };
        resolve(response);
      }, 800);
    });
  };

  const handleQrCodeDetected = async (data: string) => {
    setQrCode(data);
    setIsScanning(false);

    // Valida o QR Code
    const result = validateQRCode(data);

    // Simula envio para backend
    const backendResponse = await simulateBackendCall(result);

    const fullData: ScannedData = {
      ...result,
      transactionId: backendResponse.transactionId,
      serverResponse: backendResponse.serverResponse,
    };

    setScannedData(fullData);
    setShowModal(true);
  };

  const resetScan = () => {
    setQrCode(null);
    setIsScanning(true);
    setShowModal(false);
    setScannedData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Sistema de Validação QR Code
          </h1>
          <p className="text-slate-400">Validação de produtos e usuários</p>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
          {/* QR Scanner Component */}
          <QRScanner
            facingMode={facingMode}
            isScanning={isScanning}
            qrCode={qrCode}
            onQrCodeDetected={handleQrCodeDetected}
            webcamRef={webcamRef}
          />

          {/* Camera Controls Component */}
          <CameraControls
            toggle={toggle}
            qrCode={qrCode}
            onCameraToggle={() => handleCamera(!toggle)}
            onResetScan={resetScan}
          />
        </div>

        {/* Validation Modal Component */}
        {showModal && scannedData && (
          <ValidationModal scannedData={scannedData} onClose={resetScan} />
        )}

        {/* Test Info Component */}
        <TestInfo />

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
          @keyframes scale-in {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-scale-in {
            animation: scale-in 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}
