import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));
console.log(`Connection: ${connection}`);
 
// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
 
const user = getKeypairFromEnvironment("SECRET_KEY");
console.log(`User: ${user}`);
 
// Substitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey("EsS6W4wE1b65iH4QfpnEjnDrp4T7DnrMwa4uhYpigvaQ");

console.log(`the token mint account is: ${tokenMintAccount}`);


 
// Substitute in your own, or a friend's token account address, based on the previous step.
const recipientAssociatedTokenAccount = new PublicKey(
    "Hc5JjUbCyCywtRtaMEUzsGBZCVM1nZwgLAMDT4yL9dAz"
  );
  

console.log(`second test`);


 
const transactionSignature = await mintTo(
  connection,
  user,
  tokenMintAccount,
  recipientAssociatedTokenAccount,
  user,
  10 * MINOR_UNITS_PER_MAJOR_UNITS,
);

console.log(`third test`);
 
const link = getExplorerLink("transaction", transactionSignature, "devnet");
 
console.log(`✅ Success! Mint Token Transaction: ${link}`);

