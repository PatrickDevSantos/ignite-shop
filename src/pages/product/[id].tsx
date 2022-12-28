import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { Header } from '../../components/Header'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetail } from '../../styles/pages/product'

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number,
  description: string;
  defaultPriceId: string;
  formattedPrice: string;
}

interface ProductProps {
  product: Product;
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()

  function handleAddToCart(product: Product) {
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
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <Header />
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetail>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>
          <p>{product.description}</p>
          <button onClick={() => handleAddToCart(product)}>Comprar agora</button>
        </ProductDetail>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id,
        formattedPrice: price.unit_amount ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100) : null,
      }
    },
    revalidate: 60 * 60 * 1
  }
}