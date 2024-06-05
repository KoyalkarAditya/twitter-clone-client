import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { Quicksand } from "next/font/google";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { useUpdateLike } from "@/hooks/tweet";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

const quicksand = Quicksand({
  subsets: ["latin"],
});
interface FeedCardProps {
  data: Tweet;
  currUserId?: String;
}
export const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data, currUserId } = props;
  const queryClient = useQueryClient();
  const { mutate } = useUpdateLike();

  const likedByCurrUser = useMemo(() => {
    return data.likes?.findIndex((user) => user.id == currUserId);
  }, [data]);

  const handleUpdateLike = useCallback(
    (id: string) => {
      mutate(id);
      queryClient.invalidateQueries(["current-user"] as InvalidateQueryFilters);
    },
    [likedByCurrUser, data]
  );

  return (
    <div>
      <div className=" grid grid-cols-12 p-5 gap-2 hover:bg-gray-900 hover:bg-opacity-40 transition-all cursor-pointer border-gray-900 border-b-[1px] border-t-[1px]">
        <div className=" col-span-1">
          {data.author?.profileImageURL && (
            <Image
              width={50}
              height={50}
              src={data.author?.profileImageURL}
              alt="profile-pic"
              className=" rounded-full"
            />
          )}
        </div>
        <div className="col-span-11">
          <Link href={`/${data.author?.id}`} className="">
            {data.author?.firstName} {data.author?.lastName}
          </Link>
          <p>{data.content}</p>
          {data.imageURL && (
            <Image
              src={data.imageURL}
              alt="Tweet image"
              width={400}
              height={400}
            />
          )}
          <div
            className={`${quicksand.className} flex w-[90%] justify-between mt-5 text-lg text-slate-500 font-semibold `}
          >
            <div>
              <FaRegComment />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div className=" flex gap-1 items-center">
              <div
                className={`${likedByCurrUser != -1 ? "text-red-800 " : ""}`}
              >
                <CiHeart onClick={() => handleUpdateLike(data.id)} />
              </div>
              <div className=" text-sm">{data.likes.length}</div>
            </div>
            <div>
              <CiBookmark />
            </div>
            <div>
              <GoUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
