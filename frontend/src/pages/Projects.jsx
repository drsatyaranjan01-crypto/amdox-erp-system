import { useState, useEffect } from "react";

function Projects() {
  const [projects, setProjects] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("projects")) || [
        {
          id: 1,
          name: "ERP System",
          status: "Ongoing",
          priority: "High",
          progress: 60,
        },
      ]
    );
  });

  const [projectName, setProjectName] =
    useState("");

  const [status, setStatus] =
    useState("Ongoing");

  const [priority, setPriority] =
    useState("Medium");

  const [progress, setProgress] =
    useState(0);

  const [search, setSearch] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  useEffect(() => {
    localStorage.setItem(
      "projects",
      JSON.stringify(projects)
    );
  }, [projects]);

  const addProject = () => {
    if (!projectName) {
      alert("Enter project name");
      return;
    }

    const newProject = {
      id: Date.now(),
      name: projectName,
      status,
      priority,
      progress,
    };

    setProjects([
      ...projects,
      newProject,
    ]);

    setProjectName("");
    setStatus("Ongoing");
    setPriority("Medium");
    setProgress(0);
  };

  const deleteProject = (id) => {
    setProjects(
      projects.filter(
        (project) =>
          project.id !== id
      )
    );
  };

  const editProject = (id) => {
    setEditId(id);
  };

  const updateProject = (
    id,
    field,
    value
  ) => {
    const updatedProjects =
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              [field]: value,
            }
          : project
      );

    setProjects(updatedProjects);
  };

  const filteredProjects =
    projects.filter((project) =>
      project.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">
        Projects
      </h1>

      {/* Add Project */}

      <div className="bg-slate-800 p-6 rounded-xl mb-6">
        <h2 className="text-3xl font-bold mb-4">
          Add Project
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(
                e.target.value
              )
            }
            className="p-3 rounded bg-slate-700"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="p-3 rounded bg-slate-700"
          >
            <option>
              Ongoing
            </option>
            <option>
              Completed
            </option>
            <option>
              Pending
            </option>
          </select>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="p-3 rounded bg-slate-700"
          >
            <option>
              High
            </option>
            <option>
              Medium
            </option>
            <option>
              Low
            </option>
          </select>

          <input
            type="number"
            min="0"
            max="100"
            placeholder="Progress %"
            value={progress}
            onChange={(e) =>
              setProgress(
                e.target.value
              )
            }
            className="p-3 rounded bg-slate-700"
          />

        </div>

        <button
          onClick={addProject}
          className="mt-4 bg-purple-600 px-5 py-2 rounded"
        >
          Add Project
        </button>
      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Project..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-700 mb-6"
      />

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {filteredProjects.map(
          (project) => (
            <div
              key={project.id}
              className="bg-slate-800 p-6 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-3">
                {project.name}
              </h3>

              <p>
                Status:
                {" "}
                {editId ===
                project.id ? (
                  <select
                    value={
                      project.status
                    }
                    onChange={(
                      e
                    ) =>
                      updateProject(
                        project.id,
                        "status",
                        e.target
                          .value
                      )
                    }
                    className="ml-2 bg-slate-700 rounded"
                  >
                    <option>
                      Pending
                    </option>
                    <option>
                      Ongoing
                    </option>
                    <option>
                      Completed
                    </option>
                  </select>
                ) : (
                  project.status
                )}
              </p>

              <p>
                Priority:
                {" "}
                {
                  project.priority
                }
              </p>

              <p>
                Progress:
                {" "}
                {
                  project.progress
                }
                %
              </p>

              <div className="w-full bg-slate-700 rounded-full h-4 mt-3">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{
                    width: `${project.progress}%`,
                  }}
                ></div>
              </div>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    editProject(
                      project.id
                    )
                  }
                  className="bg-yellow-500 px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteProject(
                      project.id
                    )
                  }
                  className="bg-red-600 px-4 py-2 rounded"
                >
                  Delete
                </button>

              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}

export default Projects;