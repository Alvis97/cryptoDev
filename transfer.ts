import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js";
import "dotenv/config";
import "@types/node";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedPubKey = process.argv[2] || null;

if (!suppliedPubKey) {
    console.log(`Please provide a public key`);
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`supplied publickey was: ${suppliedPubKey}`);

const toPubkey = new PublicKey(suppliedPubKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log("Loaded our keypair");

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000;

const sendSolInstructions = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstructions);

const signature =await sendAndConfirmTransaction(connection, transaction, [ senderKeypair ]);

console.log(`Finnished! Sent ${LAMPORTS_TO_SEND} to the adress ${toPubkey}`);
console.log(`Transaction signature is ${signature}`);