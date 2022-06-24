import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { ApolloProvider, ApolloClient, InMemoryCache, split, HttpLink, } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import Cookie from 'js-cookie'
import { GetServerSideProps } from 'next'

const uploadLink = createUploadLink({
  uri: process.env.production,
  credentials: "include",
  headers: {
    'Apollo-Require-Preflight': 'true',
  }
})


const webSocketLink = typeof window !== "undefined" ? new GraphQLWsLink(createClient({
  url: "wss://blogapies.herokuapp.com/graphql",
  keepAlive: 10 * 60 * 60 * 1000
})) : null


webSocketLink ? console.log("Connected") : console.log("DISCONNECTED")
const splitLink = typeof window !== "undefined" && webSocketLink !== null ? split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  )
}, webSocketLink, uploadLink) : uploadLink


export const client = new ApolloClient({
  link: splitLink,
  headers: {
    'content-type': 'application/json'
  },
  cache: new InMemoryCache({
  })
})



export const getServerSideProps: GetServerSideProps = async (context) => {

  const token = Cookie.get("access_token")
  if (token) {
    return {
      props: {
        permanent: false,
        destination: "/dashboard"
      }
    }
  }

  return {
    props: {
      permanent: false,
      destination: "/"
    }
  }
}
export function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp

