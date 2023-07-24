import { StyleSheet } from "react-native";

export const stylesCryptoDetail = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#fff",
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
    color: "#fff",
  },
  favoriteButton: {
    marginTop: 200,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  favoriteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  removeFavoriteButton: {
    backgroundColor: "#33085c",
  },
  addFavoriteButton: {
    backgroundColor: "#5a189a",
  },
});
