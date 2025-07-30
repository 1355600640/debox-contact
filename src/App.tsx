import { useState } from 'react';
import { WalletConnect } from './components/WalletConnect';
import { useWeb3 } from './hooks/useWeb3';
import { DEBOX_COMMISSION_CONTRACT } from './config/contracts';
import './app.css';
import { PayMent } from './components/PayMent';

function App() {
  const { isConnected } = useWeb3();
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');


  return (
    <div className="app">
      <div className="app-container">
        {/* 头部 */}
        <header className="header">
          <div className="header-content">
            <div className="logo">
              <h1>Debox 分佣系统</h1>
              <p>智能合约驱动的分佣管理平台</p>
            </div>
            <WalletConnect />
          </div>
        </header>

        {/* 主要内容 */}
        <main className="main-content">
          {isConnected ? (
            <div className="connect-prompt">
              <div className="prompt-card">
                <h2>欢迎使用 Debox 分佣系统</h2>
                <p>请先连接您的钱包以开始使用分佣功能</p>
                <div className="features">
                  <div className="feature">
                    <span className="feature-icon">🔐</span>
                    <span>安全可靠</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">⚡</span>
                    <span>快速处理</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📊</span>
                    <span>透明记录</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* 合约信息 */}
              <div className="contract-info">
                <div className="info-card">
                  <h3>合约信息</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">合约地址:</span>
                      <span className="value">{DEBOX_COMMISSION_CONTRACT.address}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">网络:</span>
                      <span className="value">{DEBOX_COMMISSION_CONTRACT.network.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">链ID:</span>
                      <span className="value">{DEBOX_COMMISSION_CONTRACT.network.chainId}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 标签页导航 */}
              <div className="tab-navigation">
                <button
                  className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
                  onClick={() => setActiveTab('form')}
                >
                  分佣支付
                </button>
                <button
                  className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                >
                  历史记录
                </button>
              </div>

              {/* 标签页内容 */}
              <div className="tab-content">
                {activeTab === 'form' && <PayMent />}
                {/* {activeTab === 'history' && <CommissionHistory />} */}
              </div>
            </>
          )}
        </main>

        {/* 页脚 */}
        <footer className="footer">
          <p>&copy; 2024 Debox 分佣系统. 基于区块链技术构建.</p>
        </footer>
      </div>
    </div>
  );
}

export default App; 