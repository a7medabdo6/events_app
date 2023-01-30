import React from "react";
import { View, ImageBackground } from "react-native";

const Background = ({ children }) => {
  return (
    <View style={{ width: "100%", backgroundColor: "#2196f3" }}>
      <View
        style={{
          position: "absolute",
          width: "100%",
          backgroundColor: "#2196f3",
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default Background;
