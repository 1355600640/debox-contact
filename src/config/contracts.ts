export const payAddress = '0xa8d578052b23eeceae4cdf74de654b2a5a8f29a7'

// Debox分佣合约配置
export const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // BSC上的USDT地址
export const erc20Abi = [
  {
    "constant": false,
    "inputs": [
      { "name": "_spender", "type": "address" },
      { "name": "_value", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "name": "", "type": "bool" }],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{ "name": "owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "name": "", "type": "uint8" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];


// 合约地址和 ABI
export const contractAddress = "0xf0Cc35840394eD6274e058620FC6eb3aBA27Ba2d"; // zs: 0x4623CD0ED546e047111a39697f80166c311E21Be cs: 0x11dEb3396a6A01A2853Aff40833835C22743760A
export const contractABI = [
  {
    "type": "function",
    "name": "payAndShareWithERC20",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "tokenAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "shareAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
];

export const BNBChainId = "0x38"; // 0xA is the hexadecimal representation of 10, Optimism chain ID
export const BNBParams = {
  chainId: '0x38',
  chainName: 'Binance Smart Chain',
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18
  },
  blockExplorerUrls: ['https://bscscan.com']
};