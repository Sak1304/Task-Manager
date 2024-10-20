import React from "react";
import { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div className="task-list">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
