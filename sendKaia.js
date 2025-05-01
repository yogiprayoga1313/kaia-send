require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const toAddress = process.env.TO_ADDRESS;
const privateKeys = JSON.parse(process.env.PRIVATE_KEYS);

async function sendMaxBalance(wallet) {
  const address = wallet.address;
  const balance = await provider.getBalance(address);
  
  const feeData = await provider.getFeeData();
  const gasPrice = feeData.gasPrice;
  const gasLimit = ethers.toBigInt(21000);
  const fee = gasPrice * gasLimit;

  if (balance > fee) {
    const amountToSend = balance - fee;
    const tx = await wallet.sendTransaction({
      to: toAddress,
      value: amountToSend,
      gasLimit,
      gasPrice,
    });

    console.log(`✅ Sent from ${address} → ${toAddress}`);
    console.log(`🔗 TX: https://scope.kaia.io/tx/${tx.hash}`);
  } else {
    console.log(`⚠️ Not enough balance in ${address} to cover gas fee.`);
  }
}

async function main() {
  for (const pk of privateKeys) {
    try {
      const wallet = new ethers.Wallet(pk, provider);
      await sendMaxBalance(wallet);
    } catch (err) {
      console.error(`❌ Error with ${pk.slice(0, 10)}...:`, err.message);
    }
  }
}

main();
