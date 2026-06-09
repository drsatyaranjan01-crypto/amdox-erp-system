import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const employees =
    JSON.parse(localStorage.getItem("employees")) || [];

  const inventory =
    JSON.parse(localStorage.getItem("inventory")) || [];

  const projects =
    JSON.parse(localStorage.getItem("projects")) || [];

  const chartData = [
    {
      name: "Employees",
      value: employees.length,
    },
    {
      name: "Inventory",
      value: inventory.length,
    },
    {
      name: "Projects",
      value: projects.length,
    },
  ];

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="text-xl mb-2">
            Revenue
          </h3>

          <p className="text-4xl font-bold text-green-400">
            ₹1,20,000
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="text-xl mb-2">
            Employees
          </h3>

          <p className="text-4xl font-bold text-blue-400">
            {employees.length}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="text-xl mb-2">
            Inventory
          </h3>

          <p className="text-4xl font-bold text-yellow-400">
            {inventory.length}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="text-xl mb-2">
            Projects
          </h3>

          <p className="text-4xl font-bold text-purple-400">
            {projects.length}
          </p>
        </div>

      </div>

      {/* Analytics Chart */}

      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <h2 className="text-3xl font-bold mb-6">
          Business Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Activity */}

      <div className="bg-slate-800 p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6">
          Recent Activity
        </h2>

        <ul className="space-y-4 text-lg">
          <li>✅ Employee data updated</li>
          <li>✅ Inventory stock updated</li>
          <li>✅ New project added</li>
          <li>✅ Monthly report generated</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;