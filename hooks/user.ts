import { graphqlClient } from "@/clients/api";
import { User } from "@/gql/graphql";
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/queries/user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const query = useQuery<{ getCurrentUser: User }>({
    queryKey: ["current-user"],
    queryFn: () => graphqlClient.request(getCurrentUserQuery),
  });

  return { ...query, user: query.data?.getCurrentUser };
};

export const useGetUserById = (id: string) => {
  const query = useQuery<{ getUserById: User }>({
    queryKey: ["get-user-by-id"],
    queryFn: () =>
      graphqlClient.request(getUserByIdQuery, {
        id,
      }),
  });
  return { ...query, user: query?.data?.getUserById };
};
