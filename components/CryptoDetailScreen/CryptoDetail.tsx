import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { getDetailCryptoByID } from "../../api/api";
import { ApiResponseCryptoID } from "../../interfaces/api";
import { CryptoDetail } from "../../interfaces/crypto";
import { stylesCryptoDetail } from "./styles";
import Loader from "../Loader/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CryptoDetailScreen = ({ route }: { route: any }) => {
  const { currency } = route.params;
  const [crypto, setCryptoDetail] = useState<CryptoDetail | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchCryptoDetail = async () => {
      try {
        const coinsResponse: ApiResponseCryptoID = await getDetailCryptoByID(
          currency.id
        );
        setCryptoDetail(coinsResponse.data);
      } catch (error) {
        console.error("Error fetching crypto detail", error);
      }
    };

    fetchCryptoDetail();
  }, []);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem("favorites");
        let favoritesData: CryptoDetail[] = favoritesString
          ? JSON.parse(favoritesString)
          : [];
        const isCryptoFavorite = favoritesData.some(
          (item) => item.id === crypto?.id
        );
        setIsFavorite(isCryptoFavorite);
      } catch (error) {
        console.error("Error checking favorite status", error);
      }
    };

    checkFavoriteStatus();
  }, [crypto]);

  if (!crypto) {
    return (
      <View>
        <Loader />
      </View>
    );
  }

  const handleToggleFavorite = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      let updatedFavorites: CryptoDetail[] = favoritesString
        ? JSON.parse(favoritesString)
        : [];

      if (isFavorite) {
        updatedFavorites = updatedFavorites.filter(
          (item) => item.id !== crypto.id
        );
      } else {
        updatedFavorites.push(crypto);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites", error);
    }
  };

  return (
    <View style={stylesCryptoDetail.container}>
      <Image
        source={{ uri: crypto.image || "" }}
        style={stylesCryptoDetail.image}
      />
      <Text style={stylesCryptoDetail.title}>
        {crypto.name} ({crypto.symbol.toUpperCase()})
      </Text>
      <Text style={stylesCryptoDetail.price}>${crypto.price}</Text>
      <TouchableOpacity
        style={[
          stylesCryptoDetail.favoriteButton,
          isFavorite
            ? stylesCryptoDetail.removeFavoriteButton
            : stylesCryptoDetail.addFavoriteButton,
        ]}
        onPress={handleToggleFavorite}
        testID="favoriteButton"
      >
        <Text style={stylesCryptoDetail.favoriteButtonText}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CryptoDetailScreen;
