// components/Modal.tsx
import React from "react";
import { MdOutlineCancel } from "react-icons/md";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
        <MdOutlineCancel />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
