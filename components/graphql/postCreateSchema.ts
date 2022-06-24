import { gql } from '@apollo/client'


const createPost = gql`mutation Mutation($title: String!, $body: String!, $userId: ID!) {
    createdPost(title: $title, body: $body, userID: $userId) {
      postID
      title
      body
      createdAt
    }
  }
  
  `




const updatePost = gql`
mutation Mutation($postId: String!, $title: String, $body: String) {
  updatedPost(postID: $postId, title: $title, body: $body) {
    postID
    title
    body
    createdAt
  }
}
`
export {
  createPost, updatePost
}