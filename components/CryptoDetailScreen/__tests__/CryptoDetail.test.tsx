import React from "react";
import { render, waitFor, fireEvent, act } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoDetailScreen from "../CryptoDetail";
import { mockCryptoDetailData } from "../../../__mocks__/sampleCryptoData";

jest.mock("../../../api/api", () => ({
  getDetailCryptoByID: jest.fn(() =>
    Promise.resolve({ data: mockCryptoDetailData })
  ),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const setAsyncStorageData = (key: string, value: string) => {
  (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(value);
};

test("should render CryptoDetailScreen with CryptoDetail data", async () => {
  const { getByText } = render(
    <CryptoDetailScreen
      route={{ params: { currency: mockCryptoDetailData } }}
    />
  );
  await waitFor(() => {
    const nameText = getByText(
      `${
        mockCryptoDetailData.name
      } (${mockCryptoDetailData.symbol.toUpperCase()})`
    );
    const priceText = getByText(`$${mockCryptoDetailData.price}`);
    expect(nameText).toBeTruthy();
    expect(priceText).toBeTruthy();
  });
});

test("should render 'Add to Favorites' button initially and add the currency to favorites on press", async () => {
  const { getByText, getByTestId } = render(
    <CryptoDetailScreen
      route={{ params: { currency: mockCryptoDetailData } }}
    />
  );

  await waitFor(() => {
    const addToFavoritesButton = getByTestId("favoriteButton");
    expect(addToFavoritesButton).toBeTruthy();

    act(() => {
      fireEvent.press(addToFavoritesButton);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "favorites",
      JSON.stringify([mockCryptoDetailData])
    );
  });
});

test("should render 'Remove from Favorites' button initially and remove the currency from favorites on press", async () => {
  setAsyncStorageData("favorites", JSON.stringify([mockCryptoDetailData]));

  const { getByText, getByTestId } = render(
    <CryptoDetailScreen
      route={{ params: { currency: mockCryptoDetailData } }}
    />
  );

  await waitFor(() => {
    const removeFromFavoritesButton = getByTestId("favoriteButton");
    expect(removeFromFavoritesButton).toBeTruthy();

    act(() => {
      fireEvent.press(removeFromFavoritesButton);
    });

    expect(getByText("Remove from Favorites")).toBeDefined();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("favorites", "[]");
  });
});
