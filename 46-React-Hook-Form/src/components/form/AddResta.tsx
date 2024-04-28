import * as React from "react";

import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
  useWatch,
  Control,
  UseFormSetValue,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegionWatch } from "../hooks/useRegionWatch";

import styles from "../../css/typeLoc.module.css";

import {
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";

import { schema, FormInputs } from "../../types/types";
import TypeLoc_Region from "./TypeLoc_Region";
import TypeLoc_Place from "./TypeLoc_Place";
import TypeLoc_Hub from "./TypeLoc_Hub";

export const AddResta = () => {
  const methods = useForm<FormInputs>({
    defaultValues: { place_type: "lodge", region: "guanac", hub: "nicoya" },
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((d) => {
          console.log(d);
        })}
      >
        <div className={`layout_flexRow ${styles.typeLoc_box}`}>
          <TypeLoc_Place />
          <TypeLoc_Region />
          <TypeLoc_Hub />
        </div>
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
