import React from "react" ;
import SearchInput from "./sidebar/SearchInput";
import Conversations from "./sidebar/Conversations";
import LogoutButton from "./sidebar/LogoutButton";
const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col ">
      <SearchInput />
      <div className="divider px-3"> </div>
      <Conversations />
      {/* <Conversations />
      <LogoutButton /> */}
      <LogoutButton />
    </div>
  );
};
export default Sidebar ;

