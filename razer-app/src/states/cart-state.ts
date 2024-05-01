import { atom } from "recoil";
import { Product } from "../models/product";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

// Define el estado del carrito
export const cartState = atom<{ [productId: number]: { product: Product; quantity: number } }>({
  key: "cartState",
  default: {}, // El carrito comienza vacío
  effects_UNSTABLE: [persistAtom],
});
