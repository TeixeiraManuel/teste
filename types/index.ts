export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  status: "Ativo" | "Em Falta" | "Inativo";
  batch: string;
  expiration: string;
}

export interface ValidationResult {
  success: boolean;
  message: string;
  productId?: string;
  userId?: string;
  productName?: string;
  productCategory?: string;
  productBatch?: string;
  productExpiration?: string;
  productStatus?: string;
  userName?: string;
  userRole?: string;
  userDepartment?: string;
  scanTime?: string;
  errorType?: string;
  details?: string;
  expirationDate?: string;
}

export interface ScannedData extends ValidationResult {
  transactionId: string;
  serverResponse: string;
}

export type ErrorType =
  | "FORMAT_ERROR"
  | "PRODUCT_NOT_FOUND"
  | "USER_NOT_FOUND"
  | "PRODUCT_INACTIVE"
  | "PRODUCT_EXPIRED"
  | null;
