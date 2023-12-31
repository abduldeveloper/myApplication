
import axios from "axios";
import { Alert } from "react-native";

import { LINKS } from "../../../utlities/ApiConfig";
import { Types } from "../../actionTypes";
import Toast from 'react-native-toast-message';
import { ApiExceptionHandler, ShowToast } from "../../../utlities/ApiException";
import { storeLocalData } from "../../../utlities/Helper";




export const AC_Toggle_Auth_Loader = () => {
    return {
      type: Types.TOGGLE_AUTH_LOADER,
    };
  };
  


export const AC_DoLogin = (data) => {

    return (dispatch) => {
      dispatch(AC_Toggle_Auth_Loader());
      return axios
        .post(LINKS.login, data)
        .then((response) => {
          dispatch(AC_Toggle_Auth_Loader());
          dispatch(AC_LoginSuccess(response.data.access));
          dispatch(AC_SaveApiToken(response.data.access));
          dispatch(AC_GetDashboardList(response.data.access))
          storeLocalData("appLogToken", response.data.access);    
    
    // username
          // return response.data;
        })
        .catch((error) => {
          dispatch(AC_Toggle_Auth_Loader());
  
        
            ShowToast(ApiExceptionHandler(error.response.status));
          
        });
    };
  };

  export const AC_LoginSuccess = (token) => {
    return {
      type: Types.LOGIN_SUCCESS,
      payload: token,
    };
  };
  

  export const AC_SaveApiToken = (param) => {
    return {
      type: Types.SAVE_API_TOKEN,
      payload: param,
    };
  };

  export const AC_RestAuthState = () => {
    return {
      type: Types.RESET_AUTH_STATE,
    };
  };


  export const AC_GetDashboardList = (token) => {
    return (dispatch) => {
      dispatch(AC_Toggle_Dashboard_Action_Loader());
      return axios
        .get(LINKS.dashboard, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then((response) => {
          dispatch(AC_Toggle_Dashboard_Action_Loader());
          dispatch(AC_SaveDashboardList(response.data));
        })
        .catch((error) => {
  
          dispatch(AC_Toggle_Dashboard_Action_Loader());
          ShowToast(ApiExceptionHandler(error.response.status));
        });
    };
  };
  

  export const AC_Toggle_Dashboard_Action_Loader = () => {
    return {
      type: Types.TOGGLE_DASHBOARD_ACTION_LOADER,
    };
  };
  
  export const AC_ResetLoader = () => {
    return {
      type: Types.REST_LOADER,
    };
  };
  
  
  export const AC_SaveDashboardList = (data) => {
    return {
      type: Types.SAVE_DASHBOARD_LIST,
      payload: data,
    };
  };