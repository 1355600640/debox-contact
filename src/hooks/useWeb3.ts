import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { connectWallet as connectWalletContract } from './useContract';
// import { CommissionParams, TransactionStatus } from '../types/contract';

export const useWeb3 = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>('');
  // const ethereum = (window as any).ethereum;

  const wallectInfo = async() => {
    const signer = await (window as any).ethersProvider.getSigner();
    setSigner(signer);
    setAccount(await signer.getAddress());
    setProvider((window as any).ethersProvider);
    setIsConnected(true);
    setIsConnecting(false);
    setError('');
  }
  if ((window as any).deboxWallet) {
    wallectInfo()
  }

  const connectWallet = async () => {
    await connectWalletContract()
    wallectInfo()

  }

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  }

  useEffect(()=>{
    const interval = setInterval(async() => { 
      if((window as any).deboxWallet){
        const signer = await (window as any).ethersProvider.getSigner();
        if(await signer.getAddress()){
          wallectInfo()
        }else {
          setIsConnected(false)
          setIsConnecting(false)
          setError('')
          setAccount('')
          setSigner(null)
          setProvider(null)
        }
      }
    }, 1000);
    return ()=>{
      clearInterval(interval)
    }
  },[])


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