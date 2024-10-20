import React, { useState } from "react";
import { Task } from "../types/task";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  taskToEdit?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ""
  );
  const [priority, setPriority] = useState(
    taskToEdit ? taskToEdit.priority : "medium"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title,
      description,
      priority,
      completed: false,
    };
    onSubmit(newTask);
    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "high" | "medium" | "low")
        }
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
