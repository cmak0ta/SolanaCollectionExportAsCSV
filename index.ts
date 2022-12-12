import { decodeMetadata } from './utils';
import { PublicKey } from '@solana/web3.js';
import 'isomorphic-fetch';
import addresses from './addresses.json';

const METADATA_PUBKEY = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const get_metadataPda = async (address: PublicKey) => {
	let [pda, bump] = await PublicKey.findProgramAddress([
		Buffer.from("metadata"),
		METADATA_PUBKEY.toBuffer(),
		address.toBuffer(),
	], METADATA_PUBKEY)
	return pda
}

async function getTokenMetadata(token_address: string) {
	try {
		const token_publickey = new PublicKey(token_address)
		const metadata_pda = await get_metadataPda(token_publickey);

		const data = {
			"jsonrpc": "2.0",
			"id": 1,
			"method": "getAccountInfo",
			"params": [
				metadata_pda.toBase58(),
				{
					"encoding": "base64"
				}
			]
		}

		const metadata_res = await fetch("https://api.mainnet-beta.solana.com", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		});
		const metadata_parsed = await metadata_res.json();
		const metadata_buf = Buffer.from(metadata_parsed.result.value.data[0], 'base64');
		const metadata = decodeMetadata(metadata_buf)

		const arweave_res = await fetch(metadata.data.uri)
		const arweave = await arweave_res.json()

		return { metadata, arweave }

	} catch (e) {
		console.log(e)
	}
}

(async () => {
	// You need to change this for your own columns
	console.log('Name,Biome,Pallete,Tilemap,Entity,Curiosity');
	for (let address of addresses) {
		const { arweave } = await getTokenMetadata(address);
		// You need to change this for your own values
		console.log(`${arweave.name || ''},${arweave.attributes[3].value || ''},${arweave.attributes[2].value || ''},${arweave.attributes[4].value || ''},${arweave.attributes[1].value || ''},${arweave.attributes[0].value || ''}`)
	}
	process.exit();
})();
