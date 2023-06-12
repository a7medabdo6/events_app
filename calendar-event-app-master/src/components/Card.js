import React, { Fragment, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";
import DropDownPicker from "react-native-dropdown-picker";

import CalendarStrip from "react-native-calendar-strip";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Task } from "@calendar/components";
import { useStore } from "@calendar/store";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "./Checkbox";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  taskListContent: {
    height: 100,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#2196f3",
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewTask: {
    position: "absolute",
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: "#2196f3",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2196f3",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
  deleteButton: {
    backgroundColor: "blue",
    width: 100,
    height: 38,
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 5,
    justifyContent: "center",
  },
  updateButton: {
    backgroundColor: "#2196f3",
    width: 100,
    height: 38,
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 20,
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#979797",
    alignSelf: "center",
    marginVertical: 20,
  },
  notesContent: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#979797",
    alignSelf: "center",
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: "#F8D557",
    justifyContent: "center",
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: "#2196f3",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: "#4CD565",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: "#5DD976",
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    height: 475,
    width: 327,
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#2196f3",
    backgroundColor: "#ffffff",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
});

export default function Home({ user }) {
  console.log(user?.Docs, "user?.Docs");
  const [todoListForCash, setTodoListForCash] = useState([
    "Executed Contract",
    "Escrow Receipt",
    "Inspection Period",
    "Closing",
  ]);
  const [todoListForFinancing, setTodoListForFinancing] = useState([
    "Financing",
    "Executed contract",
    "Escrow Receipt",
    "Inspection Period",
    "Appraisal",
    "Survey",
    "Full Loan Approval",
    "Closing",
  ]);
  const [Items, setItems] = useState([
    { label: "Cash", value: "Cash" },
    { label: "Financing", value: "Financing" },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const navigation = useNavigation();
  return (
    <Fragment>
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            // height: Dimensions.get("window").height - 170,
          }}
        >
          <ScrollView
            style={{ height: "100%" }}
            contentContainerStyle={{
              paddingBottom: 20,
              height: "100%",
            }}
          >
            <View
              style={{
                paddingVertical: 10,
                // marginTop: 15,
                width: "85%",
                alignSelf: "center",
                height: 150,
                zIndex: 555,
                // backgroundColor: "red",
              }}
            >
              <DropDownPicker
                open={open}
                value={value}
                items={Items}
                // dropDownContainerStyle={{
                //   // height: 150,
                //   zIndex: 5555,
                // }}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{
                  marginVertical: 10,
                  width: "100%",
                  alignSelf: "center",
                }}
              />
            </View>

            {value == "Cash" &&
              todoListForCash.map((item) => (
                <TouchableOpacity
                  key={1}
                  onPress={() =>
                    user?.Docs?.filter((docitem) => docitem.type == item)
                      ?.length > 0
                      ? null
                      : navigation.push("upload", { item, user })
                  }
                  style={styles.taskListContent}
                >
                  <View
                    style={{
                      marginLeft: 13,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {/* <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: "#2196f3",
                        marginRight: 8,
                      }}
                    /> */}
                      {/* <Checkbox /> */}
                      <AntDesign
                        name="checkcircleo"
                        size={24}
                        // color="#2196f3"
                        color={
                          user?.Docs?.filter((docitem) => docitem.type == item)
                            ?.length > 0
                            ? "#2196f3"
                            : "grey"
                        }
                        style={{ marginRight: 8 }}
                      />
                      <Text
                        style={{
                          color: "#554A4C",
                          fontSize: 20,
                          fontWeight: "700",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 20,
                        }}
                      >
                        {/* <Text
                          style={{
                            color: "#BBBBBB",
                            fontSize: 14,
                            marginRight: 5,
                          }}
                        >
                          01/01/2023
                        </Text>
                        <Text
                          style={{
                            color: "#BBBBBB",
                            fontSize: 14,
                          }}
                        >
                          {"this is first survey for john"}
                        </Text> */}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 80,
                      width: 5,
                      backgroundColor: "red",
                      borderRadius: 5,
                    }}
                  />
                </TouchableOpacity>
              ))}
            {value == "Financing" &&
              todoListForFinancing.map((item) => (
                <TouchableOpacity
                  key={1}
                  onPress={() =>
                    user?.Docs?.filter((docitem) => docitem.type == item)
                      ?.length > 0
                      ? null
                      : navigation.push("upload", { item, user })
                  }
                  style={styles.taskListContent}
                >
                  <View
                    style={{
                      marginLeft: 13,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <AntDesign
                        name="checkcircleo"
                        size={24}
                        // color="#2196f3"
                        color={
                          user?.Docs?.filter((docitem) => docitem.type == item)
                            ?.length > 0
                            ? "#2196f3"
                            : "grey"
                        }
                        style={{ marginRight: 8 }}
                      />
                      <Text
                        style={{
                          color: "#554A4C",
                          fontSize: 20,
                          fontWeight: "700",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 20,
                        }}
                      >
                        {/* <Text
                          style={{
                            color: "#BBBBBB",
                            fontSize: 14,
                            marginRight: 5,
                          }}
                        >
                          01/01/2023
                        </Text> */}
                        {/* <Text
                          style={{
                            color: "#BBBBBB",
                            fontSize: 14,
                          }}
                        >
                          {"this is first survey for john"}
                        </Text> */}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 80,
                      width: 5,
                      backgroundColor: "red",
                      borderRadius: 5,
                    }}
                  />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Fragment>
  );
}
