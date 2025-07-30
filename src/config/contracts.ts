import { DeboxContractConfig } from '../types/contract';

// Debox分佣合约配置
export const DEBOX_COMMISSION_CONTRACT: DeboxContractConfig = {
  address: '0x1234567890123456789012345678901234567890', // 请替换为实际的合约地址
  abi: [
    // 分佣函数
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "distributeCommission",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    // 查询分佣记录
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "getCommissionHistory",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            }
          ],
          "internalType": "struct CommissionRecord[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    // 查询合约余额
    {
      "inputs": [],
      "name": "getContractBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  network: {
    chainId: 1, // Ethereum主网，请根据实际网络调整
    name: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID' // 请替换为您的Infura项目ID
  }
};

// 支持的网络配置
export const SUPPORTED_NETWORKS = {
  1: {
    name: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
    explorer: 'https://etherscan.io'
  },
  137: {
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com'
  },
  56: {
    name: 'BSC',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com'
  }
}; 