import React, { FC } from "react";
import { TextInput, View } from "react-native";
import { SearchInputProps } from "../../interfaces/search";
import { stylesSearchInput } from "./styles";

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={stylesSearchInput.container}>
      <TextInput
        style={stylesSearchInput.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        testID="search-input"
      />
    </View>
  );
};

export default SearchInput;
