import Image from "next/image"
import { CartItemContainer, ImageContainer } from "../styles/components/cartitem"

import { useShoppingCart } from 'use-shopping-cart'
import { CartEntry } from "use-shopping-cart/core";

interface CartItemProps {
  product: CartEntry;
}

export function CartItem({ product }: CartItemProps) {
  const { removeItem } = useShoppingCart()

  return (
    <CartItemContainer>
      < ImageContainer >
        <Image src={product.imageUrl} width={100} height={100} alt="" />
      </ImageContainer >

      <div className="item-details">
        <h2>{`${product.quantity} x ${product.name}`}</h2>
        <span>{product.formattedPrice}</span>
        <button onClick={() => removeItem(product.id)}>Remover</button>
      </div>
    </CartItemContainer >
  )
}