"use client";
import { ScannedData } from "@/types";

interface ValidationModalProps {
  scannedData: ScannedData;
  onClose: () => void;
}

export const ValidationModal: React.FC<ValidationModalProps> = ({
  scannedData,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
        {/* Ícone e Status */}
        <div className="text-center mb-6">
          {scannedData.success ? (
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}

          <h2
            className={`text-2xl font-bold mb-2 ${
              scannedData.success ? "text-green-400" : "text-red-400"
            }`}
          >
            {scannedData.success ? "Validação Aprovada!" : "Validação Recusada"}
          </h2>
          <p className="text-slate-300 mb-2">{scannedData.message}</p>
          <p className="text-slate-400 text-sm">
            Transação:{" "}
            <span className="font-mono">{scannedData.transactionId}</span>
          </p>
        </div>

        {/* Detalhes da Validação */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-6">
          <div className="space-y-4">
            {scannedData.success ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 text-sm">Produto:</span>
                    <p className="text-white font-semibold">
                      {scannedData.productName}
                    </p>
                    <p className="text-slate-400 text-xs">
                      ID: {scannedData.productId}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Lote:</span>
                    <p className="text-white font-semibold">
                      {scannedData.productBatch}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 text-sm">Categoria:</span>
                    <p className="text-white font-semibold">
                      {scannedData.productCategory}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Validade:</span>
                    <p className="text-white font-semibold">
                      {scannedData.productExpiration}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-4">
                  <span className="text-slate-400 text-sm">Operador:</span>
                  <p className="text-white font-semibold">
                    {scannedData.userName}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {scannedData.userRole} • {scannedData.userDepartment}
                  </p>
                </div>

                <div className="text-center pt-2 border-t border-slate-700/50">
                  <p className="text-slate-400 text-sm">Hora da validação:</p>
                  <p className="text-white font-semibold">
                    {scannedData.scanTime}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <div>
                    <span className="text-slate-400 text-sm">
                      Tipo de erro:
                    </span>
                    <p className="text-red-300 font-semibold capitalize">
                      {scannedData.errorType?.replace(/_/g, " ").toLowerCase()}
                    </p>
                  </div>

                  {scannedData.productName && (
                    <div>
                      <span className="text-slate-400 text-sm">Produto:</span>
                      <p className="text-white">{scannedData.productName}</p>
                    </div>
                  )}

                  {scannedData.userName && (
                    <div>
                      <span className="text-slate-400 text-sm">Usuário:</span>
                      <p className="text-white">{scannedData.userName}</p>
                    </div>
                  )}

                  {scannedData.productStatus && (
                    <div>
                      <span className="text-slate-400 text-sm">
                        Status do produto:
                      </span>
                      <p className="text-red-300">
                        {scannedData.productStatus}
                      </p>
                    </div>
                  )}

                  {scannedData.expirationDate && (
                    <div>
                      <span className="text-slate-400 text-sm">
                        Data de validade:
                      </span>
                      <p className="text-red-300">
                        {scannedData.expirationDate}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Resposta do Servidor */}
        <div className="mb-6 p-3 bg-slate-900/30 rounded-lg border border-slate-700/30">
          <p className="text-slate-400 text-sm mb-1">Resposta do servidor:</p>
          <p
            className={`text-sm ${
              scannedData.success ? "text-green-400" : "text-red-400"
            }`}
          >
            {scannedData.serverResponse}
          </p>
        </div>

        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className={`w-full px-6 py-3 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
            scannedData.success
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-red-600 hover:bg-red-500 text-white"
          }`}
        >
          {scannedData.success ? "Validar Novo Item" : "Tentar Novamente"}
        </button>
      </div>
    </div>
  );
};
