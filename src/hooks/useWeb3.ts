import { useState} from 'react';
import { ethers } from 'ethers';
// import { CommissionParams, TransactionStatus } from '../types/contract';

export const useWeb3 = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>('');
  // const ethereum = (window as any).ethereum;

  const connectWallet =async ()=>{
    await connectWallet()
    const signer = await (window as any).ethersProvider.getSigner();
    setSigner(signer);
    setAccount(await signer.getAddress());
    setProvider((window as any).ethersProvider);
    setIsConnected(true);
    setIsConnecting(false);
    setError('');
  }

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  }

  // 连接钱包
 return {
  connectWallet,
  signer,
  account,
  isConnected,
  isConnecting,
  error,
  formatAddress,
  provider
 }
}; 