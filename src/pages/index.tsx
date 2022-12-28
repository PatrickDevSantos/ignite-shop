import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { Handbag } from "phosphor-react";

import { useShoppingCart } from 'use-shopping-cart'
import { Product as IProduct } from "./product/[id]";
import { Header } from "../components/Header";

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  const { addItem } = useShoppingCart()

  function handleAddToCart(product: IProduct) {
    addItem(
      {
        name: product.name,
        description: product.description,
        id: product.id,
        price: product.price,
        currency: 'BRL',
        imageUrl: product.imageUrl
      },
      {
        count: 1,
        price_metadata: {
          priceId: product.defaultPriceId
        }
      }
    )
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <Header />
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Product key={product.id} className="keen-slider__slide">
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.formattedPrice}</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>
                  <Handbag fill="bold" size={32} color="white" />
                </button>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      defaultPriceId: price.id,
      formattedPrice: price.unit_amount ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100) : null
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2
  }
}
