import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Product } from "../models/product";

const { persistAtom } = recoilPersist();

export interface WishlistItem {
  product: Product;
  quantity: number;
}

export const wishlistState = atom<Record<number, WishlistItem>>({
  key: "wishlistState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
