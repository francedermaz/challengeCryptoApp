import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import SearchInput from "../SearchInput";

test("should render the SearchInput component with the provided placeholder", () => {
  const placeholder = "Search cryptos...";
  const { getByPlaceholderText } = render(
    <SearchInput placeholder={placeholder} value="" onChangeText={() => {}} />
  );

  const inputElement = getByPlaceholderText(placeholder);

  expect(inputElement).toBeTruthy();
});

test("should call onChangeText function when input value changes", () => {
  const onChangeTextMock = jest.fn();
  const { getByPlaceholderText } = render(
    <SearchInput placeholder="Search cryptos..." value="" onChangeText={onChangeTextMock} />
  );

  const inputElement = getByPlaceholderText("Search cryptos...");

  act(() => {
    fireEvent.changeText(inputElement, "bitcoin");
  });

  expect(onChangeTextMock).toHaveBeenCalledWith("bitcoin");
});

test("should update the value prop when input value changes", () => {
  const { getByPlaceholderText, rerender } = render(
    <SearchInput placeholder="Search cryptos..." value="" onChangeText={() => {}} />
  );

  const inputElement = getByPlaceholderText("Search cryptos...");

  act(() => {
    fireEvent.changeText(inputElement, "bitcoin");
  });

  rerender(<SearchInput placeholder="Search cryptos..." value="bitcoin" onChangeText={() => {}} />);

  expect(inputElement.props.value).toBe("bitcoin");
});
