// import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

// const publicKeyRegex = /^[1-9A-HJ-NP-Za-km-z]{44}$/;
 
// const suppliedPublicKey = process.argv[2];
// if (!suppliedPublicKey) {
//   throw new Error("Provide a public key to check the balance of!");
// } else if (suppliedPublicKey.length !== 44){
//     throw new Error("Public key is´nt the correct length");
// } else if (!publicKeyRegex.test(suppliedPublicKey)) {
//     throw new Error("Public key is not the correct format");
// }
 
// const connection = new Connection("https://api.devnet.solana.com", "confirmed");
// //const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed")
 
// const publicKey = new PublicKey(suppliedPublicKey);
 
// const balanceInLamports = await connection.getBalance(publicKey);
 
// const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
// console.log(
//   `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
// );

//Modify the script to connect to mainNet and look up some famous Solana wallets. Try toly.sol, shaq.sol or mccann.sol.

// import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
// import { nameRegistry } from "@solana/spl-name-service";

// const publicKeyRegex = /^[1-9A-HJ-NP-Za-km-z]{44}$/;
// const publicSnsRegex = /^[a-zA-Z0-9_-]+\.sol$/;

// const suppliedPublicKey = process.argv[2];
// //Check if they typed in an address or not
// if (!suppliedPublicKey) {
//     throw new Error("You need to provide a public key");
// } else {

//     //Check if it's a base58 or SNS
//     function CheckTypeOfPublicKey (suppliedPublicKey: string) {

//         let publicKey: PublicKey;

//         //Check if it was a valid base58 public key
//         if(suppliedPublicKey.length !== 44) {
//             throw new Error("public key is too short");
//         } else if (!publicKeyRegex.test(suppliedPublicKey)) {
//             throw new Error("Public key is not correct format");
//         } else {
//             //Connect and check
//             publicKey = new PublicKey(suppliedPublicKey);
//         }

//         //check if its a .sol sns adress
//         if (!publicSnsRegex.test(suppliedPublicKey)) {
//             throw new Error("Not a valid SNS");
//         } else {
//             publicKey = new PublicKey(nameRegistry.owner)
//         }


//     }
   
 



// }

// const publicKey = new PublicKey(suppliedPublicKey);

// const connection = new Connection("https://api.devnet.solana.com", "confirmed");
// const connection2 = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// const balanceInLamports = await connection.getBalance(publicKey);

// const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;





// import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
// import { getHashedName, getNameAccountKey, NameRegistryState } from "@solana/spl-name-service";

// //public key regex
// const publicKeyRegex = /^[1-9A-HJ-NP-Za-km-z]{44}$/;

// //checking the input
// const suppliedInput = process.argv[2];
// if (!suppliedInput) {
//   throw new Error("Provide a public key or a .sol domain name to check the balance!");
// }

// // Connect to mainNet
// const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// //creating public key
// let publicKey: PublicKey;

// // Resolve .sol domains or validate public key
// if (publicKeyRegex.test(suppliedInput)) {
//   publicKey = new PublicKey(suppliedInput);
//   console.log(`Valid public key: ${publicKey.toBase58()}`);
// } else if (suppliedInput.endsWith(".sol")) {
//   console.log(`Resolving domain: ${suppliedInput}`);
//   const hashedName = await getHashedName(suppliedInput);
//   const nameAccountKey = await getNameAccountKey(hashedName);
//   const nameRegistry = await NameRegistryState.retrieve(connection, nameAccountKey);

//   if (!nameRegistry.owner) {
//     throw new Error(`Unable to resolve the .sol domain: ${suppliedInput}`);
//   }
//   publicKey = nameRegistry.owner;
//   console.log(`Resolved ${suppliedInput} to public key: ${publicKey.toBase58()}`);
// } else {
//   throw new Error("Invalid input! Provide a valid public key or .sol domain name.");
// }

// // Fetch balance
// const balanceInLamports = await connection.getBalance(publicKey);
// const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

// console.log(
//   `✅ Finished! The balance for the wallet at address ${publicKey.toBase58()} is ${balanceInSOL} SOL!`
// );


//import { getHashedName, getNameAccountKey, NameRegistryState } from "@solana/spl-name-service";
//Some error still excist, the code seems correct but it cant connect to the sources
import { getHashedName, getNameAccountKey, NameRegistryState } from "@solana/spl-name-service";
import { Connection, PublicKey } from "@solana/web3.js";                                                                                                                            

// Create a connection to Solana network (Mainnet)
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

const suppliedInput = process.argv[2];  

if (suppliedInput.endsWith(".sol")) {
  console.log(`Resolving domain: ${suppliedInput}`);
  
  try {
    // Hash the domain name
    const hashedName = await getHashedName(suppliedInput);
    
    // Get the NameAccount key associated with the hashed domain name
    const nameAccountKey = await getNameAccountKey(hashedName);
    
    // Retrieve the name registry for the domain
    const nameRegistry = await NameRegistryState.retrieve(connection, nameAccountKey);

    // If name registry is found, resolve the public key
    if (nameRegistry) {
      const publicKey = nameRegistry.owner;
      console.log(`Public key for domain ${suppliedInput} is: ${publicKey.toBase58()}`);
      
      // Now you can get the balance or other information about the account
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSOL = balanceInLamports / 1000000000;  // Lamports to SOL
      console.log(`Balance: ${balanceInSOL} SOL`);
    } else {
      console.log(`No registry found for domain: ${suppliedInput}`);
    }

  } catch (error) {
    console.error(`Error resolving domain: `);
  }
} else {
  console.log("The supplied input is not a valid .sol domain");
}





