import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import Fonts from "../../styles/Fonts";
import TextStyles from "../../styles/TextStyle";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
  containerStyle = {},
  innerTextStyle = {},
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
        containerStyle,
      ]}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
          innerTextStyle,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 12,
  },
  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },
  container_TERTIARY: {},
  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },
  text: {
    ...TextStyles.body,
    fontFamily: Fonts.bold,
    // fontWeight: "bold",
    color: "white",
  },
  text_TERTIARY: {
    color: "grey",
  },
  text_SECONDARY: {
    color: "#3B71F3",
  },
});

export default CustomButton;
