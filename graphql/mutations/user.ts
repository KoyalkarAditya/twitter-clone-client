export const followUserMutation = `#graphql
mutation FollowUser($to: ID!) {
  followUser(to: $to)
}
`;

export const unfollowUserMutation = `#graphql
mutation UnFollowUser($to: ID!) {
 unfollowUser(to: $to)
}

`;
