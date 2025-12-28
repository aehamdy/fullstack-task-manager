import { useState } from "react";
import { createTask } from "../api/api";

interface AddTaskProps {
  token: string;
  onTaskAdded: () => void;
}

export default function AddTask({ token, onTaskAdded }: AddTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask({ title, description }, token);
    setTitle("");
    setDescription("");
    onTaskAdded();
  };

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center"
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="py-1 px-2 border rounded-md"
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="py-1 px-2 border rounded-md"
        />

        <button
          type="submit"
          className="py-1 px-2 text-white bg-emerald-500 rounded-md cursor-pointer"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
