import { useState, useEffect } from 'react';
import { WalletConnect } from './components/WalletConnect';
import { useWeb3 } from './hooks/useWeb3';
import './app.css';
import { PayMent } from './components/PayMent';
import { SharesHistory } from './components/SharesHistory';
import VConsole from 'vconsole';
import { BNBChainId, BNBParams,contractAddress } from './config/contracts';

function App() {
  const { isConnected } = useWeb3();
  const [activeTab, setActiveTab] = useState<'form' | 'history' | 'shares'>('form');

  // 初始化vConsole
  useEffect(() => {
    // 只在开发环境下启用vConsole
    const vConsole = new VConsole({
      theme: 'dark',
      maxLogNumber: 1000,
      onReady: () => {
        console.log('🎉 vConsole 已准备就绪！');
        console.log('📱 您可以在移动设备上查看调试信息');
        console.log('🖥️ 在桌面端，请按 F12 打开开发者工具');
      },
      onClearLog: () => {
        console.log('🧹 日志已清除');
      }
    });

    // 添加一些测试日志
    console.log('🚀 应用启动');
    console.log('🔧 开发模式已启用');
    console.info('ℹ️ 这是一条信息日志');
    console.warn('⚠️ 这是一条警告日志');
    console.error('❌ 这是一条错误日志');

    return () => {
      // 清理vConsole
      vConsole.destroy();
    };
  }, []);

  return (
    <div className="app">
      <div className="app-container" style={{ 'paddingBottom': '40px' }}>
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
          {!isConnected ? (
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
                      <span className="value">{contractAddress}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">网络:</span>
                      <span className="value">{BNBParams.chainName}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">链ID:</span>
                      <span className="value">{BNBChainId}</span>
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
                <button
                  className={`tab-button ${activeTab === 'shares' ? 'active' : ''}`}
                  onClick={() => setActiveTab('shares')}
                >
                  分佣查询
                </button>
              </div>

              {/* 标签页内容 */}
              <div className="tab-content">
                {activeTab === 'form' && <PayMent />}
                {activeTab === 'history' && <div>历史记录功能开发中...</div>}
                {activeTab === 'shares' && <SharesHistory />}
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