import { CartContainer, ClearBagButton, CloseButon, FinishBuyButton } from "../styles/components/cart";
import { useShoppingCart } from 'use-shopping-cart'
import { X } from 'phosphor-react';
import { CartItem } from "./CartItem";
import { useState } from "react";
import axios from "axios";
import { CartEntry } from "use-shopping-cart/core";

interface PriceData {
  priceId: string;
}

export function Cart() {
  const { cartDetails, handleCloseCart, shouldDisplayCart, cartCount, formattedTotalPrice, clearCart, redirectToCheckout } = useShoppingCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleFinish() {
    if (cartCount > 0) {
      try {
        setIsCreatingCheckoutSession(true)

        let cartItems = Object.entries(cartDetails).map(item => {
          const [key, product] = item;
          const { priceId } = product.price_data as PriceData
          return {
            price: priceId,
            quantity: product.quantity
          }
        })

        const response = await axios.post('/api/checkout', {
          items: cartItems
        })

        const { checkoutUrl } = response.data

        clearCart()

        window.location.href = checkoutUrl
      } catch (err) {
        //conectar com uma ferramenta de observabilidade(Datadog / Sentry)
        setIsCreatingCheckoutSession(false)
        alert('Falha ao redirecionar ao checkout!')
      }
    }
  }

  return (
    <CartContainer className={`${shouldDisplayCart ? 'active' : ''}`}>
      <CloseButon onClick={() => handleCloseCart()}>
        <X size={24} fill="bold" />
      </CloseButon>
      <h1>Sacola de compras</h1>
      <div className="list">
        {
          Object.entries(cartDetails).map(item => {
            const [key, product] = item;
            return <CartItem key={product.id} product={product} />
          })
        }
      </div>
      <footer>
        <div className="cart-details">
          <div className="item">
            <span>Quantidade</span>
            <span>{cartCount} itens</span>
          </div>
          <div className="item">
            <span>Valor total</span>
            <span className="price">{formattedTotalPrice}</span>
          </div>
        </div>
        <FinishBuyButton disabled={isCreatingCheckoutSession} onClick={handleFinish}>Finalizar compra</FinishBuyButton>
        <ClearBagButton disabled={isCreatingCheckoutSession} onClick={() => clearCart()}>Esvazia sacola</ClearBagButton>
      </footer>
    </CartContainer>
  )
}