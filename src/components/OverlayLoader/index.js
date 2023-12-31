import React from "react";
import { ActivityIndicator, View } from "react-native";

import Color from "../../styles/Color";

const OverlayLoader = (props) => {
  if (!props.isLoading) return null;
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.42)",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color={Color.brownDark} size={"large"} />
    </View>
  );
};

export default OverlayLoader;
