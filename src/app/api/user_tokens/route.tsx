import axios from "axios";

export async function GET(req: Request) {
  const wallet_address = new URL(req.url).searchParams.get("wallet_address");

  console.log(wallet_address);

  if (!wallet_address) {
    return new Response(
      JSON.stringify({ error: "wallet_address parameter is required" }),
      {
        status: 400,
      },
    );
  }

  const url = `https://api.1inch.dev/balance/v1.2/8453/balances/${wallet_address}`;
  const config = {
    headers: {
      Authorization: "Bearer ewOwBTQ87PrAWK7cQVjjLISKkjmc2kXr",
    },
  };

  const response = await axios.get(url, config);
  const balances = response.data;
  console.log("got balances");

  const filteredBalances = Object.keys(balances).filter((contractAddress) => {
    return parseFloat(balances[contractAddress]) > 0;
  });

  if (filteredBalances.length === 0) {
    return new Response(
      JSON.stringify({ error: "No tokens with balance > 0 found" }),
      {
        status: 404,
      },
    );
  }

  console.log(filteredBalances);

  const tokenDetailsPromises = filteredBalances.map(async (contractAddress) => {
    try {
      const blockscoutUrl = `https://base.blockscout.com/api?module=token&action=getToken&contractaddress=${contractAddress}`;
      const blockscoutResponse = await axios.get(blockscoutUrl);
      const tokenData = blockscoutResponse.data.result;

      console.log(tokenData);

      const coinGeckoUrl = `https://api.coingecko.com/api/v3/coins/base/contract/${contractAddress}`;
      const coinGeckoResponse = await axios.get(coinGeckoUrl);
      const tokenMetadata = coinGeckoResponse.data;

      console.log(coinGeckoResponse);

      return {
        contractAddress,
        quantity: balances[contractAddress],
        name: tokenData.name || tokenMetadata.name,
        symbol: tokenData.symbol || tokenMetadata.symbol,
        decimals: tokenData.decimals || tokenMetadata.decimals,
        totalSupply: tokenData.totalSupply || tokenMetadata.total_supply,
        image: tokenMetadata.image
          ? tokenMetadata.image.large
          : "default-image-url.png",
      };
    } catch (error) {
      console.error("Error fetching token data:", error);
      return null;
    }
  });

  const tokenDetails = await Promise.all(tokenDetailsPromises);

  const validTokenDetails = tokenDetails.filter((token) => token !== null);

  return new Response(JSON.stringify(validTokenDetails), {
    status: 200,
  });
}
