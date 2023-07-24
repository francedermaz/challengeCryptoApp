import { StyleSheet } from "react-native";

export const stylesLoader = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10000,
    backgroundColor: "#000000c0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "70%",
  },
  loadingGif: {
    width: "40%",
  },
});
