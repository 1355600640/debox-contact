import React from 'react';
import { LogOut, Wallet } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';
import './WalletConnect.css';
interface WalletConnectProps {
  className?: string;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ className = '' }) => {
  const {
    account,
    isConnected,
    isConnecting,
    error,
    connectWallet,
    formatAddress,
    disconnectWallet
  } = useWeb3();

  return (
    <div className={`wallet-connect ${className}`}>
      {!isConnected ? (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="connect-button"
        >
          <Wallet size={20} />
          {isConnecting ? '连接中...' : '连接钱包'}
        </button>
      ) : (
        <div className="wallet-info">
          <span className="account-address">
            {formatAddress(account)}
          </span>
          <button
            onClick={disconnectWallet}
            className="disconnect-button"
            title="断开连接"
          >
            <LogOut size={16} />
          </button>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

    </div>
  );
}; 