import { Crypto } from "../interfaces/crypto";

export type RootStackParamList = {
  YourScreen: Crypto | undefined;
  CryptoDetail: { currency: Crypto };
};
