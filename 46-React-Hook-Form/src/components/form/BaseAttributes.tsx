import * as React from "react";
import { TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

import styles from "../../css/typeLoc.module.css";
const rr_baseAttr = 0;

const BaseAttributes = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const { field: name } = useController({ name: "name" });
  const { field: description } = useController({ name: "description" });
  const { field: latitude } = useController({ name: "latitude" });
  const { field: longitude } = useController({ name: "longitude" });

  //   console.log(errors.latitude);

  return (
    <>
      <TextField {...name} label="Name" variant="outlined" margin="normal" />
      <TextField
        {...description}
        label="Description"
        variant="outlined"
        margin="normal"
      />
      <div className={`layout_flexRow ${styles.baseAttr_LatLon}`}>
        <TextField
          {...latitude}
          error={errors?.latitude ? true : false}
          label="Latitude"
          variant="outlined"
          margin="normal"
        />
        {/* {errors?.latitude && <p role="alert">Error!!</p>} */}
        <TextField
          {...longitude}
          error={errors?.longitude ? true : false}
          label="Longitude"
          variant="outlined"
          margin="normal"
        />
      </div>
      {errors?.latitude && <p>{errors.latitude.message?.toString()}</p>}
      {errors?.longitude && <p>{errors.longitude.message?.toString()}</p>}

      <p>{rr_baseAttr}</p>
    </>
  );
};

export default BaseAttributes;
