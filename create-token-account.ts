import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {
    Connection,
    PublicKey, clusterApiUrl
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

const tokenMintAccount = new PublicKey("EsS6W4wE1b65iH4QfpnEjnDrp4T7DnrMwa4uhYpigvaQ");

const recipient = user.publicKey;

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient,
);

console.log(
    `Token Account: ${tokenAccount.address.toBase58()}`
);

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet",
);

console.log(`Created token account: ${link}`);
