import {StyleSheet} from 'react-native';

import Color from '../../../styles/Color';
import TextStyles from '../../../styles/TextStyle';
import Fonts from '../../../styles/Fonts';

const SignInStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.bgColor,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 50,
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    alignSelf: 'center',
    alignItems: 'center',
    color: Color.btnColor,
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  signupPromptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  signupPromptText: {
    fontSize: 14,
    color: Color.gray2,
    fontFamily: Fonts.medium,
  },

  signupLinkText: {
    fontSize: 14,
    color: Color.btnColor,
    fontWeight: Fonts.bold,
    fontWeight: '700',
    marginLeft: 5,
  },
});

export default SignInStyles;
