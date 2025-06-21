// stores/cart.ts
import { create } from 'zustand';

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
};

type CartState = {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
};

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addToCart: (item) =>
        set((state) => ({ items: [...state.items, item] })),
}));
