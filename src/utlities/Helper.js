import React from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const storeLocalData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getLocalData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
    // if (value !== null) {
    //   // value previously stored
    // }
  } catch (e) {
    // error reading value
  }
};

export const clearAllLocalData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

export const retrieveLocalData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    // error retrieving data
  }
};
export const infoDialog = (
    title,
    description,
    callbackSuccess = () => {},
    onlySuccess = false,
    callbackFailure = () => {},
    successBtnText = "OK",
    failureBtnText = "Cancel"
  ) => {
    Alert.alert(title, description, [
      { text: successBtnText, onPress: () => callbackSuccess() },
      !onlySuccess && {
        text: failureBtnText,
        onPress: () => callbackFailure(),
        style: "cancel",
      },
    ]);
  };