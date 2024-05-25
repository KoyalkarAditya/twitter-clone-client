"use client";
import { GraphQLClient } from "graphql-request";
export const graphqlClient = new GraphQLClient(
  "https://dlmhhkuuorh14.cloudfront.net/graphql",
  {
    headers: () => ({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
  }
);
