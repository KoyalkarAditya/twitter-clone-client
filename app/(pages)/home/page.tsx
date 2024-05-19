"use client";
import { FeedCard } from "@/components/FeedCard";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import { useCallback, useState } from "react";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
export default function Home() {
  const { user } = useCurrentUser();
  if (!user) {
    redirect("/");
  }
  const [content, setContent] = useState("");
  const { tweets = [], isLoading } = useGetAllTweets();
  const { mutate } = useCreateTweet();
  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);
  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
  }, [content, mutate]);

  return (
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
        tweet ? <FeedCard key={tweet?.id} data={tweet} /> : null
      )}
    </div>
  );
}
