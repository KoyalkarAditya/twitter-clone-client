import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { Quicksand } from "next/font/google";
const quicksand = Quicksand({
  subsets: ["latin"],
});
export const SampleFeedCard: React.FC = () => {
  return (
    <div>
      <div className=" grid grid-cols-12 p-5 gap-2 hover:bg-gray-900 hover:bg-opacity-40 transition-all cursor-pointer border-gray-900 border-b-[1px] border-t-[1px]">
        <div className=" col-span-1">
          <Image
            width={50}
            height={50}
            src={
              "https://pbs.twimg.com/profile_images/1788655525196070913/UFnOzVKB_400x400.jpg"
            }
            alt="profile-pic"
            className=" rounded-full"
          />
        </div>
        <div className="col-span-11">
          <h5 className="">Koyalkar Aditya</h5>
          <p>
            Just had the most amazing cup of coffee . Its like a hug in a
            mug.CoffeeLover #MorningFuel
          </p>

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
