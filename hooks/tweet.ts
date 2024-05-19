import { graphqlClient } from "@/clients/api";
import { Tweet } from "@/gql/graphql";
import { getAllTweetsQuery } from "@/graphql/queries/tweet";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTweets = () => {
  const { data, isLoading } = useQuery<{ getAllTweets: Tweet[] }>({
    queryKey: ["all-tweets"],
    queryFn: () => graphqlClient.request(getAllTweetsQuery),
  });
  return { tweets: data?.getAllTweets, isLoading };
};
