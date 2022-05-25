import React from "react";
import Tutoriales from "./Tutoriales";
import { Provider, useDispatch } from "react-redux";
import { Store } from "../../redux/store";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("renders content", () => {
  render(
    <Provider store={Store}>
      <Tutoriales />
    </Provider>
  );
});
