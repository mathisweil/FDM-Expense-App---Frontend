import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { User } from "@/types/User";
import { formatPermission } from "@/lib/formatUtils";

interface UserCardProps {
  details: User;
  admin: boolean;
}

const UserCard = ({
  details: {
    employee_id,
    first_name,
    last_name,
    permission,
    email,
    phone,
    address,
    postcode,
    city,
    country,
    account_number,
    sort_code,
    tax_code,
  },
  admin,
}: UserCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded hover:scale-[1.01] transition-transform duration-300 hover:shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-2 py-3 w-full"
      >
        <div className="flex justify-between items-center text-lg md:text-xl grow">
          <h2 className="w-[47%] md:w-[30%] text-left">
            {first_name} {last_name}
          </h2>
          <h1 className="font-semibold w-[42%] md:w-[40%]">{formatPermission(permission)}</h1>
          <h2 className="w-[8%] md:w-[30%] text-right">{employee_id}</h2>
        </div>
        <Image
          src={`/${isOpen ? "drop_up" : "drop_down"}.svg`}
          alt="Arrow"
          width={26}
          height={26}
          className="ml-1"
        />
      </button>
      <div className={`${isOpen ? "" : "hidden"} flex flex-col mb-3 mx-2`}>
        <div className="flex justify-between text-left mt-1 py-3 overflow-y-auto gap-4 whitespace-nowrap">
          <div>
            <h2 className="font-medium">First Name</h2>
            <p>{first_name}</p>
            <h2 className="font-medium">Last Name</h2>
            <p>{last_name}</p>
          </div>
          <div>
            <h2 className="font-medium">Email</h2>
            <p>{email}</p>
            <h2 className="font-medium">Address</h2>
            <p>
              {address}, {city}, {postcode}, {country}
            </p>
          </div>
          <div>
            <h2 className="font-medium">Phone Number</h2>
            <p>{phone}</p>
            <h2 className="font-medium">Tax Code</h2>
            <p>{tax_code}</p>
          </div>
          <div>
            <h2 className="font-medium">Bank Details</h2>
            <h3 className="font-bold text-xs">Account Number</h3>
            <p>{account_number}</p>
            <h3 className="font-bold text-xs">Sort Code</h3>
            <p>{sort_code}</p>
          </div>
        </div>
        {admin && (
          <Link
            href={`/ADMIN/view_users/${employee_id}`}
            className="py-1 rounded-lg text-center bg-fdm-gradient text-white hover:scale-[1.005] transition-transform duration-300 hover:shadow w-full"
            passHref
          >
            Update Details
          </Link>
        )}
      </div>
    </div>
  );
};
export default UserCard;
