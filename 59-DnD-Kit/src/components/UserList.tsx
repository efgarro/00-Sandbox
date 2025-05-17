import * as React from "react";
import { IUser } from "../types/types";
import { userData } from "../userData";
import UserItem from "./UserItem";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import { Stack } from "@mui/material";

const UserList = () => {
  const [listData, setListData] = React.useState<IUser[]>(userData);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over !== null && active.id !== over.id) {
      setListData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={listData}
        >
          <div className="core_wrapperSm">
            <Stack spacing={2}>
              {listData.map((user: IUser) => (
                <UserItem user={user} key={user.id} />
              ))}
            </Stack>
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default UserList;
