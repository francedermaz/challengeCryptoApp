import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "../Homescreen";
import { mockCryptosApi } from "../../../__mocks__/mockApiResponses";
import { getListOfCoins } from "../../../api/api";

jest.mock("../../../api/api", () => ({
  getListOfCoins: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("HomeScreen", () => {
  test("should render correctly", () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId("home-screen")).toBeTruthy();
  });

  test("should show search input when currencies are available", async () => {
    (getListOfCoins as jest.Mock).mockResolvedValue(mockCryptosApi);
    const { getByPlaceholderText } = render(<HomeScreen />);

    await waitFor(() => {
      const searchInput = getByPlaceholderText("Search cryptos...");
      expect(searchInput).toBeTruthy();
    });
  });

  test("should render the list of currencies when API call is successful", async () => {
    (getListOfCoins as jest.Mock).mockResolvedValue(mockCryptosApi);
    const { getByTestId } = render(<HomeScreen />);

    await waitFor(() => {
      const currencyList = getByTestId("currency-list");
      expect(currencyList.children).toBeDefined();
    });
  });

  test("should display error message when API call fails", async () => {
    (getListOfCoins as jest.Mock).mockRejectedValue(new Error("Network Error"));
    const { getByTestId, getByText } = render(<HomeScreen />);
  
    await waitFor(() => {
      const errorContainer = getByTestId("error-container");
      expect(errorContainer).toBeTruthy();
  
      const errorMessage = getByText("Failed to fetch cryptos. Check your Rate Limit at Coingecko");
      expect(errorMessage).toBeTruthy();
    });
  });  

  test("should show 'Sorry, no matching results' when no currencies match the search", async () => {
    (getListOfCoins as jest.Mock).mockResolvedValue(mockCryptosApi);
    const { getByTestId, getByText } = render(<HomeScreen />);
  
    await waitFor(() => {
      const searchInput = getByTestId("search-input");
  
      fireEvent.changeText(searchInput, "non_existent_currency");
  
      const noResultText = getByText("Sorry, no matching results");
      expect(noResultText).toBeTruthy();
    });
  });
  
  test("should update searchQuery on typing in search input", async () => {
    (getListOfCoins as jest.Mock).mockResolvedValue(mockCryptosApi);
    const { getByPlaceholderText } = render(<HomeScreen />);

    await waitFor(() => {
      const searchInput = getByPlaceholderText("Search cryptos...");
      fireEvent.changeText(searchInput, "bitcoin");
      expect(searchInput.props.value).toBe("bitcoin");
    });
  });
});
