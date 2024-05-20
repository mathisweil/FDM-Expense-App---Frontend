import Header from "@/components/Header";
import ViewNotifications from "@/components/ViewNotifications";
import { getNotifications } from "@/lib/notificationAPI";

export default async function Notifications({
  params,
}: {
  params: { userID: number };
}) {
  const notifications = await getNotifications(params.userID);

  return (
    <div className="md:px-4">
      <Header title="Notifications" style="my-2" />
      <ViewNotifications notifications={notifications} />
    </div>
  );
}
