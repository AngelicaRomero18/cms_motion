import React from "react";
import { render, screen } from "@testing-library/react";
import Chat from "./Chat";
import { Provider } from "react-redux";
import { Store } from "../../../redux/store";

import "@testing-library/jest-dom/extend-expect";

test("renders content", () => {
  
  render(
    
    <Provider store ={Store}> 
      <Chat />
    </Provider>
  );
});
