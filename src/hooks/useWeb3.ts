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
  const [disconnect, setDisconnect] = useState(false);
  // const ethereum = (window as any).ethereum;
  const [intervalTime, setIntervalTime] = useState<NodeJS.Timeout | null>(null)

  const wallectInfo = async () => {
    const signer = await (window as any).ethersProvider.getSigner();
    setSigner(signer);
    setAccount(await signer.getAddress());
    setProvider((window as any).ethersProvider);
    setIsConnected(true);
    setIsConnecting(false);
    setError('');
    setDisconnect(false)
    localStorage.setItem('isConnected', JSON.stringify(true))
  }
  if ((window as any).deboxWallet) {
    wallectInfo()
  }

  const connectWallet = async () => {
    await connectWalletContract()
    wallectInfo()
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setIsConnecting(false)
    setError('')
    setAccount('')
    setSigner(null)
    setDisconnect(true)
    intervalTime && clearInterval(intervalTime)
    localStorage.setItem('isConnected', JSON.stringify(false))
  }

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  }

  useEffect(() => {
    intervalTime && clearInterval(intervalTime)
    const nowInterval = setInterval(async () => {
      const isConnected = JSON.parse(localStorage.getItem('isConnected') || 'false')
      if ((window as any).deboxWallet && !isConnected && !disconnect) {
        const signer = await (window as any).ethersProvider.getSigner();
        if (await signer.getAddress()) {
          wallectInfo()
        } else {
          setIsConnected(false)
          setIsConnecting(false)
          setError('')
          setAccount('')
          setSigner(null)
          setProvider(null)
        }
      }
    }, 1000);
    setIntervalTime(nowInterval)
    return () => {
      intervalTime && clearInterval(intervalTime)
    }
  }, [])


  // 连接钱包
  return {
    connectWallet,
    signer,
    account,
    isConnected,
    isConnecting,
    error,
    formatAddress,
    provider,
    disconnectWallet
  }
}; 