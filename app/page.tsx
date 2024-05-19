"use client";
import { FaXTwitter } from "react-icons/fa6";
import { FeedCard } from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { sideBarMenuItem } from "@/components/sideBarMenuItem";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SampleFeedCard } from "@/components/FeedCard/SampleFeed";
export default function Home() {
  const { user } = useCurrentUser();
  if (user) {
    redirect("/home");
  }
  const queryClient = useQueryClient();
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error(`Google Token not found`);
      }
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );
      toast.success("Verification Success");
      if (verifyGoogleToken) {
        localStorage.setItem("token", verifyGoogleToken);
      }
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    []
  );
  return (
    <div>
      <div className=" grid grid-cols-12 h-screen w-screen px-40">
        <div className=" col-span-3  justify-start   pr-4 relative">
          <div className="h-fit cursor-pointer w-fit ml-2 text-3xl  hover:bg-gray-800 transition-all rounded-full p-2">
            <FaXTwitter />
          </div>
          <div className=" my-4  pr-4">
            <ul>
              {sideBarMenuItem.map((item, index) => (
                <li
                  key={index}
                  className={`flex justify-start w-fit items-center mt-2 gap-4  hover:bg-gray-800  px-4 py-2 rounded-full cursor-pointer ${
                    index == 0 ? "font-semibold" : "font-normal"
                  }`}
                >
                  <span className=" text-3xl">{item.icon}</span>
                  <span className=" text-xl ">{item.title}</span>
                </li>
              ))}
            </ul>
            <button className=" w-[90%] font-semibold rounded-full p-3  mt-4 bg-[#1d9bf0] hover:bg-[#1a8cd8]">
              Post
            </button>
          </div>
          {user && (
            <div className="absolute flex gap-2  bottom-5 items-center p-3 ">
              <Image
                className=" rounded-full"
                src={
                  "https://pbs.twimg.com/profile_images/1788655525196070913/UFnOzVKB_400x400.jpg"
                }
                alt="profile"
                width={50}
                height={50}
              />

              <div>
                <h3 className=" text-base font-semibold">Koyalkar Aditya</h3>
                <h3 className=" text-sm">@koyalkaaditya</h3>
              </div>
            </div>
          )}
        </div>
        <div className=" col-span-6  border-gray-600 border-r-[1px] border-l-[1px]">
          <SampleFeedCard />
          <SampleFeedCard />
          <SampleFeedCard />
          <SampleFeedCard />
        </div>
        {!user && (
          <div className=" col-span-3">
            <div className=" flex h-screen justify-center items-center flex-col p-5 text-center rounded-lg gap-10 ">
              <h1 className=" text-2xl font-extrabold">New to Twitter/X ?</h1>
              <div className=" flex justify-center">
                <FaXTwitter className=" text-8xl text-center" />
              </div>
              <div className=" flex justify-center">
                <GoogleLogin onSuccess={handleLoginWithGoogle} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
