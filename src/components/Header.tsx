import Image from "next/image";
import { HeaderContainer } from "../styles/components/header";
import { Handbag } from "phosphor-react";

import { useShoppingCart, CartActions } from "use-shopping-cart";

import logoImg from '../assets/logo.svg'
import Link from "next/link";

interface HeaderProps {
  buttons?: boolean;
}
export function Header({ buttons = true }: HeaderProps) {
  const { cartCount, handleCartClick, } = useShoppingCart()

  return (
    <HeaderContainer style={{ justifyContent: buttons ? 'space-between' : 'center' }}>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
      {buttons &&
        <button onClick={() => handleCartClick()}>
          <Handbag fill="bold" size={24} />
          {cartCount > 0 && <div>{cartCount}</div>}
        </button>
      }


    </HeaderContainer>
  )
}