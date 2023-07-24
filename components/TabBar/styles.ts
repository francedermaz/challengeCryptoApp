import { StyleSheet } from "react-native";

export const stylesTabBar = StyleSheet.create({
  container: {
    backgroundColor: "#19171A",
    flexDirection: "row",
    height: 55,
    borderTopWidth: 0.2,
    borderTopColor: "#4b146b"
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
    textAlign: "center",
  },
});
