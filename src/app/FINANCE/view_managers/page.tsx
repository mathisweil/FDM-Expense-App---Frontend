import { getUsers } from "@/lib/usersAPI";
import ViewUsers from "@/components/ViewUsers";
import { User } from "@/types/User";

export default async function ManagerList() {
  const permission = "FINANCE";
  const users: User[] = await getUsers(permission, 0); //change specifier

  return (
    <div className="flex flex-col gap-2">
      <ViewUsers users={users} admin={false} />
    </div>
  );
}
