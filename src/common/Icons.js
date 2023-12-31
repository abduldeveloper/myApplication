import PropTypes from "prop-types";
import React, { Component } from "react";
import { Platform } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import Fontisto from "react-native-vector-icons/Fontisto";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";

export default class Icon extends Component {
  UNSAFE_componentWillMount() {
    switch (this.props.family) {
      case "AntDesign":
        this.Icon = AntDesign;
        break;
      case "Entypo":
        this.Icon = Entypo;
        break;
      case "Feather":
        this.Icon = Feather;
        break;
      case "FontAwesome":
        this.Icon = FontAwesome;
        break;
      case "FontAwesome5":
        this.Icon = FontAwesome5;
        break;
      case "FontAwesome5Pro":
        this.Icon = FontAwesome5Pro;
        break;
      case "Fontisto":
        this.Icon = Fontisto;
        break;
      case "Foundation":
        this.Icon = Foundation;
        break;
      case "Ionicons":
        this.Icon = Ionicons;
        break;
      case "MaterialCommunityIcons":
        this.Icon = MaterialCommunityIcons;
        break;
      case "MaterialIcons":
        this.Icon = MaterialIcons;
        break;
      case "Octicons":
        this.Icon = Octicons;
        break;
      case "SimpleLineIcons":
        this.Icon = SimpleLineIcons;
        break;
      case "Zocial":
        this.Icon = Zocial;
        break;
      default:
        this.Icon = AntDesign;
    }
  }

  render() {
    const color = { color: this.props.color ? this.props.color : "black" };
    const { style } = this.props;
    return (
      <this.Icon
        family={this.props.family}
        name={this.props.name}
        size={this.props.size}
        style={[color, style]}
      />
    );
  }
  static propTypes = {
    family: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    size: Platform.OS === "ios" ? 30 : 25,
  };
}
