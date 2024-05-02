import { atom } from "recoil";
import { Product } from "../models/product";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const cartState = atom<{ [productId: number]: { product: Product; quantity: number } }>({
  key: "cartState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
