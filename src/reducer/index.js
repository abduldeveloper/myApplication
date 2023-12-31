import { combineReducers } from "@reduxjs/toolkit";
import { EmployeeReducer } from "./reducer";
import { SignUpReducer } from "./SingUpReducer";
import { SingInReducer } from "./SingInReducer";

export const rootReducer = combineReducers({
    SignUpState:SignUpReducer,
    SignInState: SingInReducer
})
