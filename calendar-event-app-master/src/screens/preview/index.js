import { useIsFocused } from "@react-navigation/native";
import React, { Fragment, useEffect, useState } from "react";
import { Alert, Dimensions, Image, View } from "react-native";
import { WebView } from "react-native-webview";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Preview({ navigation, route }) {
  const isFocused = useIsFocused();
  const doc = route.params.doc;
  useEffect(() => {
    console.log(doc, "docdoc");
  }, [doc]);
  const PdfReader = ({ url: uri }) => (
    <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />
  );

  return (
    <Fragment>
      <SafeAreaView style={{ height: "100%", width: "100%" }}>
        {doc?.[0]?.typeOfFile.includes("image") ? (
          <Image
            source={{
              uri: `http://207.154.251.59/api/public/${doc?.[0]?.doc}`,
            }}
            style={{
              width: "100%",
              height: "100%",
              borderWidth: 1,
              borderColor: "red",
            }}
          />
        ) : (
          <View>
            <PdfReader
              url={`http://207.154.251.59/api/public/${doc?.[0]?.doc}`}
            />
          </View>
        )}
      </SafeAreaView>
    </Fragment>
  );
}
