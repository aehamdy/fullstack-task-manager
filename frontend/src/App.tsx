import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import type { User } from "./api/api";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token") || "";

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full md:w-8/10 lg:w-2/5 h-[60dvh] lg:h-dvh text-black bg-white rounded-2xl">
        {!isLoggedIn ? (
          <Login onLogin={setUser} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Register onRegister={setUser} setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    );
  }

  return (
    <div className="w-9/10 lg:w-1/2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="mb-4 font-semi">Welcome, {user.name}</h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
            setIsLoggedIn(false);
          }}
          className="p-1 text-white bg-red-600 rounded-md cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col lg:flex-col-reverse gap-4">
        <TaskList token={token} />
        <AddTask token={token} onTaskAdded={() => {}} />
      </div>
    </div>
  );
}

export default App;
