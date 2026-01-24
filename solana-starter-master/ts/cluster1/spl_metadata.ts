import wallet from "./wallet/turbin3-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
    createGenericFile,
    createSignerFromKeypair,
    signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({ address: "https://devnet.irys.xyz" }));
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const metadata = {
            name: "Abhi Rug",
            symbol: "RUG",
            description: "A rare and exotic generug NFT",
            image: "https://gateway.irys.xyz/HQx4EmnqYYa5EuS2v7puDKMSv5CLdx2pq9nUAHUyPdDL",
            attributes: [
                { trait_type: "Rarity", value: "Rare" },
                { trait_type: "Color", value: "Multicolor" }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://gateway.irys.xyz/HQx4EmnqYYa5EuS2v7puDKMSv5CLdx2pq9nUAHUyPdDL",
                    },
                ],
            },
            creators: [],
        };

        const myUri = await umi.uploader.uploadJson(metadata);
        
        console.log("Your metadata URI: ", myUri);
    } catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();