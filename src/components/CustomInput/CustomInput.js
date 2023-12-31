import React from "react";
import { Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

import Icon from "../../common/Icons";
import Color from "../../styles/Color";
import { ftSize, wSizes, spacing } from "../../styles/Sizes";
import TextStyles from "../../styles/TextStyle";

const CustomInput = ({
  control,
  name,
  rules = {},
  placeHolder,
  secureTextEntry,
  showPassword = false,
  changeShowPassword = () => {},
  keyboardType = "default",
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : Color.lightBlue },
            ]}
          >
            {secureTextEntry ? (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeHolder}
                style={styles.input}
                secureTextEntry={!showPassword}
                placeholderTextColor={Color.fontColor}
                autoCapitalize={"none"}
              />
            ) : (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeHolder}
                style={styles.input}
                secureTextEntry={false}
                placeholderTextColor={Color.fontColor}
                autoCapitalize={"none"}
                keyboardType={keyboardType}
              />
            )}
            {secureTextEntry ? (
              <TouchableOpacity
                onPress={() => changeShowPassword()}
                style={{
                  height: wSizes(30),
                  width: wSizes(30),
                  position: "absolute",
                  top: spacing(10),
                  right: spacing(16),
                  zIndex: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  family="MaterialCommunityIcons"
                  name={!showPassword ? "eye-off-outline" : "eye-outline"}
                  color={Color.darkBlue}
                  size={25}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    borderColor: Color.gray1,
    borderWidth: 1,
    borderRadius: 12,
    // paddingHorizontal: 10,
    // marginVertical: 5,
    // padding: 10,
    height: wSizes(54), //54
    marginVertical: 5,
  },
  input: {
    ...TextStyles.textRegular,
    height: wSizes(54), //54,
    textAlignVertical: "center",
    backgroundColor: Color.White,
    borderRadius: 5,
    paddingHorizontal: 16,
    color: Color.fontColor,
    fontSize: 14,
  },
});

export default CustomInput;
