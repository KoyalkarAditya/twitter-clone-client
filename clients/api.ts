"use client";
import { GraphQLClient } from "graphql-request";
export const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_URL as string,
  {
    headers: () => ({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
  }
);
