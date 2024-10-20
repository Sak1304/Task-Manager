import React from "react";
import { Task } from "../types/task";
import { HiMiniPencil } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <div className={`task-item ${task.priority} ${task.completed ? "completed" : ""}`}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Priority: {task.priority}</p>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="large-checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          style={{ marginRight: '10px', marginTop: '13px', transform: 'scale(2.3)', cursor: 'pointer' }}
        />
        <button className="edit" onClick={() => onEdit(task)} style={{ marginLeft: '20px' }}>
          <HiMiniPencil />
        </button>
        <button className="delete" onClick={() => onDelete(task.id)} style={{ marginLeft: '20px' }}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
