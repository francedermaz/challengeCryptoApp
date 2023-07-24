import { Crypto, CryptoDetail } from "./crypto";

export interface ApiResponseCryptos {
  data: Crypto[];
}

export interface ApiResponseCryptoID {
  data: CryptoDetail;
}