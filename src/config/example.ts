// 这是一个配置示例文件，请复制到 contracts.ts 并填入实际的合约信息

import { DeboxContractConfig } from '../types/contract';

// 示例配置 - 请替换为实际的合约信息
export const EXAMPLE_CONTRACT_CONFIG: DeboxContractConfig = {
  address: '0x1234567890123456789012345678901234567890', // 替换为实际合约地址
  abi: [
    // 这里需要填入实际的合约 ABI
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
    }
  ],
  network: {
    chainId: 1, // 1 = Ethereum主网, 137 = Polygon, 56 = BSC
    name: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID' // 替换为您的Infura项目ID
  }
};

// 使用说明：
// 1. 复制此文件内容到 contracts.ts
// 2. 替换合约地址为实际地址
// 3. 填入完整的合约 ABI
// 4. 配置正确的网络信息
// 5. 如果使用 Infura，请注册并获取项目ID 