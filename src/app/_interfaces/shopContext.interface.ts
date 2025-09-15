import { CartProduct } from "./cartProduct.interface";
import { IwhishlistItem } from "./wishlistItem.iterface";

export interface ShopContextType {
  cart: CartProduct[];
  wishlist: IwhishlistItem[];
  cartCount: number;
  wishlistCount: number;

  refreshCart: () => Promise<void>;
  refreshWishlist: () => Promise<void>;

  addCartItem: (id: string) => Promise<void>;
  removeCartItem: (id: string) => Promise<void>;
  updateCartItem: (id: string, count: number) => Promise<void>;

  addWishlistItem: (id: string) => Promise<void>;
  removeWishlistItem: (id: string) => Promise<void>;
}
