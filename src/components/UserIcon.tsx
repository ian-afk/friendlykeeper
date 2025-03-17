import React from "react";

interface UserIconProps {
  icon: string | React.ReactNode;
}
export default function UserIcon({ icon }: UserIconProps) {
  return (
    <div className="rounded-full bg-gray-500 h-10 w-10 aspect-square flex justify-center items-center">
      {icon}
    </div>
  );
}
