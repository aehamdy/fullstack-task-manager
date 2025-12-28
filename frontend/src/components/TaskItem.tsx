import { useState } from "react";
import { deleteTask, updateTask, type Task } from "../api/api";

type TaskItemProps = {
  task: Task;
  token: string;
  fetchTasks: () => void;
};

function TaskItem({ task, token, fetchTasks }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description || "",
  });

  const handleDelete = async (id: number) => {
    await deleteTask(id, token);
    fetchTasks();
  };

  const handleToggle = async (task: Task) => {
    await updateTask(
      task.id,
      { status: task.status === "pending" ? "done" : "pending" },
      token
    );
    fetchTasks();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTask(
      task.id,
      {
        title: updatedTask.title,
        description: updatedTask.description,
      },
      token
    );
    setIsEditing(false);
    fetchTasks();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <li
      key={task.id}
      className={`group flex flex-col gap-2 p-2 ${
        task.status === "done" ? "bg-white/20" : "bg-white/40"
      } hover:bg-white rounded-md duration-300`}
    >
      {isEditing ? (
        <form
          onSubmit={handleUpdate}
          className="flex flex-col gap-2 group-hover:text-black"
        >
          <input
            type="text"
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
            required
            className="p-1 border group-hover:border-black rounded"
          />
          <textarea
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
            rows={2}
            className="p-1 border group-hover:border-black rounded"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-1 px-2 text-white bg-green-500 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setUpdatedTask({
                  title: task.title,
                  description: task.description || "",
                });
              }}
              className="flex-1 py-1 px-2 text-white bg-gray-500 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center gap-2">
          <div
            className={`flex-1 group-hover:text-black ${
              task.status === "done" ? "line-through" : ""
            }`}
          >
            <h4 className={`font-semibold`}>{task.title}</h4>
            {task.description && (
              <p className={`text-sm `}>{task.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggle(task)}
              className="py-1 px-2 text-white bg-green-500 rounded-md cursor-pointer"
            >
              {task.status === "pending" ? "Complete" : "Undo"}
            </button>

            {task.status === "pending" && (
              <button
                onClick={() => setIsEditing(true)}
                className="py-1 px-2 text-white bg-blue-500 rounded-md cursor-pointer"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => handleDelete(task.id)}
              className="py-1 px-2 text-white bg-red-500 rounded-md cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
