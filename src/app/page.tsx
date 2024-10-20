"use client";
import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Modal from "@/components/Modal"; 
import { Task } from "../types/task";
import "./globals.css";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadTasksFromLocalStorage = (): Task[] => {
      const tasks: Task[] = [];
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("task_")) {
          const task = localStorage.getItem(key);
          if (task) tasks.push(JSON.parse(task));
        }
      });
      return tasks;
    };

    setTasks(loadTasksFromLocalStorage());
  }, []);

  const saveTaskToLocalStorage = (task: Task) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`task_${task.id}`, JSON.stringify(task));
    }
  };

  const removeTaskFromLocalStorage = (id: number) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`task_${id}`);
    }
  };

  const addOrUpdateTask = (task: Task) => {
    if (taskToEdit) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks((prev) => [...prev, task]);
    }
    saveTaskToLocalStorage(task);
    setTaskToEdit(undefined);
    setIsFormVisible(false);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    removeTaskFromLocalStorage(id);
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const updatedTask = tasks.find((task) => task.id === id);
    if (updatedTask) {
      saveTaskToLocalStorage(updatedTask);
    }
  };

  const editTask = (task: Task) => {
    setTaskToEdit(task);
    setIsFormVisible(true);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="header">
        <h1>Task Management App</h1>
        <button 
          className="add-task-button"
          onClick={() => {
            setIsFormVisible(true);
            setTaskToEdit(undefined);
          }}
        >
          <IoMdAddCircleOutline />
          <span className="add-task-text"> Add Task</span>
        </button>
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
      />
      {isFormVisible && (
        <Modal onClose={() => setIsFormVisible(false)}>
          <TaskForm onSubmit={addOrUpdateTask} taskToEdit={taskToEdit} />
        </Modal>
      )}
      <TaskList
        tasks={filteredTasks}
        onEdit={editTask}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
}
