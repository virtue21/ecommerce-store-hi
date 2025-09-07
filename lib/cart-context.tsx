"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from "react"
import type { Product } from "@/lib/mock-data"

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number; selectedSize?: string; selectedColor?: string } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

interface CartContextType {
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addItem: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, selectedSize, selectedColor } = action.payload
      const itemId = `${product.id}-${selectedSize || ""}-${selectedColor || ""}`

      const existingItemIndex = state.items.findIndex((item) => item.id === itemId)

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += quantity
        return { ...state, items: updatedItems }
      } else {
        const newItem: CartItem = {
          id: itemId,
          product,
          quantity,
          selectedSize,
          selectedColor,
        }
        return { ...state, items: [...state.items, newItem] }
      }
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }

    case "CLEAR_CART":
      return { ...state, items: [] }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }

    case "OPEN_CART":
      return { ...state, isOpen: true }

    case "CLOSE_CART":
      return { ...state, isOpen: false }

    case "LOAD_CART":
      return { ...state, items: action.payload }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = useCallback((product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity, selectedSize, selectedColor } })
  }, [])

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } })
  }, [])

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id)
      } else {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
      }
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" })
  }, [])

  const toggleCart = useCallback(() => {
    dispatch({ type: "TOGGLE_CART" })
  }, [])

  const openCart = useCallback(() => {
    dispatch({ type: "OPEN_CART" })
  }, [])

  const closeCart = useCallback(() => {
    dispatch({ type: "CLOSE_CART" })
  }, [])

  const getTotalItems = useCallback(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }, [state.items])

  const getTotalPrice = useCallback(() => {
    return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }, [state.items])

  const value: CartContextType = {
    state,
    dispatch,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getTotalItems,
    getTotalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
