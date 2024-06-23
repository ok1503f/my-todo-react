import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/navbar/Nav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Todolist from "../components/todolist/Todolist";

function Home() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [user, setUser] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getuser", {
        withCredentials: true,
      });
      const userData = response.data.user;
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user data");
    }
  };

  const fetchUserTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getutd", {
        withCredentials: true,
      });
      const userTodos = response.data.todoData;
      const todoTitles = userTodos.map((todo) => todo);
      setTodoList(todoTitles);
    } catch (error) {
      console.error("Error fetching user todos:", error);
      throw new Error("Failed to fetch user todos");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserData();
        await fetchUserTodos();
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          title: "Error",
          text: "Session expired (Please login again)",
          icon: "error",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(-1);
          }
        });
      }
    };
    fetchData();
  }, []); // Empty dependency array to run once on component mount

  return (
    <div className="d-flex flex-column">
      <Nav name={user} />
      <div className="mt-3">
        <Todolist
          todolist={todoList}
          user={user}
          fetchUserTodos={fetchUserTodos}
        />
      </div>
    </div>
  );
}

export default Home;
