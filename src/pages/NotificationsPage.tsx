import { useNotifications } from "../hooks";

const NotificationsPage = () => {
  useNotifications();

  const Content = () => (
    <section className="flex flex-col items-center justify-center min-h-screen bg-neutral text-center text-white rounded-sm">
      <p className="text-2xl mb-4">You don't have any notifications yet</p>
    </section>
  );

  return (
    <div className="container mx-auto max-w-3xl px-4">
      <Content />
    </div>
  );
};

export default NotificationsPage;
