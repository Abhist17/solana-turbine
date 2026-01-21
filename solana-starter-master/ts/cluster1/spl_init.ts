import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "./wallet/turbin3-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    // Create a new token mint
    const mint = await createMint(
      connection,
      keypair,           // Payer
      keypair.publicKey, // Mint authority
      keypair.publicKey, // Freeze authority (optional, can be null)
      9                  // Decimals (9 is standard for Solana tokens)
    );

    console.log("Token mint created successfully!");
    console.log("Mint address:", mint.toBase58());
    console.log("\nSave this address - you'll need it for other operations!");
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
    process.exit(1);
  }
})();