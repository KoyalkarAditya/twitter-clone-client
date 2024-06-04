import { graphqlClient } from "@/clients/api";
import { CreateTweetData, Tweet } from "@/gql/graphql";
import {
  createTweetMutation,
  deleteTweetMutation,
} from "@/graphql/mutations/tweet";

import { getAllTweetsQuery } from "@/graphql/queries/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAllTweets = () => {
  const { data, isLoading } = useQuery<{ getAllTweets: Tweet[] }>({
    queryKey: ["all-tweets"],
    queryFn: () => graphqlClient.request(getAllTweetsQuery),
  });
  return { tweets: data?.getAllTweets, isLoading };
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      graphqlClient.request(createTweetMutation, { payload }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      toast.success("Tweet Created Successfully", { id: "1" });
    },
    onMutate: () => toast.loading("Creating Tweet", { id: "1" }),
  });
  return mutation;
};

export const useDeleteTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (tweetId: string) => {
      graphqlClient.request(deleteTweetMutation, { tweetId });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      toast.success("Tweet Deleted Successfully", { id: "2" });
    },
    onMutate: () => toast.loading("Deleting Tweet", { id: "2" }),
  });
  return mutation;
};
