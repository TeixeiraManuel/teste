"use client";
import { MOCK_PRODUCTS, MOCK_USERS } from "@/data/mockData";

export const TestInfo: React.FC = () => {
  return (
    <div className="mt-6 bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6">
      <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        Dados para Teste - QR Codes Válidos
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="bg-slate-800/50 rounded-lg p-3">
              <div className="font-semibold text-green-400 mb-1">
                {product.name}
              </div>
              <div className="space-y-1">
                <p className="text-slate-300 text-sm">ID: {product.id}</p>
                <p className="text-slate-400 text-sm">Lote: {product.batch}</p>
                <p className="text-slate-400 text-sm">
                  Status: {product.status}
                </p>
                <div className="mt-2">
                  <p className="text-blue-300 text-xs font-semibold mb-1">
                    Usuários válidos:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {MOCK_USERS.slice(0, 2).map((user) => (
                      <span
                        key={user.id}
                        className="px-2 py-1 bg-slate-700/50 rounded text-xs"
                      >
                        {product.id}|{user.id}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
          <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Casos de Erro para Teste
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div className="p-2 bg-slate-800/30 rounded">
              <p className="text-red-300 font-semibold">Produto inexistente:</p>
              <p className="text-slate-400">PROD999|joao123</p>
            </div>
            <div className="p-2 bg-slate-800/30 rounded">
              <p className="text-red-300 font-semibold">Usuário inexistente:</p>
              <p className="text-slate-400">PROD001|usuario999</p>
            </div>
            <div className="p-2 bg-slate-800/30 rounded">
              <p className="text-red-300 font-semibold">Formato inválido:</p>
              <p className="text-slate-400">PROD001-joao123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
