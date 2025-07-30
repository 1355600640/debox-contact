# 🚀 快速开始指南

## 项目已成功创建！

您的 Debox 分佣系统已经准备就绪。以下是使用步骤：

### 1. 访问应用
打开浏览器访问：http://localhost:3000

### 2. 配置合约信息
在 `src/config/contracts.ts` 中配置您的实际合约信息：

```typescript
export const DEBOX_COMMISSION_CONTRACT: DeboxContractConfig = {
  address: 'YOUR_ACTUAL_CONTRACT_ADDRESS', // 替换为实际合约地址
  abi: [...], // 填入完整的合约 ABI
  network: {
    chainId: 1, // 根据实际网络调整
    name: 'Ethereum',
    rpcUrl: 'YOUR_RPC_URL' // 替换为实际的 RPC 地址
  }
};
```

### 3. 使用功能

#### 连接钱包
- 点击"连接钱包"按钮
- 在 MetaMask 中确认连接
- 确保网络正确

#### 分发分佣
- 输入接收地址（以太坊地址格式）
- 输入分佣金额（ETH）
- 可选：添加描述信息
- 点击"发送分佣"确认交易

#### 查看历史
- 输入要查询的地址
- 点击"查询"查看分佣历史

### 4. 常用命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview

# 安装依赖
pnpm install
```

### 5. 注意事项

1. **合约配置**: 确保使用正确的合约地址和 ABI
2. **网络设置**: 确保连接到正确的区块链网络
3. **钱包连接**: 需要安装 MetaMask 或其他 Web3 钱包
4. **Gas 费用**: 确保账户有足够的 ETH 支付交易费用

### 6. 故障排除

如果遇到问题：
1. 检查浏览器控制台是否有错误信息
2. 确认合约地址和网络配置正确
3. 确保钱包已连接并网络正确
4. 检查账户余额是否充足

### 7. 下一步

- 根据实际需求修改合约配置
- 自定义 UI 样式
- 添加更多功能
- 部署到生产环境

## 🎉 开始使用吧！

您的 Debox 分佣系统已经准备就绪，可以开始使用了！ 