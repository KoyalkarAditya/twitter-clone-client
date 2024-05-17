import { FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { PiBookmarkSimple } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { FeedCard } from "@/components/FeedCard";
import { CiCircleMore } from "react-icons/ci";
import { BiMoney } from "react-icons/bi";
export default function HomePage() {
  interface TwitterSidebarButton {
    title: string;
    icon: React.ReactNode;
  }
  const sideBarMenuItem: TwitterSidebarButton[] = [
    {
      title: "Home",
      icon: <GoHomeFill />,
    },
    {
      title: "Explore",
      icon: <CiSearch />,
    },
    {
      title: "Notifications",
      icon: <IoNotificationsOutline />,
    },
    {
      title: "Messages",
      icon: <HiOutlineMail />,
    },
    {
      title: "BookMarks",
      icon: <PiBookmarkSimple />,
    },
    {
      title: "Profile",
      icon: <CiUser />,
    },
    {
      title: "Blue",
      icon: <BiMoney />,
    },
    {
      title: "More",
      icon: <CiCircleMore />,
    },
  ];
  return (
    <div>
      <div className=" grid grid-cols-12 h-screen w-screen px-40">
        <div className=" col-span-3  justify-start   pr-4">
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
        </div>
        <div className=" col-span-6  border-gray-600 border-r-[1px] border-l-[1px]">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className=" col-span-3"></div>
      </div>
    </div>
  );
}
