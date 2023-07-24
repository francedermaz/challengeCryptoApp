import axios from "axios";
import { ApiResponseCryptoID, ApiResponseCryptos } from "../interfaces/api";

const API_URL = "https://api.coingecko.com/api/v3/coins";

export const getListOfCoins = async (): Promise<ApiResponseCryptos> => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response;
  } catch (error) {
    throw new Error(
      "Failed to fetch cryptos. Check your Rate Limit at Coingecko"
    );
  }
};

export const getDetailCryptoByID = async (
  cryptoID: string
): Promise<ApiResponseCryptoID> => {
  try {
    const response = await axios.get(`${API_URL}/${cryptoID}`);
    return {
      data: {
        id: response.data.id,
        name: response.data.name,
        symbol: response.data.symbol,
        image: response.data.image.large,
        price: response.data.market_data.current_price.usd,
      },
    };
  } catch (error) {
    throw new Error("Failed to fetch crypto");
  }
};
