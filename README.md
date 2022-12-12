

## Get a full collection data as .csv (Solana)

This script needs a few manual steps to be done prior to running it, but dont worry, they are all simple enough!
 1.  Install Metaboss
 2. Get a theindex.io free account
 3. Get all collection item addresses
 4. Configure your columns and values

## 1 - Install Metaboss
This one is simple enough, just follow the instructions from [here](https://metaboss.rs/installation.html)

## 2 - Get a theindex.io free account
Also straight up, go to the website, click on get started, fill email and password, afterwards you will presented with a screen like this one, please save your "api key"![theindex.io logged in page](https://i.imgur.com/U81WcdF.png)

##  3 - Get all collection item addresses
This one is a little bit tricky, but still easy if you followed previous steps!
What you need to do here is get the mint account for the collection, this process can be done for any collection.

 1. Open up a piece of the desired collection on MagicEden, this [Zen0verse](https://magiceden.io/item-details/9F68MY1EHMc4wMiutRbXg9LWrMMCr8H9B9rUV8HzncXS?name=Sand-Jurassic---#664), for example.
 2. Scroll down to the "Details" section and click on the SolanaFM (first icon) next to "On-Chain Collection"
![enter image description here](https://i.imgur.com/j39GUs3.png)
3. Scroll down, switch to the "Metadata" tab and find the "mint" property:
![enter image description here](https://i.imgur.com/duYmV97.png)
4. With all of this in hand, you can run the command on the terminal:

> metaboss collections get-items --collection-mint
> MINT_ACCOUNT_YOU_FOUND --api-key
> YOUR_API_KEY

This will create a json file with all the token addresses of the collection

## 4. Configure your columns and values
Now we will finally touch code! :D
1. First of all, replace the "addresses.json" file contents with the list of all the token addresses of the collection
2.  Then go to the "index.ts" file, on line 57 and change the list to be columns you will want in your csv (keep in mind this needs to be comma separated and no spaces)
3. Then bellow it, on line 59, you will need to define were to get the desired column information in the metadata.

To get this
1. we go back to the MagicEden page for the example piece, in my case, [Zen0verse](https://magiceden.io/item-details/9F68MY1EHMc4wMiutRbXg9LWrMMCr8H9B9rUV8HzncXS?name=Sand-Jurassic---#664),  and this time open the SolanaFM page for the "Mint Address"
2. Scroll down, switch to "Metadata" tab
3. Get the Arweave url in "root.data.uri" and access it on your browser, you will get a JSON that has all the properties of the NFT, from this JSON you can see what to change on line 59 (Please make sure to add the || "" after every value, so it does not throw errors if a specific NFT does not have that specific parameter, and please make sure to keep it comma separate and with no spaces) 

## Run the script!
Finally, after all this setup, you can run the script it self!
Steps:

 1. Run `npm install`
 2. Run `npm start` just to test it out, it will print your data in the terminal:
 ![(quick example with only 1 entry)](https://i.imgur.com/1hkw6af.png)
(quick example with only 1 entry)
3. If it looks correct, you can run `npm run export` and wait :)
4. When its over, you will have a new "sheet.csv" file in the project directory