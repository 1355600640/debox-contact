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


export const DeBoxSharesDetailed = {
  Ethereum: '0x2e6168f9ca3fe204a2110c4613ce18985f3fbf39',
  ArbitrumOne: '0x509Ca4ff42cECAA1FF4988514211b26e72BDa840',
  Base: '0x2f8Ae1cC4ab784f7b9E07A61F714ecDe18A4A6d2',
  BSC: '0x32303FFcb9B6564C2b8a373433A043a7f17E4B37',
  Optimism: '0x18574E5a838B3FE16948653873386DD114ba1D7C',
  Polygon: '0xb8Af0Fa3E38E8Cb95870091b0d4e32CA232b780D',
  abi: {
    eth: [
      {
        "type": "function",
        "name": "donationToShares",
        "inputs": [{ "name": "donatedAmountETH", "type": "uint256" }],
        "outputs": [],
        "stateMutability": "nonpayable"
      }
    ],

    erc20_token: [
      "function transfer(address to, uint256 amount) returns (bool)",
      "function transferFrom(address from, address to, uint256 amount) returns (bool)",
      "function approve(address spender, uint256 amount) returns (bool)",
      "function allowance(address owner, address spender) view returns (uint256)",
      "function balanceOf(address account) view returns (uint256)",
      "function decimals() view returns (uint8)"
    ],

    erc20: [
      // doxShares.donationToShares(token, donatedAmount);
      {
        "type": "function",
        "name": "donationToShares",
        "inputs": [
          { "name": "token", "type": "address" },
          { "name": "amount", "type": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      }
    ]
  },
  tokenAddress:{
    Ethereum: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    ArbitrumOne: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    Base: '0x2d12a4bE7F3e3D2A7f77a3F1e5C6299C8f7C4eA0',
    BSC: '0x55d398326f99059fF775485246999027B3197955',
    Optimism: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    Polygon: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  }
}