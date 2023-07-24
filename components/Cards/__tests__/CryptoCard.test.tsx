import React from "react";
import { render } from "@testing-library/react-native";
import CryptoCard from "../CryptoCard";
import { sampleCryptoData } from "../../../__mocks__/sampleCryptoData";

test("should render CryptoCard correctly with symbol and name", () => {
  const { getByText } = render(
    <CryptoCard
      id={sampleCryptoData.id}
      name={sampleCryptoData.name}
      symbol={sampleCryptoData.symbol}
    />
  );

  const symbolText = getByText(sampleCryptoData.symbol);
  const nameText = getByText(sampleCryptoData.name);

  expect(symbolText).toBeTruthy();
  expect(nameText).toBeTruthy();
});

test("should render CryptoCard correctly", () => {
  const longName =
    "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.";

  const { getByText } = render(
    <CryptoCard
      id={sampleCryptoData.id}
      name={longName}
      symbol={sampleCryptoData.symbol}
    />
  );

  const nameText = getByText(longName);

  expect(nameText).toBeTruthy();
  expect(nameText.props.numberOfLines).toBe(1);
});
