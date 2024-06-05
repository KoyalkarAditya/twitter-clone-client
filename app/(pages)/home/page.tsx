"use client";
import { FeedCard } from "@/components/FeedCard";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import { useCallback, useState } from "react";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { graphqlClient } from "@/clients/api";
import { getSignedURLForTheTweetQuery } from "@/graphql/queries/tweet";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
interface GetSignedURLResponse {
  getSignedURLForTweet: string;
}

export default function Home() {
  const { user } = useCurrentUser();
  if (!user) {
    redirect("/");
  }
  console.log(user, "  curr user obbbbbbbb");
  const [imageURL, setImageURL] = useState("");
  const handleImageChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);

      if (!file) {
        return;
      }
      const { getSignedURLForTweet } =
        await graphqlClient.request<GetSignedURLResponse>(
          getSignedURLForTheTweetQuery,
          {
            imageName: file.name,
            imageType: file.type,
          }
        );
      if (getSignedURLForTweet) {
        toast.loading("Uploading...", {
          id: "image",
        });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      toast.success("upload completed", {
        id: "image",
      });
      const url = new URL(getSignedURLForTweet);
      const myFilePath = `${url.origin}${url.pathname}`;
      setImageURL(myFilePath);
    };
  }, []);
  const [content, setContent] = useState("");
  const { tweets = [], isLoading } = useGetAllTweets();
  const { mutate } = useCreateTweet();
  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    const handlerFn = handleImageChangeFile(input);
    input.addEventListener("change", handlerFn);
    input.click();
  }, []);
  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
      imageURL,
    });
    setImageURL("");
    setContent("");
  }, [content, mutate, imageURL]);

  return (
    <div className="col-span-9 grid grid-cols-9">
      {" "}
      <div className=" col-span-9 sm:col-span-6  border-gray-600 border-r-[1px] border-l-[1px]">
        <div>
          <div className=" grid grid-cols-12 p-5 gap-2 hover:bg-gray-900 hover:bg-opacity-40 transition-all  border-gray-900 border-b-[1px] border-t-[1px]">
            <div className=" col-span-1">
              {user.profileImageURL ? (
                <Image
                  width={50}
                  height={50}
                  src={user.profileImageURL}
                  alt="profile-pic"
                  className=" rounded-full"
                />
              ) : (
                <FiUser className="text-3xl" />
              )}
            </div>
            <div className="col-span-11">
              <textarea
                value={content}
                name=""
                placeholder="What is Happening?!"
                className=" bg-transparent w-full text-xl border-b border-gray-600"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              {imageURL && (
                <Image
                  src={imageURL}
                  alt="Tweet image"
                  width={300}
                  height={300}
                />
              )}
              <div className=" flex justify-between p-3 items-center">
                <div>
                  <CiImageOn
                    onClick={handleSelectImage}
                    className="text-xl cursor-pointer"
                  />
                </div>
                <div>
                  <button
                    onClick={handleCreateTweet}
                    className=" bg-[#1d9bf0] font-semibold py-1 px-4 rounded-full cursor-pointer"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tweets.map((tweet) =>
          tweet ? (
            <FeedCard key={tweet?.id} data={tweet} currUserId={user.id} />
          ) : null
        )}
      </div>
      <div className=" hidden sm:block col-span-3 p-3  border-gray-600 border-r-[1px] border-l-[1px]">
        <h1 className=" my-2 text-2xl text-center font-bold mb-3">
          Users you may know
        </h1>
        {user?.recommendedUsers?.map((el) => (
          <div
            className=" flex items-center gap-3 mt-3 ml-5 bg-slate-800 rounded-full px-3 py-2"
            key={el?.id}
          >
            {el?.profileImageURL && (
              <Image
                src={el?.profileImageURL}
                alt="profile-image"
                height={60}
                width={60}
                className=" rounded-full"
              />
            )}
            <div>
              <div className=" text-lg">
                {el?.firstName} {el?.lastName}
              </div>{" "}
              <Link
                href={`/${el?.id}`}
                className=" px-5 py-1 text-sm bg-white text-black border-2 border-slate-300 rounded-full"
              >
                view
              </Link>
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  );
}
