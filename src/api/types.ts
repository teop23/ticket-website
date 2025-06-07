export interface Winner {
  id: number;
  token_id: number;
  eligible: number;
  distributed: number;
  date_added: string;
  data: string;
}

export interface PotData {
  amount: string;
  solAmount: string;
  usdValue: number;
  solValue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}