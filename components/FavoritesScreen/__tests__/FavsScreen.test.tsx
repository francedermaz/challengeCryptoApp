import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import FavsScreen from "../FavsScreen";
import { mockFavorites } from "../../../__mocks__/sampleCryptoData";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn().mockImplementation((key: string) => {
    return Promise.resolve(
      key === "favorites" ? JSON.stringify(mockFavorites) : null
    );
  }),
}));

describe("FavsScreen", () => {
  test("should render correctly", () => {
    const { getByTestId } = render(<FavsScreen />);
    expect(getByTestId("favs-screen")).toBeTruthy();
  });

  test("should show 'Start adding your favorite cryptos!' message when no favorites are available", () => {
    const { getByText } = render(<FavsScreen />);
    const message = getByText("Start adding your favorite cryptos!");
    expect(message).toBeTruthy();
  });

  test("should show search input when favorites are available", async () => {
    const { getByPlaceholderText } = render(<FavsScreen />);
    await waitFor(() => {
      const searchInput = getByPlaceholderText("Search cryptos...");
      expect(searchInput).toBeTruthy();
    });
  });

  test("should update searchQuery on typing in search input", async () => {
    const { getByPlaceholderText } = render(<FavsScreen />);
    await waitFor(() => {
      const searchInput = getByPlaceholderText("Search cryptos...");
      fireEvent.changeText(searchInput, "bitcoin");
      expect(searchInput.props.value).toBe("bitcoin");
    });
  });

  test("should show 'Sorry, no matching results' when no currencies match the search", async () => {
    const { getByText, getByPlaceholderText } = render(<FavsScreen />);
    await waitFor(() => {
      const searchInput = getByPlaceholderText("Search cryptos...");
      fireEvent.changeText(searchInput, "non_existent_currency");
      const noResultText = getByText("Sorry, no matching results");
      expect(noResultText).toBeTruthy();
    });
  });

  test("should navigate to CryptoDetail when a currency is pressed", async () => {
    const navigate = jest.fn();
    (require("@react-navigation/native") as any).useNavigation = () => ({
      navigate,
    });

    const { getByText } = render(<FavsScreen />);

    await waitFor(() => {
      const cryptoName = getByText("Bitcoin");
      fireEvent.press(cryptoName);
      expect(navigate).toHaveBeenCalledWith("CryptoDetail", {
        currency: mockFavorites[0],
      });
    });
  });
});
