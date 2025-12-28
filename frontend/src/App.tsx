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
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1 className="mb-4 font-semi">Welcome, {user.name}</h1>

      <AddTask token={token} onTaskAdded={() => {}} />
      <TaskList token={token} />

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
  );
}

export default App;
