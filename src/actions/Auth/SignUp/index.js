import axios from "axios";
import { Alert } from "react-native";

import { LINKS } from "../../../utlities/ApiConfig";
import { Types } from "../../actionTypes";
import { ApiExceptionHandler, ShowToast } from "../../../utlities/ApiException";


export const AC_CreateAccountSuccess = () => {
    return {
      type: Types.CREATE_ACCOUNT_SUCCESS,
    };
  };
  

export const AC_CreateAccount = (data) => {
    return (dispatch) => {
      dispatch(AC_Toggle_Create_Account_Action_Loader());
      return axios
        .post(LINKS.register, data)
        .then((response) => {
          dispatch(AC_Toggle_Create_Account_Action_Loader());
          dispatch(AC_CreateAccountSuccess());
        })
        .catch((error) => {
          dispatch(AC_Toggle_Create_Account_Action_Loader());
          const passwordError = error.response.data.password;
          const usernameError =  error.response.data.username;
          if (passwordError) {
            ShowToast(passwordError[0])
          } 
          else if(usernameError){
            ShowToast(usernameError[0])
          }
          else {
            // Handle other status codes or generic errors
            ShowToast(ApiExceptionHandler(error?.response?.status));
          }
        });
    };
  };

  export const AC_Toggle_Create_Account_Action_Loader = () => {
    return {
      type: Types.TOGGLE_CREATE_ACCOUNT_ACTION_LOADER,
    };
  };


  export const AC_ResetCreateAccount = () => {
    return {
      type: Types.RESET_CREATE_ACCOUNT,
    };
  };