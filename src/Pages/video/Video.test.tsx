import React from "react";
import Video from "./Video";
import { Provider } from "react-redux";
import { withRouter, BrowserRouter as Router } from "react-router-dom";
import { Store } from "../../redux/store";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("renders content", () => {
  render(
    <Provider store={Store}>
      <Router>
        <Video />
      </Router>
    </Provider>
  );
});
