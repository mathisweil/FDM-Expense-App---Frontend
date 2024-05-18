import Image from "next/image";
import Link from "next/link";
import UpdateUserDetails from "@/Components/UpdateUser";
import { getUser } from "@/lib/usersAPI";
import { formatPermission } from "@/lib/formatUtils";

export default async function Post({ params }: { params: { userID: number } }) {
  const details = await getUser(params.userID);

  return (
    <div className="bg-gray-100 md:p-[5%]">
      <div className="bg-white shadow-md rounded p-[20px]">
        <Link href="/ADMIN/view_users">
          <Image
            src="/back.svg"
            alt="Back"
            width={26}
            height={26}
            className="mb-2"
          />
        </Link>
        <div className="flex justify-between">
          <h2 className="text-xl">
            {details
              ? details.first_name + " " + details.last_name
              : "User Name"}
          </h2>
          <h1 className="text-xl font-semibold">
            {details ? formatPermission(details.permission) : "User Role"}
          </h1>
          <h2 className="text-xl">
            {details ? details.employee_id : "Employee ID"}
          </h2>
        </div>
        <hr className="border-3 border-black"></hr>
        <UpdateUserDetails details={details} />
      </div>
    </div>
  );
}
