import React, { useContext, useEffect, useState } from "react";
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

} from "react-native";



import Icon from "../../../common/Icons";
import Color from "../../../styles/Color";
import Fonts from "../../../styles/Fonts";


import SignInStyles from "./styles";
import CustomInput from "../../../components/CustomInput";

import CustomButton from "../../../components/CustomButton/CustomButton";
import { Controller, useForm } from "react-hook-form";
import { ftSize, wSizes } from "../../../styles/Sizes";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { AC_DoLogin, AC_ResetLoader } from "../../../actions/Auth/SignIn";
import { useAndroidBackNavigationEffect } from "../../../common/UseBackHandler";
import OverlayLoader from "../../../components/OverlayLoader";


interface ISignInScreen {
  DoLogin: (params: any) => void;
  ResetLoader:()=>{};
  SignInState: any;
}

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const USERNAME_REGEX=/^[a-zA-Z0-9.@/+\-_]+$/;


const SignInScreen: React.FC<ISignInScreen> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: '', 
      password: '', 
    },
  });

  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigation = useNavigation();




 

  const onSignInPressed = (data?: any) => {
    props.DoLogin(data);

  
  };

  const onForgotPasswordPressed = () => {
  };
 
  useEffect(() => {
    if (props?.SignInState?.isLoggedIn) {
      navigation.navigate("HomeScreen");
      reset()
      setPasswordShown(false)
     
        props.ResetLoader()
      
    }
  }, [props.SignInState.isLoggedIn]);
  
  const backAction = () => {
    return true;
  };
  useAndroidBackNavigationEffect(backAction);


  
  return (
    <View style={{ ...SignInStyles.container }}>
      <StatusBar backgroundColor={Color.statusBarColor} />

      <View style={{ ...SignInStyles.innerContainer }}>
        <View style={{ ...SignInStyles.logoContainer }}>
        <Image
            source={require("../../../assets/images/Logo1.png")}
            style={{
              width: wSizes(120),
              height: wSizes(120),
              resizeMode: "contain",
            }}
          />

          <Text style={{ ...SignInStyles.logoText }}>SparkSupport</Text>
        </View>
    
        <CustomInput
          name="username"
          placeHolder={"Username"}
         
          control={control}
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username should minimum 3 characters",
            },
            pattern:{
              value:USERNAME_REGEX,
              message:"Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters."
            }
          }}
          secureTextEntry={false}
        />
        <CustomInput
          name="password"
          placeHolder={"Password"}
          control={control}
          secureTextEntry={true}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be minimum 8 characters",
            },
            pattern:{
              value: PASSWORD_REGEX,
              message: "Password must be combination of both numeric and alphabet",
            }
          }}
          showPassword={passwordShown}
          changeShowPassword={() => setPasswordShown(!passwordShown)}
        />
        <CustomButton
          onPress={onForgotPasswordPressed}
          text={"Forgot Password?"}
          type="TERTIARY"
          containerStyle={{
            width: "auto",
            alignSelf: "flex-end",
            alignItems: "flex-end",
            paddingLeft: 3,
            paddingTop: 8,
          }}
          innerTextStyle={{
            color: Color.fontColor,
            fontFamily: Fonts.medium,
          }}
        />
        <CustomButton
          onPress={handleSubmit(onSignInPressed)}
          text={loading ? "Signing In" : "SignIn"}
          containerStyle={{ backgroundColor: Color.btnColor }}
        />
         <View style={{...SignInStyles.signupPromptContainer}}>
        <Text style={{...SignInStyles.signupPromptText}}>New to SparkSupport?</Text>
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate("SignUpScreen");
                
              }}
        >
          <Text style={{...SignInStyles.signupLinkText}}>Sign up now</Text>
        </TouchableOpacity>
      </View>
      </View>
   
      <OverlayLoader isLoading={props.SignInState.isLoading} />
    
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  SignInState: state.SignInState,

});

const mapDispatchToProps = (dispatch: any) => {
  return {
    DoLogin: (params: any) => dispatch(AC_DoLogin(params)),
    ResetLoader:()=> dispatch(AC_ResetLoader())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
