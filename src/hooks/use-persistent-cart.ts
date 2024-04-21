import { Work } from "../payload-types";
import { create } from "zustand";
import {
    createJSONStorage,
    persist,
  } from 'zustand/middleware'


  
  export type CartItem = {
    work: Work
  }
  
  type CartState = {
    contents: CartItem[]
    addItem: (work: Work) => void
    removeItem: (workId: string) => void
    clearCart: () => void
  }
  
  export const useCart = create<CartState>()(
    persist(
      (set) => ({
        contents: [],
        addItem: (work) =>
          set((state) => {
            return { contents: [...state.contents, { work }] }
          }),
        removeItem: (id) =>
          set((state) => ({
            contents: state.contents.filter(
              (content) => content.work.id !== id
            ),
          })),
        clearCart: () => set({ contents: [] }),
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
  

