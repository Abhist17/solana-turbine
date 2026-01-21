import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "./wallet/turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("t7xSQLQV7yMmYASZ4TZDjgspAuDkeLdt3MFejQDtDvC");

// Recipient address my friends Vedansh 
const to = new PublicKey("Axwpu59SVXD15YHD4S8oBEn65uCSrtkbSR5QDaeYAmEH");

(async () => {
    try {
        
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );

        
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        );

        const tx = await transfer(connection,
            keypair,
            fromTokenAccount.address,
            toTokenAccount.address,
            keypair,
            50 * Math.pow(10, 9),

        );
        console.log(tx);

        
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();