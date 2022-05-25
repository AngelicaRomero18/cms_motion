import React from "react";
import SignIn from "./SignIn";
import { Provider, useDispatch } from "react-redux";
import { Store } from "../../redux/store";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

// test("renders content", () => {
//   const component = render(
//     <Provider store={Store}>
//       <SignIn />
//     </Provider>
//   );
// });

describe("SignIn Component", () => {
  it("should submit the username and password", async () => {
    // GIVEN
    const onSubmitMock = jest.fn();
    const password = "123456";
    const username = "tomatu_like123@hotmail.com";

    // WHEN
    const { getByPlaceholderText, getByText } = render(
      <Provider store={Store}>
        <SignIn onSubmit={onSubmitMock} />
      </Provider>
    );

    fireEvent.change(getByPlaceholderText("Nombre de usuario"), {
      target: { value: username },
    });
    fireEvent.change(getByPlaceholderText("Contraseña"), {
      target: { value: password },
    });
    fireEvent.click(getByText("Iniciar sesión"));

    // THEN
    /* 
      onSubmit will be called with 3 parameters but only the first one interests me:
      values : Object
      The field values in the form of { field1: 'value1', field2: 'value2' }.
      https://redux-form.com/8.2.2/docs/api/reduxform.md/#-code-onsubmit-function-code-optional-
      
      a less explicite option:
      expect(onSubmitMock.mock.calls[0][0]).toEqual({username, password});
      */
    // expect(onSubmitMock).toHaveBeenCalledWith(
    //   { username, password },
    //   expect.any(Function),
    //   expect.any(Object)
    // );
  });

  //   it("should show a errorMessage message if passed one", () => {
  //     // GIVEN
  //     const onSubmitMock = jest.fn();
  //     const errorMsg = "errorMessage message";

  //     // WHEN
  //     const { getByText } = render(
  //       <Provider store={Store}>
  //         <LoginForm errorMessage={errorMsg} onSubmit={onSubmitMock} />
  //       </Provider>
  //     );

  //     // THEN
  //     expect(getByText(errorMsg)).not.toBeNull();
  //   });
});
