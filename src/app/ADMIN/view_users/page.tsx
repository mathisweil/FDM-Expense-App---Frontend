import ViewUsers from "@/components/ViewUsers";
import { User } from "@/types/User";
import { getUsers } from "@/lib/usersAPI";

export default async function UserList() {
  const permission = "ADMIN";

  const users: User[] = await getUsers(permission, 0);

  return (
    <div className="flex flex-col gap-2">
      <ViewUsers users={users} admin={true} />
    </div>
  );
}
