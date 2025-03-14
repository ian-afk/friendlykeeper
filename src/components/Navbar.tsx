import { IoFilterOutline } from "react-icons/io5";
export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md border-b border-gray-200 z-10 flex justify-between px-4 py-5">
      <div className="flex gap-2">
        <div className="h-4 w-14">
          <img src="/stfu.png" alt="" />
        </div>
        <div className="mt-2">
          <h1 className="font-bold">STFU - Schedule Task, Focus Up</h1>
        </div>
      </div>
      <div className="mt-2">
        <ul>
          <li className="flex items-center gap-2">
            <span className="text-lg">
              <IoFilterOutline />
            </span>
            <span className="font-semibold">Filters</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
