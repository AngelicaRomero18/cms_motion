import {
  GET_CATEGORY,
  GET_CATEGORY_FAILED,
  GET_CATEGORY_SUCCESS,
} from "../types/category.types";

const initialState = {
  isLoading: true,
  errMess: null,
  categories: [],
};

const CategoriesReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case GET_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};

export default CategoriesReducer;
