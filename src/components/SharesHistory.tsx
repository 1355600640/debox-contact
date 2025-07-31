import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, ExternalLink, Calendar, DollarSign } from 'lucide-react';
import { queryShares, queryAllShares, formatTokenAmount, getTokenSymbol } from '../hooks/useContract';
import './SharesHistory.css';

interface ShareRecord {
  contributor?: string;
  token: string;
  amount: string;
  txHash: string;
  blockNumber: number;
  timestamp: number;
}

export const SharesHistory: React.FC = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [records, setRecords] = useState<ShareRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchMode, setSearchMode] = useState<'specific' | 'all'>('specific');
  const [fromBlock, setFromBlock] = useState('0');
  const [toBlock, setToBlock] = useState('latest');

  // 默认地址
  const defaultAddress = '0xa8d578052b23eeceae4cdf74de654b2a5a8f29a7';

  const handleSearch = async () => {
    setIsLoading(true);
    setError('');

    try {
      let data: ShareRecord[];

      if (searchMode === 'specific') {
        const address = searchAddress.trim() || defaultAddress;
        data = await queryShares(address, parseInt(fromBlock) || 0, toBlock);
      } else {
        data = await queryAllShares(parseInt(fromBlock) || 0, toBlock);
      }

      setRecords(data);
      console.log('查询结果:', data);
    } catch (err: any) {
      console.error('查询失败:', err);
      setError(err.message || '查询失败');
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    handleSearch();
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN');
  };

  const openTransaction = (txHash: string) => {
    window.open(`https://bscscan.com/tx/${txHash}`, '_blank');
  };

  const openAddress = (address: string) => {
    window.open(`https://bscscan.com/address/${address}`, '_blank');
  };

  // 组件加载时自动查询默认地址的记录
  useEffect(() => {
    setSearchAddress(defaultAddress);
    handleSearch();
  }, []);

  return (
    <div className="shares-history">
      <div className="history-header">
        <h2 className="history-title">
          <DollarSign size={24} />
          分佣记录查询
        </h2>
        <p className="history-subtitle">查询 Debox 分佣合约的历史记录</p>
      </div>

      <div className="search-section">
        <div className="search-mode-toggle">
          <button
            className={`mode-button ${searchMode === 'specific' ? 'active' : ''}`}
            onClick={() => setSearchMode('specific')}
          >
            指定地址
          </button>
          <button
            className={`mode-button ${searchMode === 'all' ? 'active' : ''}`}
            onClick={() => setSearchMode('all')}
          >
            所有记录
          </button>
        </div>

        <div className="search-form">
          {searchMode === 'specific' && (
            <div className="input-group">
              <label htmlFor="address" className="input-label">
                查询地址
              </label>
              <input
                id="address"
                type="text"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                placeholder="输入以太坊地址或留空使用默认地址"
                className="search-input"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          )}

          <div className="block-range">
            <div className="input-group">
              <label htmlFor="fromBlock" className="input-label">
                起始区块
              </label>
              <input
                id="fromBlock"
                type="number"
                value={fromBlock}
                onChange={(e) => setFromBlock(e.target.value)}
                placeholder="0"
                className="block-input"
              />
            </div>
            <div className="input-group">
              <label htmlFor="toBlock" className="input-label">
                结束区块
              </label>
              <input
                id="toBlock"
                type="text"
                value={toBlock}
                onChange={(e) => setToBlock(e.target.value)}
                placeholder="latest"
                className="block-input"
              />
            </div>
          </div>

          <div className="search-actions">
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="search-button"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  查询中...
                </>
              ) : (
                <>
                  <Search size={20} />
                  查询记录
                </>
              )}
            </button>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="refresh-button"
            >
              <RefreshCw size={20} />
              刷新
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="results-section">
        <div className="results-header">
          <h3>查询结果</h3>
          <span className="results-count">
            共找到 {records.length} 条记录
          </span>
        </div>

        {records.length > 0 ? (
          <div className="records-list">
            {records.map((record, index) => (
              <div key={`${record.txHash}-${index}`} className="record-item">
                <div className="record-header">
                  <div className="record-token">
                    <span className="token-symbol">
                      {getTokenSymbol(record.token)}
                    </span>
                    <span className="token-amount">
                      {formatTokenAmount(record.amount, 18)}
                    </span>
                  </div>
                  <div className="record-actions">
                    <button
                      onClick={() => openTransaction(record.txHash)}
                      className="action-button"
                      title="查看交易"
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>

                <div className="record-details">
                  {record.contributor && (
                    <div className="detail-item">
                      <span className="detail-label">贡献者:</span>
                      <button
                        onClick={() => openAddress(record.contributor!)}
                        className="address-link"
                      >
                        {formatAddress(record.contributor)}
                      </button>
                    </div>
                  )}

                  <div className="detail-item">
                    <span className="detail-label">代币地址:</span>
                    <button
                      onClick={() => openAddress(record.token)}
                      className="address-link"
                    >
                      {formatAddress(record.token)}
                    </button>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">交易哈希:</span>
                    <button
                      onClick={() => openTransaction(record.txHash)}
                      className="hash-link"
                    >
                      {formatAddress(record.txHash)}
                    </button>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">区块号:</span>
                    <span className="block-number">{record.blockNumber}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">时间:</span>
                    <span className="timestamp">
                      <Calendar size={14} />
                      {formatDate(record.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !isLoading && !error ? (
          <div className="empty-state">
            <DollarSign size={48} />
            <p>未找到分佣记录</p>
            <p className="empty-hint">
              请检查查询条件或尝试不同的地址
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}; 