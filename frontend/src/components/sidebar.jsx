import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-slate-800 p-5">

      <h1 className="text-2xl font-bold mb-8">
        Amdox ERP
      </h1>

      <ul className="space-y-4">

        <li>
          <Link to="/">📊 Dashboard</Link>
        </li>

        <li>
          <Link to="/employees">👨‍💼 Employees</Link>
        </li>

        <li>
          <Link to="/inventory">📦 Inventory</Link>
        </li>

        <li>
          <Link to="/projects">📁 Projects</Link>
        </li>

        <li>
          <Link to="/reports">📈 Reports</Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;