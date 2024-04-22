import * as React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../types/types";
console.log(schema)
export const AddResta = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return <form onSubmit={handleSubmit((d) => console.log(d))}>
    
  </form>;
};
