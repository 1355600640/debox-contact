export interface DeboxContractConfig {
  address: string;
  abi: any[];
  network: {
    chainId: number;
    name: string;
    rpcUrl: string;
  };
}

export interface CommissionParams {
  recipient: string;
  amount: string;
  tokenAddress?: string;
  description?: string;
}

export interface TransactionStatus {
  hash: string;
  status: 'pending' | 'success' | 'failed';
  message?: string;
} 