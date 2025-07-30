import { ethers } from "ethers";

let walletConnected = false;
let switchedToBSC = false;
// test the availability of deboxWallet
if (typeof (window as any).deboxWallet !== "undefined") {
  (window as any).ethersProvider = new ethers.BrowserProvider((window as any).deboxWallet);
  console.log("deboxWallet is available");
} else {
  console.error("deboxWallet is not installed!");
}
console.log("(window as any).ethersProvider ethers provider:", (window as any).ethersProvider);

// eth_requestAccounts
export async function connectWallet() {
  console.log("(window as any).deboxWallet", (window as any).deboxWallet);
  if (typeof (window as any).deboxWallet !== "undefined") {
    try {
      const accounts = await (window as any).deboxWallet.request({
        method: "eth_requestAccounts",
      });
      console.log("eth_requestAccounts: ", accounts, typeof accounts);
      walletConnected = true;
      // requestPermissionsParams();
    } catch (error) {
      // Handle error (e.g., user denied account access)
    }
  } else {
    // If no wallet is installed
  }
}

// requestPermissionsParams
export async function requestPermissionsParams() {
  console.log("testSDK run wallet_requestPermissions");
  if (typeof (window as any).deboxWallet !== "undefined") {
    try {
      await (window as any).deboxWallet
        .request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {
                debox_getUserInfo: {},
                debox_getVBoxBalance: {},
              },
            },
          ],
        });
      walletConnected = true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("requestPermissionsParams err!!");
        console.error(error);
      }
    }
  } else {
    // If no wallet is installed
  }
}

// debox_getUserInfo
export async function getUserInfo() {
  console.log("testSDK run debox_getUserInfo");

  (window as any).deboxWallet
    .request({
      method: "debox_getUserInfo",
      params: [],
    })
    .then((response: any) => {
      console.log("debox_getUserInfo", response, typeof response);
      if (response) {
      }
    })
    .catch((error: Error) => {
      console.error(error);
      alert(error.message);
    });
}

// debox_getVBoxBalance
export async function getVBoxBalance() {
  console.log("testSDK run debox_getVBoxBalance");
  if (!walletConnected) {
    await connectWallet()
  }
  const response = await (window as any).deboxWallet
    .request({
      method: "debox_getVBoxBalance",
      params: [],
    })
  return response?.usable_balance
}

// debox_paymentVBox
// export async function paymentVBox(receiver_address : string, amount : number, donation_amount : number, note : string) {
//   console.log("testSDK run debox_paymentVBox", receiver_address, amount, donation_amount, note);

//   if (typeof (window as any).deboxWallet !== "undefined") {
//       if (!walletConnected) {
//           await connectWallet();
//       }
//     if (!receiver_address) {
//       return;
//     }
//     try {
//       const param = {
//           receiver_address,
//           amount : amount.toString(),
//           note,
//           donation_amount: donation_amount.toString(),
//           nonce: new Date().valueOf(),// int 可选
//       }
//       console.log("debox_paymentVBox param", param);
//       const response = await (window as any).deboxWallet.request({
//         method: "debox_paymentVBox",
//         params: [
//           param,
//         ],
//       });
//       console.log("debox_paymentVBox", response, typeof response);
//       return response;
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         console.log("paymentVBox err!!");
//         console.error(error);
//       }
//     }
//   } else {
//   }
// }


const BNBChainId = "0x38"; // 0xA is the hexadecimal representation of 10, Optimism chain ID
const BNBParams = {
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
async function switchToBSC() {
  try {
    // Check if the Ethereum provider (MetaMask) is available
    if ((window as any).deboxWallet) {
      // Request to switch to the Optimism chain
      await (window as any).deboxWallet.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BNBChainId }],
      });
      console.log("Successfully switched to BSC!");
      switchedToBSC = true;
    } else {
      alert("Ethereum provider (MetaMask) is not available.");
    }
  } catch (error: any) {
    // If the chain is not available in MetaMask, prompt the user to add it
    if (error.code === 4902) {
      try {
        await (window as any).deboxWallet.request({
          method: "wallet_addEthereumChain",
          params: [BNBParams],
        });
        console.log("BSC chain added and switched successfully!");
        switchedToBSC = true;
      } catch (addError) {
        console.error("Error adding BSC chain:", addError);
      }
    } else {
      console.error("Error switching to BSC chain:", error);
    }
  }
}

const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // BSC上的USDT地址
const erc20Abi = [
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
const contractAddress = "0xf0Cc35840394eD6274e058620FC6eb3aBA27Ba2d"; // zs: 0x4623CD0ED546e047111a39697f80166c311E21Be cs: 0x11dEb3396a6A01A2853Aff40833835C22743760A
const contractABI = [
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

// 通过 Ethers.js 调用智能合约方法
export async function callContractMethod(amount: number,address?:string) {
  try {
    // 检查 MetaMask 或其他以太坊钱包是否已连接
    if (typeof (window as any).deboxWallet === "undefined") {
      alert("MetaMask is not installed!");
      return;
    }

    if (!walletConnected) {
      await connectWallet();
    }
    if (!switchedToBSC) {
      await switchToBSC();
    }

    const signer = await (window as any).ethersProvider.getSigner();

    // 创建合约实例
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const usdtContract = new ethers.Contract(usdtAddress, erc20Abi, signer);

    const usdt = ethers.parseUnits((amount).toString(), 18); // 0.001 USDT

    const myAddress = await signer.getAddress()
    const balance = await usdtContract.balanceOf(myAddress);
    const decimals = await usdtContract.decimals();
    const formattedBalance = ethers.formatUnits(balance, decimals);
    console.log("当前余额", formattedBalance,"当前地址",myAddress);
    console.log("当前合约地址",contractAddress,"当前代币地址",usdtAddress);
    // if (parseFloat(formattedBalance) < amount) {
    //   return -1;
    // }

    try {

      // 首先授权目标合约可以使用用户的 USDT
      console.log("等待授权交易确认中...");
      const approveTx = await usdtContract.approve(contractAddress, usdt);
      await approveTx.wait();
      console.log("授权完成！");
      /**
      * @notice 使用 ERC20 代币执行支付并分佣，可指定收款地址、代币地址及分佣金额。
      * @param recipient 接收 ERC20 代币的目标地址。
      * @param tokenAddress 用于支付的 ERC20 代币的合约地址。
      * @param amount 支付的 ERC20 代币总额。
      * @param shareAmount 在 ERC20 代币支付总额中，用于 Shares 分佣的代币量。
      */
      const tx = await contract.payAndShareWithERC20(
        address||'0xa8d578052b23eeceae4cdf74de654b2a5a8f29a7',
        usdtAddress,
        usdt,
        usdt * BigInt(0.02)
      );
      console.log("TX: ", tx);
      // 等待交易被矿工确认
      await tx.wait();
      return tx?.hash;
    } catch (error) {
      console.error("error", error);
    }
  } catch (error) {
    console.error("Error calling contract method:", error);
    throw error
  }
}