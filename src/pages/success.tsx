import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { Header } from "../components/Header";
import { stripe } from "../lib/stripe";
import { ImageListContainer, ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProsp {
  customerName: string;
  products: [{
    name: string;
    imageUrl: string;
  }]
}

export default function Success({ customerName, products }: SuccessProsp) {

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Header buttons={false} />

      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImageListContainer>
          {products.map(item => (
            <ImageContainer key={item.name}>
              <Image src={item.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImageListContainer>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length > 1 ? `${products.length} camisetas` : `${products.length} camiseta`} já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const products = session.line_items.data.map(item => {
    const { name, images } = item.price.product as Stripe.Product
    return {
      name,
      imageUrl: images[0]
    }
  })
  return {
    props: {
      customerName,
      products
    }
  }
}