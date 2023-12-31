import { types } from "@babel/core";
import { Types } from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  listLoading:false,
  userToken: "",
  apiToken: "",
  dasboardList:[],
};
export function SingInReducer(state = initialState, action) {
  switch (action.type) {
    case Types.TOGGLE_AUTH_LOADER:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
      
      case Types.TOGGLE_DASHBOARD_ACTION_LOADER:
      return {
        ...state,
        listLoading: !state.listLoading,
      };
    case Types.SAVE_API_TOKEN:
      return {
        ...state,
        apiToken: action.payload,
      };
      
      
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        userToken: action.payload,
        isLoggedIn: true,
      };

      case Types.SAVE_DASHBOARD_LIST:
        return { ...state, dasboardList: action.payload };

    case Types.RESET_AUTH_STATE:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        userToken: "",
        apiToken: "",
        username:"",
      };
   

    case Types.REST_LOADER:
      return{
...state,
isLoggedIn:false,
      }
    
    default:
      return state;
  }
}
