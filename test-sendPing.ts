import * as web3 from "@solana/web3.js";
import "dotenv/config";
import {
   getKeypairFromEnvironment,
   airdropIfRequired
} from "@solana-developers/helpers";

//Create a connection
 const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

 //sender 
 const sender = getKeypairFromEnvironment("SECRET_KEY");

 //Make sure i have money in the account
const newBalance = await airdropIfRequired(
    connection,
    sender.publicKey,
    1 * web3.LAMPORTS_PER_SOL,
    0.5 * web3.LAMPORTS_PER_SOL,
)

 //Create new keypair for reciver
 const reciver = web3.Keypair.generate();
 console.log("Reciver public key is:" + reciver.publicKey.toBase58());

//Added line because reciver account is empty
const rentExemptMinimum = await connection.getMinimumBalanceForRentExemption(0);

 //Create a transaction
 const transaction = new web3.Transaction();

//Instructions 
const sendSolInstructions = web3.SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: reciver.publicKey,
    lamports: rentExemptMinimum,
})

await web3.sendAndConfirmTransaction(connection, transaction, [sender]);


const LAMPORTS_TO_SEND = 5000;

const sendTransaction = web3.SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: reciver.publicKey,
    lamports: LAMPORTS_TO_SEND,
})

 // Send transaction
 transaction.add(sendSolInstructions);

 //get recipet
 const signature =await web3.sendAndConfirmTransaction(connection, transaction, [ sender ]);

console.log(`Finnished! Sent ${LAMPORTS_TO_SEND} to the adress ${sender.publicKey}`);
console.log(`Transaction signature is ${signature}`);