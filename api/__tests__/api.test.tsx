import {
  mockCryptoIDApi,
  mockCryptosApi,
} from "../../__mocks__/mockApiResponses";
import { getListOfCoins, getDetailCryptoByID } from "../api";

jest.mock("../api", () => ({
  getListOfCoins: jest.fn(),
  getDetailCryptoByID: jest.fn(),
}));

describe("getListOfCoins", () => {
  test("should return a list of coins", async () => {
    (getListOfCoins as jest.Mock).mockResolvedValue(mockCryptosApi);
    const response = await getListOfCoins();
    expect(response).toEqual(mockCryptosApi);
  });

  test("should throw an error on API failure", async () => {
    (getListOfCoins as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch cryptos. Check your Rate Limit at Coingecko")
    );
    await expect(getListOfCoins()).rejects.toThrow(
      "Failed to fetch cryptos. Check your Rate Limit at Coingecko"
    );
  });
});

describe("getDetailCryptoByID", () => {
  const cryptoID = "bitcoin";

  test("should return details of a specific crypto", async () => {
    (getDetailCryptoByID as jest.Mock).mockResolvedValue(mockCryptoIDApi);
    const response = await getDetailCryptoByID(cryptoID);
    expect(response).toEqual(mockCryptoIDApi);
  });

  test("should throw an error on API failure", async () => {
    (getDetailCryptoByID as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch crypto")
    );
    await expect(getDetailCryptoByID(cryptoID)).rejects.toThrow(
      "Failed to fetch crypto"
    );
  });
});
