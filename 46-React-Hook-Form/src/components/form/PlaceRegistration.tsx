import * as React from "react";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "../../css/typeLoc.module.css";

import { schema, FormInputs } from "../../types/types";
import TypeLoc_Region from "./TypeLoc_Region";
import TypeLoc_Place from "./TypeLoc_Place";
import TypeLoc_Hub from "./TypeLoc_Hub";
import BaseAttributes from "./BaseAttributes";

export const PlaceRegistration = () => {
  const methods = useForm<FormInputs>({
    defaultValues: {
      place_type: "lodge",
      region: "guanac",
      hub: "nicoya",
      name: "",
      description: "",
    },
    resolver: zodResolver(schema),
  });

  console.log(methods.formState.errors);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((d) => {
          console.log(parseFloat(d.latitude));
          console.log(parseFloat(d.longitude));
          console.log(d);
        })}
      >
        <div className={`layout_flexRow ${styles.typeLoc_box}`}>
          <TypeLoc_Place />
          <TypeLoc_Region />
          <TypeLoc_Hub />
        </div>
        <div className={`${styles.baseAttr_box}`}>
          <div className={`layout_flexCol ${styles.baseAttr_wrapper}`}>
            <BaseAttributes />
          </div>
        </div>
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
