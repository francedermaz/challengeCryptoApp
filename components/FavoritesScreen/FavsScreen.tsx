import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Crypto } from "../../interfaces/crypto";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/root";
import CryptoCard from "../Cards/CryptoCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesFavsScreen } from "./styles";
import SearchInput from "../Search/SearchInput";

const FavsScreen = () => {
  const [favorites, setFavorites] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const fetchFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      const favoritesData: Crypto[] = favoritesString
        ? JSON.parse(favoritesString)
        : [];
      setFavorites(favoritesData);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const handleCurrencyPress = (currency: Crypto) => {
    navigation.navigate("CryptoDetail", { currency });
  };

  const renderCurrencyItem = ({ item }: { item: Crypto }) => (
    <TouchableOpacity
      style={stylesFavsScreen.currencyItem}
      onPress={() => handleCurrencyPress(item)}
    >
      <CryptoCard id={item.id} name={item.name} symbol={item.symbol} />
    </TouchableOpacity>
  );

  const filteredCurrencies = favorites.filter((currency) => {
    const nameMatch = currency.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const symbolMatch = currency.symbol
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return nameMatch || symbolMatch;
  });

  return (
    <View style={stylesFavsScreen.container} testID="favs-screen">
      <View style={stylesFavsScreen.searchContainer}>
        {favorites.length > 0 && (
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search cryptos..."
          />
        )}
      </View>
      {favorites.length === 0 ? (
        <Text style={stylesFavsScreen.message}>
          Start adding your favorite cryptos!
        </Text>
      ) : filteredCurrencies.length === 0 ? (
        <View style={stylesFavsScreen.noResultContainer}>
          <Text style={stylesFavsScreen.noResultText}>
            Sorry, no matching results
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCurrencies}
          renderItem={renderCurrencyItem}
          keyExtractor={(item) => item.id}
          style={stylesFavsScreen.list}
        />
      )}
    </View>
  );
};

export default FavsScreen;
