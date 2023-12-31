import React,{useEffect,useRef,forwardRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SignInScreen from './src/screens/Auth/SignInScreen/SignInScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen/Dashboard';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { Provider } from "react-redux";
import { store } from './src/store/store';
import Toast, { BaseToast } from 'react-native-toast-message';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
const App  =()=>{

  const Stack = createStackNavigator();


  return(
    <>
     <Provider store={store}>
     <NavigationContainer>

<Stack.Navigator
    screenOptions={{headerShown: false}}
    >
     <Stack.Screen name="SplashScreen" component={SplashScreen}/>
     <Stack.Screen name="SignInScreen" component={SignInScreen}/>
     <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> 
     <Stack.Screen name="HomeScreen" component={HomeScreen} /> 
     


  </Stack.Navigator>

</NavigationContainer>
<Toast />
     </Provider>
     
    </>
  )
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
