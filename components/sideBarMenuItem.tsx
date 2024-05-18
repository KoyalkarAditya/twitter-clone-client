import React from "react";
import { GoHomeFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { PiBookmarkSimple } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { CiCircleMore } from "react-icons/ci";
import { BiMoney } from "react-icons/bi";

export const sideBarMenuItem: TwitterSidebarButton[] = [
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
interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}
