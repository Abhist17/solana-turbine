import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "./wallet/turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, getAccount } from "@solana/spl-token";

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
        
        
        const yourTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );

        
        const friendTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        );

        // Fetch balances
        const yourAccount = await getAccount(connection, yourTokenAccount.address);
        const friendAccount = await getAccount(connection, friendTokenAccount.address);

        const yourBalance = Number(yourAccount.amount) / Math.pow(10, 9);
        const friendBalance = Number(friendAccount.amount) / Math.pow(10, 9);

        console.log(" TOKEN BALANCES ");
        console.log(`Your balance: ${yourBalance} tokens`);
        console.log(`friend's balance: ${friendBalance} tokens`);
        console.log("");
        console.log(`Your token account: ${yourTokenAccount.address.toString()}`);
        console.log(`Friend's token account: ${friendTokenAccount.address.toString()}`);

        
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();