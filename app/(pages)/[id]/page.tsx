"use client";
import { useParams } from "next/navigation";
import { FeedCard } from "@/components/FeedCard";

import { Tweet } from "@/gql/graphql";
import { useCurrentUser, useGetUserById } from "@/hooks/user";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import { ProfileImgSVG } from "@/components/UserProfileSVG";
import Link from "next/link";
import Page404 from "@/components/Page404";
import Loader from "@/app/loading";
import { useCallback, useMemo } from "react";
import { graphqlClient } from "@/clients/api";
import { InvalidateQueryFilters, QueryKey } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutations/user";

export default function ProfilePage() {
  const params = useParams();
  const { id } = params;
  const queryClient = useQueryClient();
  const { user, isLoading } = useGetUserById(id as string);
  const { user: currUser } = useCurrentUser();

  const amIFollowing = useMemo(() => {
    return (
      currUser?.following?.findIndex((el) => el?.id == user?.id) ?? -1 >= 0
    );
  }, [currUser, user]);
  const handleFollowUser = useCallback(async () => {
    await graphqlClient.request(followUserMutation, {
      to: user?.id,
    });
    queryClient.invalidateQueries([
      "current-user",
      "get-user-by-id",
    ] as InvalidateQueryFilters);
  }, [user?.id, queryClient]);

  const handleUnfollowUser = useCallback(async () => {
    await graphqlClient.request(unfollowUserMutation, {
      to: user?.id,
    });
    queryClient.invalidateQueries([
      "current-user",
      "get-user-by-id",
    ] as InvalidateQueryFilters);
  }, [user?.id, queryClient]);

  if (isLoading) {
    return <Loader />;
  }
  if (!user) {
    return <Page404 />;
  }
  console.log(user);
  return (
    <div className=" col-span-9 sm:col-span-6  border-gray-600 border-r-[1px] border-l-[1px]">
      <nav className=" flex p-2">
        <Link href={"/home"}>
          <BsArrowLeftShort className=" text-3xl" />
        </Link>
        <div className=" ml-5">
          <div className=" font-bold text-xl">
            {user?.firstName} {user?.lastName}
          </div>
          <div className=" text-slate-600 text-sm">
            {user?.tweets?.length} posts
          </div>
        </div>
      </nav>
      <div className=" border-b-[1px] border-gray-600  mt-5 ml-3">
        {user?.profileImageURL ? (
          <Image
            className=" rounded-full"
            src={user?.profileImageURL}
            alt=""
            width={100}
            height={100}
          />
        ) : (
          <ProfileImgSVG />
        )}{" "}
        <div className=" mt-5 font-bold text-xl">
          {user?.firstName} {user?.lastName}
        </div>
        <div className=" text-slate-600 text-sm">@{user?.email}</div>
        <div className=" flex  gap-10 justify-between mr-5">
          <div className=" flex my-1 gap-5 text-sm text-slate-600 items-center mx-5">
            <span>
              <b className=" font-bold text-white">{user.followers?.length}</b>{" "}
              followers
            </span>
            <span>
              <b className=" font-bold text-white">{user.following?.length}</b>{" "}
              following
            </span>
          </div>
          {currUser?.id !== user.id && (
            <>
              {!amIFollowing ? (
                <button
                  onClick={handleUnfollowUser}
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 font-bold text-sm  text-white focus:outline-none  bg-transparent rounded-full border   focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700  border-gray-600 hover:bg-gray-900"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={handleFollowUser}
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 font-bold text-sm  text-white focus:outline-none  bg-transparent rounded-full border   focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700  border-gray-600 hover:bg-gray-900"
                >
                  Follow
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div>
        {user?.tweets?.map((tweet) => (
          <FeedCard data={tweet as Tweet} key={tweet?.id} />
        ))}
      </div>
    </div>
  );
}
