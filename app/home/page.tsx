"use client";
import { FaXTwitter } from "react-icons/fa6";
import { FeedCard } from "@/components/FeedCard";
import { useCurrentUser } from "@/hooks/user";
import { sideBarMenuItem } from "@/components/sideBarMenuItem";
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
              {user && user.profileImageURL && (
                <Image
                  className=" rounded-full"
                  src={user.profileImageURL}
                  alt="profile"
                  width={50}
                  height={50}
                />
              )}
              <div>
                <h3 className=" text-base font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
                <h3 className=" text-sm">@{user.lastName}</h3>
              </div>
            </div>
          )}
        </div>
        <div className=" col-span-6  border-gray-600 border-r-[1px] border-l-[1px]">
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
      </div>
    </div>
  );
}
