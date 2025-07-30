# Debox 分佣系统

一个基于区块链技术的智能分佣管理平台，用于调用 Debox 分佣合约。

## 功能特性

- 🔐 **安全可靠**: 基于以太坊智能合约，确保分佣过程透明可信
- ⚡ **快速处理**: 实时交易确认，快速完成分佣操作
- 📊 **透明记录**: 所有分佣记录上链存储，可追溯查询
- 💰 **多币种支持**: 支持 ETH 等多种加密货币分佣
- 📱 **响应式设计**: 适配桌面和移动设备

## 主要功能

### 1. 钱包连接
- 支持 MetaMask 等主流钱包
- 自动网络切换
- 账户管理

### 2. 分佣分发
- 输入接收地址和金额
- 实时地址验证
- 交易状态跟踪
- 支持添加描述信息

### 3. 历史记录
- 查询任意地址的分佣历史
- 详细的交易信息展示
- 时间戳和金额格式化

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **Web3 库**: Ethers.js
- **UI 组件**: 自定义组件 + Lucide React 图标
- **样式**: CSS-in-JS (styled-jsx)

## 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn
- MetaMask 钱包

### 安装依赖

```bash
npm install
```

### 配置合约

在 `src/config/contracts.ts` 中配置您的合约信息：

```typescript
export const DEBOX_COMMISSION_CONTRACT: DeboxContractConfig = {
  address: 'YOUR_CONTRACT_ADDRESS', // 替换为实际合约地址
  abi: [...], // 合约 ABI
  network: {
    chainId: 1, // 网络链ID
    name: 'Ethereum',
    rpcUrl: 'YOUR_RPC_URL' // RPC 节点地址
  }
};
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 构建生产版本

```bash
npm run build
```

## 使用说明

### 1. 连接钱包
- 点击"连接钱包"按钮
- 在 MetaMask 中确认连接
- 确保网络正确

### 2. 分发分佣
- 切换到"分发分佣"标签
- 输入接收地址（以太坊地址格式）
- 输入分佣金额（ETH）
- 可选：添加描述信息
- 点击"发送分佣"确认交易

### 3. 查看历史
- 切换到"历史记录"标签
- 输入要查询的地址
- 点击"查询"查看分佣历史

## 合约接口

### 主要函数

```solidity
// 分发分佣
function distributeCommission(
    address recipient,
    uint256 amount,
    string memory description
) external payable;

// 查询分佣历史
function getCommissionHistory(address recipient) 
    external view returns (CommissionRecord[] memory);

// 查询合约余额
function getContractBalance() external view returns (uint256);
```

## 安全注意事项

1. **合约地址验证**: 确保使用正确的合约地址
2. **网络确认**: 确保连接到正确的区块链网络
3. **金额验证**: 仔细核对分佣金额
4. **地址验证**: 确认接收地址正确无误
5. **Gas 费用**: 确保账户有足够的 ETH 支付交易费用

## 开发说明

### 项目结构

```
src/
├── components/          # React 组件
│   ├── WalletConnect.tsx
│   ├── CommissionForm.tsx
│   └── CommissionHistory.tsx
├── hooks/              # 自定义 Hooks
│   ├── useWeb3.ts
│   └── useContract.ts
├── config/             # 配置文件
│   └── contracts.ts
├── types/              # TypeScript 类型定义
│   └── contract.ts
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

### 自定义配置

1. **网络配置**: 在 `contracts.ts` 中修改网络参数
2. **样式定制**: 修改各组件中的 CSS 样式
3. **功能扩展**: 在 hooks 中添加新的合约交互功能

## 故障排除

### 常见问题

1. **钱包连接失败**
   - 确保已安装 MetaMask
   - 检查浏览器是否支持 Web3

2. **交易失败**
   - 检查账户余额是否充足
   - 确认网络连接正常
   - 验证合约地址正确

3. **网络切换问题**
   - 手动在 MetaMask 中切换网络
   - 刷新页面重新连接

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题，请通过以下方式联系：

- 邮箱: support@debox.com
- GitHub: https://github.com/debox/commission-system 