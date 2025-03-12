import { IoFilterOutline } from "react-icons/io5";
export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md border-b border-gray-200 z-50 flex justify-between p-4">
      <div>
        <h1 className="font-bold">Friendly Keeper</h1>
      </div>
      <div>
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
