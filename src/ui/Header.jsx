// import React from 'react'
import SearchOrder from "../features/order/SearchOrder";
import { Link } from "react-router-dom";
import UserName from "../features/user/UserName";
export default function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-500 border-b border-stone-200 p-7">
      <Link className="tracking-[5px] uppercase sm:px-6" to="/menu">
        Fast React Pizza Go
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}
