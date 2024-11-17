const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow p-4">
        <h1 className="text-lg font-semibold">Hello User</h1>
        <p>Have a great day at work. Happy Working!</p>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
