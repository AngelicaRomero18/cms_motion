import { combineReducers } from "redux";

import CoolorsReducer from "./reducers/colors.reducer";
import ImagesReducer from "./reducers/images.reducer";
import SidenavReduer from "./reducers/sidenav.reducer";
import SmsReducer from "./reducers/sms.reducer";
import UserReducer from "./reducers/user.reducer";
import TicketsReducer from "./reducers/tickets.reducer";
import UsersReducer from "./reducers/users.reducer";
import AccountsReducer from "./reducers/accounts.reducer";
import UnitsReducer from "./reducers/units.reducer";
import InvoicesReducer from "./reducers/invoices.reducer";
import CategoriesReducer from "./reducers/category.reducer";
import LoginReducer from "./reducers/auth.reducer";
import TutorialesReducer from "./reducers/tutoriales.reducer";

const RootReducer = combineReducers({
  CoolorsReducer: CoolorsReducer,
  ImagesReducer: ImagesReducer,
  SidenavReducer: SidenavReduer,
  SmsReducer: SmsReducer,
  UserReducer: UserReducer,
  TicketsReducer: TicketsReducer,
  UsersReducer: UsersReducer,
  AccountsReducer: AccountsReducer,
  UnitsReducer: UnitsReducer,
  InvoicesReducer: InvoicesReducer,
  CategoriesReducer: CategoriesReducer,
  LoginReducer: LoginReducer,
  TutorialesReducer: TutorialesReducer,
});

export default RootReducer;
