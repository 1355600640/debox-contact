import { useState } from "react";
import { DollarSign, Lock } from "lucide-react";
import "./PayMent.css";
import { callContractMethod } from "../hooks/useContract";
import { useWeb3 } from "../hooks/useWeb3";

export const PayMent = () => {
  const [inputNumber, setInputNumber] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected } = useWeb3();
  const [receivingAddress, setReceivingAddress] = useState<string | undefined>();

  const handlePayment = async () => {
    console.log('开始支付流程...', { inputNumber, isConnected });

    if (!inputNumber || inputNumber <= 0) {
      console.warn('支付金额无效:', inputNumber);
      alert('请输入有效金额');
      return;
    }

    if (!isConnected) {
      console.warn('钱包未连接');
      alert('请先连接钱包');
      return;
    }

    setIsLoading(true);
    console.log('调用合约方法...', { amount: inputNumber });

    try {
      await callContractMethod(inputNumber,receivingAddress);
      console.log('支付成功!');
      setIsLoading(false);
      alert('支付成功！');
      setInputNumber(undefined);
    } catch (error) {
      console.error('支付失败:', error);
      setIsLoading(false);
      alert('支付失败，请重试');
    }
  };

  const handleReceivingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReceivingAddress(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('输入值变化:', value);

    if (value === '') {
      setInputNumber(undefined);
    } else {
      const num = Number(value);
      if (!isNaN(num) && num >= 0) {
        setInputNumber(num);
        console.log('设置金额:', num);
      }
    }
  };

  // console.log('PayMent组件渲染状态:', { inputNumber, isLoading, isConnected });

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h2 className="payment-title">
            <DollarSign size={24} />
            支付中心
          </h2>
          <p className="payment-subtitle">安全便捷的支付体验</p>
        </div>

        <div className="payment-form">
          <div className="input-group">
            <label htmlFor="amount" className="input-label">
              支付金额
            </label>
            <div className="input-wrapper">
              <span className="currency-symbol">¥</span>
              <input
                id="amount"
                type="number"
                value={inputNumber || ''}
                onChange={handleInputChange}
                placeholder="0.00"
                className="amount-input"
                min="0"
                step="0.01"
              />
            </div>
            <div className="input-wrapper">
              <span className="currency-symbol">接收地址</span>
              <input
                id="receivingAddress"
                type="text"
                value={receivingAddress || ''}
                onChange={handleReceivingAddressChange}
                placeholder="0.00"
                className="receiving-address-input"
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={!inputNumber || inputNumber <= 0 || isLoading || !isConnected}
            className="pay-button"
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                处理中...
              </>
            ) : (
              <>
                <Lock size={20} />
                立即支付
              </>
            )}
          </button>
        </div>

        <div className="payment-footer">
          <p className="security-note">
            <Lock size={16} />
            您的支付信息已加密，安全可靠
          </p>
          <p className="debug-info">
            调试信息: 钱包连接状态: {isConnected ? '已连接' : '未连接'}
          </p>
        </div>
      </div>
    </div>
  );
};