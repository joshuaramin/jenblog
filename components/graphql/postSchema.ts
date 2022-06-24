import { gql } from '@apollo/client'


const getBlogID = gql`
  query PostID($postId: ID!) {
  postID(postID: $postId) {
    postID
    title
    body
    createdAt
  }
}
`

const views = gql`
query View {
  view {
    postID
    title
    body
    createdAt
  }
}
`

const blogQuery = gql`query PostQuery($limit: Int!, $offset: Int!) {
  postQuery(limit: $limit, offset: $offset) {
    postID
    title
    createdAt
  }
}
`

const blogSub = gql`subscription PostSubscription {
    postSubscription {
      postID
      title
      body
      createdAt
    }
  }`

const blogDeleteQuery = gql`
mutation Mutation($postId: ID!) {
  deletedPost(postID: $postId) {
    postID
    title
    body
    createdAt
  }
}
`

export {
  blogDeleteQuery, blogQuery, blogSub, getBlogID, views
}