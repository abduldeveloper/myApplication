import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  SafeAreaView,
  Alert,
} from 'react-native';

import Icon from '../../../common/Icons';
import Color from '../../../styles/Color';
import Fonts from '../../../styles/Fonts';
import SignUpStyles from './styles';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {Controller, useForm} from 'react-hook-form';
import {ftSize, wSizes} from '../../../styles/Sizes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  AC_CreateAccount,
  AC_ResetCreateAccount,
} from '../../../actions/Auth/SignUp';
import CustomModal from '../../../components/CustomizeModal/CustomizeModal';
import OverlayLoader from '../../../components/OverlayLoader/index';

interface ISignUpScreen {
  CreateAccount: (params: any) => {};
  SignUpState: any;
  ResetCreateAccount: () => {};
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9.@/+\-_]+$/;
const SignUpScreen: React.FC<ISignUpScreen> = props => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const pwd = watch('password');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPassword] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const onSignUpPressed = (data?: any) => {
    props.CreateAccount(data);
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (props?.SignUpState?.isNewAccountCreated) {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.goBack();
        props.ResetCreateAccount();
      }, 1500);
    }
  }, [props?.SignUpState?.isNewAccountCreated]);

  return (
    <SafeAreaView style={{...SignUpStyles.container}}>
      <StatusBar backgroundColor={Color.statusBarColor} />

      <KeyboardAwareScrollView
        extraScrollHeight={36}
        keyboardShouldPersistTaps="handled">
        <View style={{...SignUpStyles.innerContainer}}>
          <CustomModal
            title="Account Created successfully !!!"
            visible={modalVisible}
          />
          <View style={{...SignUpStyles.logoContainer}}>
            <Image
              source={require('../../../assets/images/Logo1.png')}
              style={{
                width: wSizes(120),
                height: wSizes(120),
                resizeMode: 'contain',
              }}
            />

            <Text style={{...SignUpStyles.logoText}}>Create your account</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '49%', marginRight: 5}}>
              <CustomInput
                name="first_name"
                placeHolder={'Firstname'}
                control={control}
                rules={{
                  required: 'First name is required',
                  minLength: {
                    value: 3,
                    message: 'Firstname should minimum 3 characters',
                  },
                }}
                secureTextEntry={false}
              />
            </View>
            <View style={{width: '49%'}}>
              <CustomInput
                name="last_name"
                placeHolder={'Lastname'}
                control={control}
                rules={{
                  required: 'Lastname is required',
                  minLength: {
                    value: 1,
                    message: 'Lastname should minimum 1 characters',
                  },
                }}
                secureTextEntry={false}
              />
            </View>
          </View>
          <CustomInput
            name="email"
            placeHolder={'Email'}
            // text={
            //    isSignIn!=""?isSignIn:"Forgot Password ?"
            // }
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Email is invalid',
              },
            }}
            secureTextEntry={false}
            keyboardType={'email-address'}
          />
          <CustomInput
            name="username"
            placeHolder={'Username'}
            control={control}
            rules={{
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username should minimum 3 characters',
              },
              pattern: {
                value: USERNAME_REGEX,
                message:
                  'Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.',
              },
            }}
            secureTextEntry={false}
          />
          <CustomInput
            name="password"
            placeHolder={'Password'}
            control={control}
            secureTextEntry={true}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be minimum 8 characters',
              },
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  'Password must be combination of both numeric and alphabet',
              },
            }}
            showPassword={passwordShown}
            changeShowPassword={() => setPasswordShown(!passwordShown)}
          />
          <CustomInput
            name="password2"
            placeHolder={'Confirm Password'}
            secureTextEntry={true}
            control={control}
            rules={{
              required: 'Confirm Password is Required',
              validate: value => value === pwd || 'Password does not match',
            }}
            showPassword={confirmPasswordShown}
            changeShowPassword={() => setConfirmPassword(!confirmPasswordShown)}
          />

          <CustomButton
            onPress={handleSubmit(onSignUpPressed)}
            text={'Sign Up'}
            containerStyle={{backgroundColor: Color.btnColor}}
          />
          <View style={{...SignUpStyles.signupPromptContainer}}>
            <Text style={{...SignUpStyles.signupPromptText}}>
              Already have a account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignInScreen');
              }}>
              <Text style={{...SignUpStyles.signupLinkText}}>Sign In now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <OverlayLoader isLoading={props.SignUpState.isCreateActionLoading} />
    </SafeAreaView>
  );
};
const mapStateToProps = (state: any) => ({
  SignUpState: state.SignUpState,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    CreateAccount: (params: any) => dispatch(AC_CreateAccount(params)),
    ResetCreateAccount: () => dispatch(AC_ResetCreateAccount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
