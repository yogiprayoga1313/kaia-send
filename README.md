# Kaia Wallet Tools

A collection of tools for managing Kaia network wallets and checking eligibility.

## Features

- Send maximum balance from multiple wallets
- Check Lair.fi eligibility for multiple wallets
- Secure private key management using environment variables

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Kaia network RPC URL

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yogiprayoga1313/kaia-send.git
cd kaia-send
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
RPC_URL=https://public-en.node.kaia.io
TO_ADDRESS=destination_address
PRIVATE_KEYS=["private_key1","private_key2",...]
```

## Usage

### Send Maximum Balance
To send maximum balance from all wallets to a specified address:
```bash
node sendKaia.js
```

### Check Lair.fi Eligibility
To check Lair.fi eligibility for all wallets:
```bash
node checkLair.js
```

## Security

- Never commit your `.env` file
- Keep your private keys secure
- Use environment variables for sensitive data

## License

ISC 