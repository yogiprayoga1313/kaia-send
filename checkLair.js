require("dotenv").config();
const { ethers } = require("ethers");
const axios = require("axios");

// Create provider with Kaia network configuration
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL, {
  chainId: 8217,
  name: "kaia"
});

const privateKeys = JSON.parse(process.env.PRIVATE_KEYS);
const LAIR_API_URL = "https://app.lair.fi/checker";

async function checkEligibility(wallet) {
  try {
    const address = wallet.address;
    console.log(`\n🔍 Checking eligibility for: ${address}`);
    
    // Get signature from wallet
    const message = "Check Lair.fi eligibility";
    const signature = await wallet.signMessage(message);
    
    // Make API request to Lair.fi
    const response = await axios.post(LAIR_API_URL, {
      address: address,
      signature: signature,
      message: message
    });

    if (response.data && response.data.eligible) {
      console.log(`✅ ELIGIBLE: ${address}`);
      console.log(`Details:`, response.data);
    } else {
      console.log(`❌ NOT ELIGIBLE: ${address}`);
    }
  } catch (error) {
    console.error(`❌ Error checking ${wallet.address}:`, error.message);
  }
}

async function main() {
  console.log("Starting Lair.fi eligibility check...");
  
  for (const pk of privateKeys) {
    try {
      const wallet = new ethers.Wallet(pk, provider);
      await checkEligibility(wallet);
    } catch (err) {
      console.error(`❌ Error with wallet ${pk.slice(0, 10)}...:`, err.message);
    }
  }
}

main(); 