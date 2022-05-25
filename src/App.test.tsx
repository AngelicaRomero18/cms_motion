import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import "@testing-library/jest-dom/extend-expect";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("renders content", () => {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );
});
