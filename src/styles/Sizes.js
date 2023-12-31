import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const defaultWidthSizes = {
  16: "4.25",
  17: "4.4",
  18: "4.8",
  20: "5.2",
  22: "5.7",
  24: "6.2",
  30: "7.8",
  40: "10.4",
  50: "12.9",
  54: "13.75",
  60: "15.4",
  70: "18",
  120: "30.6",
  140: "35.7",
};

const defaultHeightSizes = {
  16: "2.15",
  17: "2.25",
  18: "2.35",
  20: "2.6",
  22: "2.9",
  24: "3.1",
  120: "15.35",
};

const fontSizes = {
  4: "4",
  6: "5",
  7: "6",
  10: "9",
  11: "10",
  12: "11",
  13: "12",
  14: "12.5",
  15: "13",
  16: "14",
  17: "15",
  18: "16",
  20: "18",
  21: "19",
  22: "20",
  23: "21",
  24: "21.5",
  30: "27",
  32: "29",
  44: "39",
};

export const wSizes = (value) => {
  let convertedSize = 0;
  if (value != "" && defaultWidthSizes[value]) {
    convertedSize = Math.trunc(widthPercentageToDP(defaultWidthSizes[value]));
  }
  return convertedSize;
};

export const hSizes = (value) => {
  let convertedSize = 0;
  if (value != "" && defaultHeightSizes[value]) {
    convertedSize = Math.trunc(heightPercentageToDP(defaultHeightSizes[value]));
  }
  return convertedSize;
};

export const spacing = (value) => {
  let convertedSize = 0;
  if (value != "" && fontSizes[value]) {
    convertedSize = RFValue(Math.trunc(fontSizes[value]));
  }
  return convertedSize;
};

export const ftSize = (value) => {
  let convertedSize = 0;
  if (value != "" && fontSizes[value]) {
    convertedSize = RFValue(Math.trunc(fontSizes[value]));
  }
  return convertedSize;
};
