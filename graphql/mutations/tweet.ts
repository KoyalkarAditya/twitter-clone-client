export const createTweetMutation = `#graphql
  mutation CreateTweet($payload: createTweetData) {
    createTweet(payload: $payload) {
      id
    }
  }
`;
export const deleteTweetMutation = `#graphql
mutation deleteTweet($tweetId : String)
{
   deleteTweet(tweetId: $tweetId)
}
`;

export const updateLikeMutation = `#graphql
mutation updateLike($tweetId: String) {
  updateLike(tweetId: $tweetId)
}

`;
