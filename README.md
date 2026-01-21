# Solana Turbine Week 1

A comprehensive TypeScript project for creating and managing SPL tokens on the Solana blockchain (Devnet). Built as part of the Turbin3 learning program.
For the proofs refer to the Notion Link I have shared while I have also shared a docs folder for every proof regarding every contracts result.

## Features

- SPL Token initialization and minting
- Token metadata creation using Metaplex
- Associated Token Account (ATA) management
- Token transfers between accounts
- Vault operations (deposit/withdraw SOL & SPL tokens)
- NFT minting and metadata management

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v22 or higher)
- **npm** or **yarn**
- **Solana CLI** - [Installation Guide](https://docs.solana.com/cli/install-solana-cli-tools)
- **Git**

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abhist17/solana-turbine.git
   cd solana-turbine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Solana wallet:
   ```bash
   # Generate a new wallet (if you don't have one)
   solana-keygen new --outfile ~/.config/solana/id.json
   
   # Create wallet directory in project
   mkdir -p ts/cluster1/wallet
   
   # Copy your wallet to the project
   cp ~/.config/solana/id.json ts/cluster1/wallet/turbin3-wallet.json
   ```

4. Configure Solana CLI for Devnet:
   ```bash
   solana config set --url devnet
   ```

5. Airdrop test SOL:
   ```bash
   solana airdrop 2
   ```

## Project Structure

```
solana-turbine/
├── ts/
│   ├── cluster1/
│   │   ├── wallet/
│   │   │   └── turbin3-wallet.json    # Your wallet (DO NOT COMMIT!)
│   │   ├── spl_init.ts                # Initialize SPL token
│   │   ├── spl_mint.ts                # Mint tokens with metadata
│   │   ├── spl_transfer.ts            # Transfer tokens
│   │   ├── spl_metadata.ts            # Add/update token metadata
│   │   ├── nft_image.ts               # Upload NFT image
│   │   ├── nft_metadata.ts            # Create NFT metadata
│   │   ├── nft_mint.ts                # Mint NFT
│   │   └── vault_*.ts                 # Vault operations
│   ├── prereq/
│   │   ├── keygen.ts                  # Generate keypair
│   │   ├── airdrop.ts                 # Request airdrop
│   │   ├── transfer.ts                # Transfer SOL
│   │   └── enroll.ts                  # Enrollment script
│   └── tools/
│       ├── airdrop_to_wallet.ts
│       ├── base58_to_wallet.ts
│       └── wallet_to_base58.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Usage

### Prerequisites Scripts

```bash
# Generate a new keypair
npm run keygen

# Request airdrop
npm run airdrop

# Transfer SOL
npm run transfer

# Enroll in program
npm run enroll
```

### SPL Token Operations

```bash
# Initialize a new SPL token
npm run spl_init

# Mint tokens (creates metadata)
npm run spl_mint

# Transfer tokens
npm run spl_transfer

# Add/update token metadata
npm run spl_metadata
```

### NFT Operations

```bash
# Upload NFT image
npm run nft_image

# Create NFT metadata
npm run nft_metadata

# Mint NFT
npm run nft_mint
```

### Vault Operations

```bash
# Initialize vault
npm run vault_init

# Deposit SOL
npm run vault_deposit

# Withdraw SOL
npm run vault_withdraw

# Deposit SPL tokens
npm run vault_deposit_spl

# Withdraw SPL tokens
npm run vault_withdraw_spl

# Deposit NFT
npm run vault_deposit_nft

# Withdraw NFT
npm run vault_withdraw_nft

# Close vault
npm run vault_close
```

### Utility Tools

```bash
# Airdrop to specific wallet
npm run airdrop_to_wallet

# Convert base58 to wallet format
npm run base58_to_wallet

# Convert wallet to base58
npm run wallet_to_base58
```

## Important Addresses

### My Token (MTK)
- **Mint Address:** `E2Xj89XKJDcQ8wswgNenJVDbkJ5oG4kUErvhTMvzYVFY`
- **Symbol:** MTK
- **Name:** My Token
- **Network:** Devnet

You can view the token on [Solana Explorer](https://explorer.solana.com/address/E2Xj89XKJDcQ8wswgNenJVDbkJ5oG4kUErvhTMvzYVFY?cluster=devnet)

## Security

**IMPORTANT SECURITY NOTES:**

1. **NEVER commit your wallet files to Git**
   - `turbin3-wallet.json` contains your private key
   - The `.gitignore` is configured to exclude all wallet files
   
2. **This project uses Devnet**
   - All tokens are for testing only
   - No real monetary value
   
3. **For production use:**
   - Create a NEW wallet
   - Use Mainnet RPC endpoints
   - Implement additional security measures

## Troubleshooting

### Common Issues

**Issue: "Cannot find module 'turbin3-wallet.json'"**
```bash
# Solution: Create the wallet directory and add your wallet
mkdir -p ts/cluster1/wallet
cp ~/.config/solana/id.json ts/cluster1/wallet/turbin3-wallet.json
```

**Issue: "Insufficient funds"**
```bash
# Solution: Airdrop more SOL
solana airdrop 2
```

**Issue: "Node module errors"**
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Technologies Used

- **Solana Web3.js** - Solana JavaScript API
- **@solana/spl-token** - SPL Token program interactions
- **@metaplex-foundation/umi** - Metaplex unified framework
- **@metaplex-foundation/mpl-token-metadata** - Token metadata standard
- **@coral-xyz/anchor** - Solana program framework
- **TypeScript** - Type-safe JavaScript
- **tsx** - TypeScript execution engine

## Resources

- [Solana Documentation](https://docs.solana.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Metaplex Documentation](https://docs.metaplex.com/)
- [SPL Token Documentation](https://spl.solana.com/token)
- [Turbin3 Program](https://turbin3.com/)

## License

MIT License

## Author

**Abhist**
- GitHub: [@Abhist17](https://github.com/Abhist17)
- Project: [solana-turbine](https://github.com/Abhist17/solana-turbine)

## Acknowledgments

- Turbin3 team for the educational program
- Solana Foundation for the blockchain infrastructure
- Metaplex for NFT standards and tools

## Token #3 (New Token with Metadata)
- **Mint Address:** `t7xSQLQV7yMmYASZ4TZDjgspAuDkeLdt3MFejQDtDvC`
- **Name:** My Token
- **Symbol:** MTK
- [View on Explorer](https://explorer.solana.com/address/t7xSQLQV7yMmYASZ4TZDjgspAuDkeLdt3MFejQDtDvC?cluster=devnet)
