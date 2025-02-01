import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, burn } from "@solana/spl-token";
import "dotenv/config";

const DEVNET_URL = clusterApiUrl("devnet");
const TOKEN_DECIMALS = 2;
const BURN_AMOUNT = 2;

//Substitute your token mint address
const TOKEN_MINT_ADDRESS = "CEyj84WTaAMpmD46Vd3HSz5DzfgR7aXTBnoCAUDfjqKh";

const connection = new Connection(DEVNET_URL);
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`🔑 Loaded keypair. Public key: ${user.publicKey.toBase58()}`);

try {

    const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);

    const userTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        tokenMintAccount,
        user.publicKey,
    );

    const burnAmount = BURN_AMOUNT * 10 ** TOKEN_DECIMALS;

    const transactionSignature = await burn(
        connection,
        user,
        userTokenAccount.address,
        tokenMintAccount,
        user,
        burnAmount,
    );

    const exploreLink = getExplorerLink(
        "transaction",
        transactionSignature,
        "devnet",
    );

    console.log(`✅ Burn Transaction: ${exploreLink}`);

} catch (error) {
    console.error(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
    )
}