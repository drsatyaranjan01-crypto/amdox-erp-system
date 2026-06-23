import { useState, useEffect } from "react";

function Employees() {
  const [employees, setEmployees] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("employees")) || [
        {
          id: "EMP001",
          name: "Satya Ranjan Pattanayak",
          department: "Project Manager",
          salary: 150000,
        },
        {
          id: "EMP002",
          name: "Ananyaa T",
          department: "Frontend Developer",
          salary: 60000,
        },
        {
          id: "EMP003",
          name: "Subhaharini P",
          department: "Backend Developer",
          salary: 65000,
        },
        {
          id: "EMP004",
          name: "Pranjal Patel",
          department: "UI/UX Designer",
          salary: 55000,
        },
        {
          id: "EMP005",
          name: "Darti Vasani",
          department: "QA Tester",
          salary: 50000,
        },
      ]
    );
  });

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [search, setSearch] = useState("");
  const [employeeCounter, setEmployeeCounter] = useState(() => {
    return Number(
      localStorage.getItem("employeeCounter")
    ) || 6;
  });

  // Edit States
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDepartment, setEditDepartment] =
    useState("");
  const [editSalary, setEditSalary] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      "employees",
      JSON.stringify(employees)
    );
  }, [employees]);
  useEffect(() => {
  localStorage.setItem(
    "employeeCounter",
    employeeCounter
  );
}, [employeeCounter]);

  const addEmployee = () => {
    if (!name || !department || !salary) {
      alert("Please fill all fields");
      return;
    }

    const nextId = `EMP${String(
  employeeCounter
).padStart(3, "0")}`;

const newEmployee = {
  id: nextId,
  name,
  department,
  salary,
};

    setEmployees([
      ...employees,
      newEmployee,
    ]);
    setEmployeeCounter(
  employeeCounter + 1
);

    setName("");
    setDepartment("");
    setSalary("");
  };

  const deleteEmployee = (id) => {
    setEmployees(
      employees.filter(
        (emp) => emp.id !== id
      )
    );
  };

  const handleEdit = (emp) => {
    setEditId(emp.id);
    setEditName(emp.name);
    setEditDepartment(emp.department);
    setEditSalary(emp.salary);
  };

  const handleUpdate = () => {
    const updatedEmployees =
      employees.map((emp) =>
        emp.id === editId
          ? {
              ...emp,
              name: editName,
              department: editDepartment,
              salary: editSalary,
            }
          : emp
      );

    setEmployees(updatedEmployees);

    setEditId(null);
    setEditName("");
    setEditDepartment("");
    setEditSalary("");
  };

  const filteredEmployees =
    employees.filter((emp) =>
      emp.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">
        Employees
      </h1>

      {/* Add Employee */}

      <div className="bg-slate-800 p-6 rounded-xl mb-6">
        <h2 className="text-3xl font-bold mb-4">
          Add Employee
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="p-3 bg-slate-700 rounded"
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) =>
              setDepartment(
                e.target.value
              )
            }
            className="p-3 bg-slate-700 rounded"
          />

          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) =>
              setSalary(e.target.value)
            }
            className="p-3 bg-slate-700 rounded"
          />

        </div>

        <button
          onClick={addEmployee}
          className="mt-4 bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      {/* Edit Employee */}

      {editId && (
        <div className="bg-slate-800 p-6 rounded-xl mb-6">

          <h2 className="text-3xl font-bold mb-4">
            Edit Employee
          </h2>

          <div className="grid grid-cols-3 gap-4">

            <input
              value={editName}
              onChange={(e) =>
                setEditName(
                  e.target.value
                )
              }
              className="p-3 bg-slate-700 rounded"
            />

            <input
              value={editDepartment}
              onChange={(e) =>
                setEditDepartment(
                  e.target.value
                )
              }
              className="p-3 bg-slate-700 rounded"
            />

            <input
              value={editSalary}
              onChange={(e) =>
                setEditSalary(
                  e.target.value
                )
              }
              className="p-3 bg-slate-700 rounded"
            />

          </div>

          <button
            onClick={handleUpdate}
            className="mt-4 bg-green-600 px-5 py-2 rounded hover:bg-green-700"
          >
            Update Employee
          </button>

        </div>
      )}

      {/* Search */}

      <input
        type="text"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-3 mb-6 bg-slate-700 rounded"
      />

      {/* Table */}

      <table className="w-full bg-slate-800 rounded-xl overflow-hidden">

        <thead>
          <tr className="bg-slate-700">
            <th className="p-4 text-left">
              ID
            </th>
            <th className="p-4 text-left">
              Name
            </th>
            <th className="p-4 text-left">
              Department
            </th>
            <th className="p-4 text-left">
              Salary
            </th>
            <th className="p-4 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>

          {filteredEmployees.map((emp) => (
            <tr
              key={emp.id}
              className="border-b border-slate-700"
            >
              <td className="p-4">
                {emp.id}
              </td>

              <td className="p-4">
                {emp.name}
              </td>

              <td className="p-4">
                {emp.department}
              </td>

              <td className="p-4">
                ₹{emp.salary}
              </td>

              <td className="p-4">

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      handleEdit(emp)
                    }
                    className="bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteEmployee(
                        emp.id
                      )
                    }
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>

              </td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}

export default Employees;