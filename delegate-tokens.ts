import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {
    Connection,
    PublicKey,
    clusterApiUrl,
    SystemProgram,
} from "@solana/web3.js";
import { approve, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";

const DEVNET_URL = clusterApiUrl("devnet");
const TOKEN_DECIMALS = 2;
const DELETE_AMOUNT = 50;
const MINOR_UNITS_PER_MAJOR_UNITS = 10 ** TOKEN_DECIMALS;

//Iizialize connection and load user keypair
const connection = new Connection(DEVNET_URL);
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`🔑 Loaded keypair. Public key: ${user.publicKey.toBase58()}`);


// Replace this with your actual address
// For this example, we will be using System Program's ID as a delegate
const deletePublicKey = new PublicKey(SystemProgram.programId);


// Substitute your token mint address
const tokenMintAdress = new PublicKey("CEyj84WTaAMpmD46Vd3HSz5DzfgR7aXTBnoCAUDfjqKh");

try {
    // Get or create the user's token account
    const userTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        tokenMintAdress,
        user.publicKey,
    );

    //Approve the delegate
    const approveTransactionSignature = await approve(
        connection,
        user,
        userTokenAccount.address,
        deletePublicKey,
        user.publicKey,
        DELETE_AMOUNT * MINOR_UNITS_PER_MAJOR_UNITS,
    );

    const explorerLink = getExplorerLink(
        "transaction",
        approveTransactionSignature,
        "devnet",
    );

    console.log(`✅ Delegate approved. Transaction: ${explorerLink}`);

} catch (error){
    console.error(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
}

// Approve the delegate

