"use client";
import { useParams, useRouter } from "next/navigation";
import { FeedCard } from "@/components/FeedCard";

import { Tweet } from "@/gql/graphql";
import { useGetUserById } from "@/hooks/user";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import { ProfileImgSVG } from "@/components/UserProfileSVG";
import Link from "next/link";
import Page404 from "@/components/Page404";
import Loader from "@/app/loading";

export default function ProfilePage() {
  const params = useParams();

  const { id } = params;

  const { user, isLoading } = useGetUserById(id as string);
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
      </div>
      <div>
        {user?.tweets?.map((tweet) => (
          <FeedCard data={tweet as Tweet} key={tweet?.id} />
        ))}
      </div>
    </div>
  );
}
