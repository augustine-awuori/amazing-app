const EmptyStateIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-base-100 text-gray-500 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center">No Chats Yet</h2>
        <p className="text-lg mt-2">You don't have any chats yet.</p>
      </div>
    </div>
  );
};

export default EmptyStateIndicator;
