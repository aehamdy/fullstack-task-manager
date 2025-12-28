import { useEffect, useState, useCallback } from "react";
import { getTasks } from "../api/api";
import type { Task } from "../api/api";
import TaskItem from "./TaskItem";

interface TaskListProps {
  token: string;
}

export default function TaskList({ token }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await getTasks(token);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [token]);

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
    };
    loadTasks();
  }, [fetchTasks]);

  if (tasks.length === 0)
    return (
      <div className="my-4 bg-white/10 p-2 rounded-md">
        <h3 className="font-semibold text-xl text-center">No tasks found</h3>
      </div>
    );

  return (
    <div className="w-full my-4 bg-white/10 p-2 rounded-md">
      <h2 className="font-semibold text-2xl text-center">Task List View</h2>

      <hr />

      <ul className="flex flex-col gap-2 mt-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            token={token}
            fetchTasks={fetchTasks}
          />
        ))}
      </ul>
    </div>
  );
}
