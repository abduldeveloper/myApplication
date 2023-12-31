import React, { useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  TouchableOpacity,
  Animated,
} from "react-native";
import Lottie from "lottie-react-native";
import Color from "../../styles/Color";

const CustomModal = ({ title, visible }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  return (
    <Modal visible={visible} animationType="none" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Animated.View
          style={{
            backgroundColor: Color.BgColor,
            minHeight: 330,
            minWidth: 330,
            opacity: fadeAnim,
            borderRadius: 16,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          }}
        >
        

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Lottie
              source={require("../../assets/lottieFieJson/Tick.json")}
              autoPlay
              loop
              style={{ height: 170 }}
            />
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              color: Color.white,
              marginTop: 15,
            }}
          >
            {title}
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomModal;
