import { Image, View } from "react-native";
import { stylesLoader } from "./styles";

const loadingGif = require("../../assets/loadingPicture.gif");

export default function Loader() {
  return (
    <View style={stylesLoader.container} testID="loader-container">
      <Image
        testID="loading-gif"
        source={loadingGif}
        style={[stylesLoader.loadingGif]}
        resizeMode="contain"
      />
    </View>
  );
}
