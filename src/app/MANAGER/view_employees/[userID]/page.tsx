import { getUsers } from "@/lib/usersAPI";
import ViewUsers from "@/Components/ViewUsers";
import { User } from "@/types/User";

export default async function EmployeeList({
  params,
}: {
  params: { userID: number };
}) {
  const permission = "MANAGER";

  const users: User[] = await getUsers(permission, params.userID); //change specifier

  return (
    <div className="flex flex-col gap-2">
      <ViewUsers users={users} admin={false} />
    </div>
  );
}
