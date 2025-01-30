import * as React from "react";
import { IUser } from "../types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const UserItem = ({ user }: { user: IUser }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h3>{user.name}</h3>
      <span>{user.email}</span>
      <button {...attributes} {...listeners}>
        Drag
      </button>
    </div>
  );
};

export default UserItem;
