import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { Quicksand } from "next/font/google";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";
const quicksand = Quicksand({
  subsets: ["latin"],
});
interface FeedCardProps {
  data: Tweet;
}
export const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
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
            <div>
              <CiHeart />
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
