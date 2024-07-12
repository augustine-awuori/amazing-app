import { useNotifications } from "../hooks";

const NotificationsPage = () => {
  const { notifications } = useNotifications();

  return (
    <div className="container mx-auto max-w-3xl px-4">
      <h1>Notifications</h1>
    </div>
  );
};

export default NotificationsPage;
