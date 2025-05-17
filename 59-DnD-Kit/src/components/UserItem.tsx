import * as React from "react";
import { IUser } from "../types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card, Box, CardContent, Typography, CardMedia } from "@mui/material";

const UserItem = ({ user }: { user: IUser }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      sx={{ display: "flex" }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={"core_flexRow imgCard"}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {user.name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {user.email}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 125, height: 125 }}
          image={user.url}
          alt="Live from space album cover"
        />
      </div>
    </Card>
  );
};

export default UserItem;
