import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { getListOfCoins } from "../../api/api";
import { Crypto } from "../../interfaces/crypto";
import { ApiResponseCryptos } from "../../interfaces/api";
import { stylesHomeScreen } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/root";
import CryptoCard from "../Cards/CryptoCard";
import SearchInput from "../Search/SearchInput";

const HomeScreen = () => {
  const [currencies, setCurrencies] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const coinsResponse: ApiResponseCryptos = await getListOfCoins();
        setCurrencies(coinsResponse.data);
      } catch (error) {
        setError("Failed to fetch cryptos. Check your Rate Limit at Coingecko");
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencyPress = (currency: Crypto) => {
    navigation.navigate("CryptoDetail", { currency });
  };

  const renderCurrencyItem = ({ item }: { item: Crypto }) => (
    <TouchableOpacity
      style={stylesHomeScreen.currencyItem}
      onPress={() => handleCurrencyPress(item)}
    >
      <CryptoCard id={item.id} name={item.name} symbol={item.symbol} />
    </TouchableOpacity>
  );

  const filteredCurrencies = currencies.filter((currency) => {
    const nameMatch = currency.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const symbolMatch = currency.symbol
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return nameMatch || symbolMatch;
  });

  return (
    <View style={stylesHomeScreen.container} testID="home-screen">
      <View style={stylesHomeScreen.searchContainer}>
        {currencies.length > 0 && (
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search cryptos..."
          />
        )}
      </View>
      {error ? (
        <View style={stylesHomeScreen.errorContainer} testID="error-container">
          <Text style={stylesHomeScreen.errorText}>{error}</Text>
        </View>
      ) : filteredCurrencies.length === 0 ? (
        <View style={stylesHomeScreen.noResultContainer}>
          <Text style={stylesHomeScreen.noResultText}>
            Sorry, no matching results
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCurrencies}
          renderItem={renderCurrencyItem}
          keyExtractor={(item) => item.id}
          style={stylesHomeScreen.list}
          testID="currency-list"
        />
      )}
    </View>
  );
};

export default HomeScreen;
