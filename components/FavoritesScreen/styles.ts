import { StyleSheet } from "react-native";

export const stylesFavsScreen = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  message: {
    color: "#EDEDED",
  },
  noResultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  currencyItem: {
    padding: 16,
    borderWidth: 0.25,
    borderColor: "#e4c1f9",
    backgroundColor: "#11111D",
    borderRadius: 10,
    marginBottom: 10,
  },
  searchContainer: {
    width: "100%",
    paddingHorizontal: 0,
    paddingTop: 16,
  },
});
