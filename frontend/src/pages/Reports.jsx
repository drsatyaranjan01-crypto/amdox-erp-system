import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
  const employees =
    JSON.parse(localStorage.getItem("employees")) || [];

  const inventory =
    JSON.parse(localStorage.getItem("inventory")) || [];

  const projects =
    JSON.parse(localStorage.getItem("projects")) || [];

  const totalSalary = employees.reduce(
    (sum, emp) =>
      sum + Number(emp.salary || 0),
    0
  );

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Amdox ERP Report", 14, 20);

    doc.setFontSize(12);

    doc.text(
      `Total Employees: ${employees.length}`,
      14,
      35
    );

    doc.text(
      `Total Inventory Items: ${inventory.length}`,
      14,
      45
    );

    doc.text(
      `Total Projects: ${projects.length}`,
      14,
      55
    );

    doc.text(
      `Salary Expense: ₹${totalSalary}`,
      14,
      65
    );

    autoTable(doc, {
      startY: 80,

      head: [
        [
          "ID",
          "Name",
          "Department",
          "Salary",
        ],
      ],

      body: employees.map((emp) => [
        emp.id,
        emp.name,
        emp.department,
        emp.salary,
      ]),
    });

    doc.save("Amdox_Report.pdf");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold">
          Reports & Analytics
        </h1>

        <button
          onClick={generatePDF}
          className="bg-green-600 px-5 py-3 rounded-lg hover:bg-green-700"
        >
          📄 Download PDF
        </button>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

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
            Inventory Items
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

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="text-xl mb-2">
            Salary Expense
          </h3>

          <p className="text-2xl font-bold text-green-400">
            ₹{totalSalary}
          </p>
        </div>

      </div>

      {/* Summary */}

      <div className="bg-slate-800 p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6">
          Performance Summary
        </h2>

        <ul className="space-y-4 text-lg">

          <li>
            ✅ Total Employees:
            {" "}
            {employees.length}
          </li>

          <li>
            ✅ Total Inventory Items:
            {" "}
            {inventory.length}
          </li>

          <li>
            ✅ Total Projects:
            {" "}
            {projects.length}
          </li>

          <li>
            ✅ Salary Expense:
            {" "}
            ₹{totalSalary}
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Reports;