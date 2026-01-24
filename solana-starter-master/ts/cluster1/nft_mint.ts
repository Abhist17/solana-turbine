import wallet from "./wallet/turbin3-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
    createSignerFromKeypair,
    signerIdentity,
    generateSigner,
    percentAmount,
} from "@metaplex-foundation/umi";
import {
    createNft,
    mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

(async () => {
    try {
        let tx = await createNft(umi, {
            mint,
            name: "Abhi Rug",
            symbol: "RUG",
            uri: "https://gateway.irys.xyz/CKX8UQQDQp53G6uEAq5cEbV6ALFKvoJKwtefdKW3mTDk",
            sellerFeeBasisPoints: percentAmount(5.5),
        }).sendAndConfirm(umi);

        console.log("Successfully Minted! Check out your TX here:");
        console.log(`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`);
        console.log("Mint Address: ", mint.publicKey);
    } catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();