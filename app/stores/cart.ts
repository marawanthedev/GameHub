// stores/cart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
};

type CartState = {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addToCart: (item) =>
                set((state) => ({ items: [...state.items, item] })),
            removeFromCart: (id: number) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }));
            },
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
        }
    )
);
