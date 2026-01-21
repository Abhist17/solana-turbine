import {
  Keypair,
  PublicKey,
  Connection,
  Commitment,
} from "@solana/web3.js";

import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";

import wallet from "./wallet/turbin3-wallet.json";


const keypair = Keypair.fromSecretKey(
  new Uint8Array(wallet)
);

const commitment: Commitment = "confirmed";
const connection = new Connection(
  "https://api.devnet.solana.com",
  commitment
);


const tokenAmount = 100 * Math.pow(10, 9);  // 100 tokens with 9 decimals




const mint = new PublicKey(
  "t7xSQLQV7yMmYASZ4TZDjgspAuDkeLdt3MFejQDtDvC"
);


(async () => {
  try {
    
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,          
      keypair,             
      mint,                
      keypair.publicKey    
    );

    console.log(
      "Your ATA:",
      ata.address.toBase58()
    );

    const mintTx = await mintTo(
      connection,          
      keypair,            
      mint,               
      ata.address,         
      keypair,             
      tokenAmount          
    );

    console.log(
      "Mint successful. Tx signature:",
      mintTx
    );
  } catch (err: any) {
    console.error("RAW ERROR:", err);
    if (err?.cause) console.error("CAUSE:", err.cause);
    if (err?.logs) console.error("LOGS:", err.logs);
  }
})();
