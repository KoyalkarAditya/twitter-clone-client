export const createTweetMutation = `#graphql
  mutation CreateTweet($payload: createTweetData) {
    createTweet(payload: $payload) {
      id
    }
  }
`;
