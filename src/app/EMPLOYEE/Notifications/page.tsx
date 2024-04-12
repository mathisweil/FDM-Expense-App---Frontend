import Header from "@/Components/Header";
import ViewNotifications from "@/Components/ViewNotifications";
import { fetchNotifications } from "@/lib/fetchNotifications";

export default async function Notifications({ params }: { params: { userID: string } }) {
  const notifications = await fetchNotifications(params.userID);
  
  return (
    <div className="md:px-4">
      <Header title="Notifications" style="my-2" />
      <ViewNotifications notifications={notifications} />
    </div>
  );
};
