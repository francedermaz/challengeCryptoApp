import React from "react";
import { render } from "@testing-library/react-native";
import Loader from "../Loader";

test("should render the Loader component with the loadingGif", () => {
  const { getByTestId } = render(<Loader />);

  const container = getByTestId("loader-container");
  const loadingGif = getByTestId("loading-gif");

  expect(container).toBeTruthy();
  expect(loadingGif).toBeTruthy();
  expect(loadingGif.props.source).toBeDefined();
});

test("should match the Loader component snapshot", () => {
  const { toJSON } = render(<Loader />);

  expect(toJSON()).toMatchSnapshot();
});
