import { User, Product } from "@/types";

export const MOCK_USERS: User[] = [
  {
    id: "joao123",
    name: "João Silva",
    role: "Operador",
    department: "Produção",
  },
  {
    id: "maria456",
    name: "Maria Santos",
    role: "Supervisora",
    department: "Qualidade",
  },
  {
    id: "pedro789",
    name: "Pedro Costa",
    role: "Técnico",
    department: "Manutenção",
  },
  {
    id: "ana321",
    name: "Ana Oliveira",
    role: "Gerente",
    department: "Logística",
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "PROD001",
    name: "Placa Mãe XT-200",
    category: "Eletrônicos",
    status: "Ativo",
    batch: "LOTE-2024-05",
    expiration: "2025-12-31",
  },
  {
    id: "PROD002",
    name: "Processador Quantum i9",
    category: "Hardware",
    status: "Ativo",
    batch: "LOTE-2024-06",
    expiration: "2026-06-30",
  },
  {
    id: "PROD003",
    name: "Memória RAM 32GB",
    category: "Componentes",
    status: "Em Falta",
    batch: "LOTE-2024-04",
    expiration: "2025-10-31",
  },
  {
    id: "PROD004",
    name: "SSD 1TB NVMe",
    category: "Armazenamento",
    status: "Ativo",
    batch: "LOTE-2024-07",
    expiration: "2027-01-31",
  },
];

export const VALID_QR_FORMAT = /^[A-Z0-9]+\|[a-z0-9]+$/;
export const videoConstraints = {
  width: 1280,
  height: 720,
};
