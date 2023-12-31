import { Types } from "../actions/actionTypes";


const initialState = {
  isCreateActionLoading: false,
  isNewAccountCreated:false
};

export function SignUpReducer(state = initialState, action) {
  switch (action.type) {


    case Types.TOGGLE_CREATE_ACCOUNT_ACTION_LOADER:
      return { ...state, isCreateActionLoading: !state.isCreateActionLoading };

      case Types.CREATE_ACCOUNT_SUCCESS:
        return { ...state, isNewAccountCreated: true };

        case Types.RESET_CREATE_ACCOUNT:
          return {
            ...state,
            isNewAccountCreated: false,
          };
    default:
      return state;
  }
}
