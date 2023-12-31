import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, StatusBar, Alert ,SafeAreaView} from 'react-native';
import ThemeStyle from '../../styles/ThemeStyle';
import * as Progress from 'react-native-progress';
import {
  useNavigation,
  StackActions,
  CommonActions,
  useRoute,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../../styles/Color';
import { getLocalData } from '../../utlities/Helper';
import { LINKS } from '../../utlities/ApiConfig';
import { AC_SaveApiToken, AC_SaveDashboardList, AC_UserName } from '../../actions/Auth/SignIn';
import axios from 'axios';

export default function SplashScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    let oldToken = await getLocalData("appLogToken");
    if (oldToken != null && oldToken != undefined) {  

      axios
        .get(LINKS.dashboard, {
          headers: {
            Authorization: `Bearer ${oldToken}`,
          },
        })
        .then((response) => {
          dispatch(AC_SaveApiToken(oldToken));
          dispatch(AC_SaveDashboardList(response.data));

          setTimeout(() => {
            navigation.navigate("HomeScreen");
          }, 1000);
        })
        .catch((error) => {
          setTimeout(() => {
            navigation.navigate("SignInScreen");
          }, 1000);

          
        });
    } else {
      setTimeout(() => {
        navigation.navigate("SignInScreen");
      }, 1000);
    }
  };
  return (
    <SafeAreaView style={ThemeStyle.pageContainer}>
      <StatusBar backgroundColor={Color.statusBarColor} />

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <LogoWithName /> */}
        <View>
          <Progress.CircleSnail
            color={[Color.green]}
            size={130}
            thickness={6}
            indeterminate={true}
            style={{
              position: 'absolute',
              top: 8,
              right: 10,
            }}
            direction="clockwise"
          />
          <Image
            source={require("../../assets/images/Logo1.png")}
            style={{width: 150, height: 150, resizeMode: 'contain'}}
          />
         
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomeTxt: {
    fontSize: 27,
    fontFamily: ThemeStyle.semiBold,
    color: '#FFF',
  },
  imgSty: {
    width: 300,
    height: 200,
  },
});
