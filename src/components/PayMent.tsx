import { useState } from "react";
import { DollarSign, Lock } from "lucide-react";
import "./PayMent.css";
import { callContractMethod } from "../hooks/useContract";
import { useWeb3 } from "../hooks/useWeb3";

export const PayMent = () => {
  const [inputNumber, setInputNumber] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected } = useWeb3();

  const handlePayment = async () => {
    if (!inputNumber || inputNumber <= 0) {
      alert('请输入有效金额');
      return;
    }

    setIsLoading(true);
    // 模拟支付处理
    await callContractMethod(inputNumber)
    setIsLoading(false);
    alert('支付成功！');
    setInputNumber(undefined);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setInputNumber(undefined);
    } else {
      const num = Number(value);
      if (!isNaN(num) && num >= 0) {
        setInputNumber(num);
      }
    }
  };

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
        </div>
      </div>
    </div>
  );
};