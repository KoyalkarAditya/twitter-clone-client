import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query verifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);
export const getCurrentUserQuery = `#graphql 
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageURL
      email
      firstName
      lastName
      tweets
      {
        id 
        content
        imageURL
        author {
          firstName,
          lastName,
          profileImageURL
        }
      }
    }
  }
`;
export const getUserByIdQuery = `#graphql
query GetUserById($id : ID!){
  getUserById(id : $id){
      id
      profileImageURL
      email
      firstName
      lastName
      tweets
      {
        id 
        content
        imageURL
        author {
          id
          firstName,
          lastName,
          profileImageURL
        }
      }
}
}
`;
