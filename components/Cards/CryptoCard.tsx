import React from "react";
import { Text, View } from "react-native";
import { Crypto } from "../../interfaces/crypto";
import { stylesCryptoCard } from "./styles";

const CryptoCard: React.FC<Crypto> = React.memo(({ id, name, symbol }) => {
  return (
    <View style={stylesCryptoCard.container}>
      <Text style={stylesCryptoCard.symbol} numberOfLines={1}>
        {symbol}
      </Text>
      <Text style={stylesCryptoCard.sep}> - </Text>
      <Text
        style={stylesCryptoCard.name}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </View>
  );
});

export default CryptoCard;
