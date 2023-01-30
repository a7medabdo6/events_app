import React from "react";
import { TextInput } from "react-native";
import { darkGreen } from "./Constants";

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 10,
        color: "black",
        paddingHorizontal: 5,

        width: "100%",
        backgroundColor: "rgb(220,220, 220)",
        marginVertical: 10,
        paddingVertical: 10,
      }}
      placeholderTextColor={"grey"}
    ></TextInput>
  );
};

export default Field;
