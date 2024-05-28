import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Product } from "../models/product";

const { persistAtom } = recoilPersist();

export interface CartItem {
  product: Product;
  quantity: number;
}

export const cartState = atom<Record<number, CartItem>>({
  key: "cartState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
