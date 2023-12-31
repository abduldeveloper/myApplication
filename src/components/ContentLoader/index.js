import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Color from "../../styles/Color";

const ContentLoader = (props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={70} color={Color.brownDark} />
      {props.loadingText && props.loadingText != "" ? (
        <Text style={{ color: Color.MainColor, fontWeight: "bold" }}>
          {props.loadingText}
        </Text>
      ) : null}
    </View>
  );
};

export default ContentLoader;
