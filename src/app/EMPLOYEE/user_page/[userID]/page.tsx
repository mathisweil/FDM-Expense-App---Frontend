import UserPage from "@/Components/UserPage";
import { getUser } from "@/lib/usersAPI";

export default async function User({ params }: { params: { userID: number } }) {
  const user = await getUser(params.userID);

  return (
    <div className="bg-gray-200 flex flex-col md:grid md:grid-cols-2 gap-3 p-3">
      <UserPage user={user} />
    </div>
  );
}
