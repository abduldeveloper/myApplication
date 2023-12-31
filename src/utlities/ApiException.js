import Toast from 'react-native-toast-message';
import Color from '../styles/Color';

const ERROR_0 = 'Network error! Check your connection';
const ERROR_400 = 'The Email is Already Exists';
const ERROR_401 = 'Invalid username or password';
const ERROR_403 = 'Does not have permission to access the requested resource';
const ERROR_426 = 'Mandatory Field is required';
const ERROR_404 = 'Invalid url';
const ERROR_408 = 'Data Already Exist';
const ERROR_500 = 'Internal server error';
const ERROR_503 = 'Service unavailable';

export const ApiExceptionHandler = (statusCode = '', customMessage = '') => {
  if (statusCode == undefined) {
    return '';
  }

  if (customMessage != '') {
    return customMessage;
  }

  switch (statusCode.toString()) {
    case '0':
      return ERROR_0;
    case '400':
      return ERROR_400;
    case '401':
      return ERROR_401;
    case '403':
      return ERROR_403;
    case '404':
      return ERROR_404;
    case '500':
      return ERROR_500;
    case '408':
      return ERROR_408;
    case '503':
      return ERROR_503;
    case '426':
      return ERROR_426;
    default:
      return '';
  }
};

export const ShowToast = text => {
  Toast.show({
    type: 'error',
    text1: text,
    position: 'top',
  });
};
