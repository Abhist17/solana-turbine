import wallet from "../wallet/turbin3-wallet.json";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";

const RPC_ENDPOINT = "https://api.devnet.solana.com";

const mint = publicKey("E2Xj89XKJDcQ8wswgNenJVDbkJ5oG4kUErvhTMvzYVFY");

const umi = createUmi(RPC_ENDPOINT).use(mplTokenMetadata());

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));

const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(signer));

(async () => {
  try {
    const tx = createMetadataAccountV3(umi, {
      mint,
      mintAuthority: signer,
      payer: signer,
      updateAuthority: signer,

      data: {
        name: "My Token",
        symbol: "MTK",
        uri: "https://example.com/metadata.json",
        sellerFeeBasisPoints: 500, // 5%
        creators: null,
        collection: null,
        uses: null,
      },

      isMutable: true,
      collectionDetails: null,
    });

    const result = await tx.sendAndConfirm(umi);

    console.log("Metadata created. Signature:", result.signature.toString());
  } catch (err: any) {
    console.error("RAW ERROR ↓↓↓");
    console.dir(err, { depth: null });

    if (err?.cause) {
      console.error("CAUSE ↓↓↓");
      console.dir(err.cause, { depth: null });
    }

    if (err?.logs) {
      console.error("LOGS ↓↓↓");
      console.dir(err.logs, { depth: null });
    }

    process.exit(1);
  }
})();