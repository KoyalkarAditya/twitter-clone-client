"use client";
import { sideBarMenuItem } from "@/components/sideBarMenuItem";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";

const HomeLayout: React.FC<TwitterHomeLayoutProps> = ({ children }) => {
  const { user } = useCurrentUser();

  return (
    <div>
      <div className=" grid grid-cols-12 h-screen w-screen px-3 sm:px-40">
        <div className="col-span-2  flex justify-end   sm:pr-4 relative">
          <div>
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
                    <span className=" hidden sm:flex text-xl ">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="w-[90%] font-semibold rounded-full ml-2 sm:p-3  mt-4 bg-[#1d9bf0] hover:bg-[#1a8cd8]">
                Post
              </button>
            </div>
            <div className="absolute flex gap-2  bottom-5 items-center p-3 ">
              {user?.profileImageURL && (
                <Image
                  className=" rounded-full"
                  src={user.profileImageURL}
                  alt="profile"
                  width={50}
                  height={50}
                />
              )}
              <div className=" hidden sm:block">
                <h3 className=" text-sm font-semibold">
                  {user?.firstName} {user?.lastName}
                </h3>
                <h3 className=" text-sm">@{user?.lastName}</h3>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

interface TwitterHomeLayoutProps {
  children: React.ReactNode;
}

export default HomeLayout;
