import * as React from "react";

import { useFormContext, useController } from "react-hook-form";
import { RadioGroup, Radio, Typography, FormControlLabel } from "@mui/material";

import styles from "../../css/typeLoc.module.css";

const TypeLoc_Region = () => {
  const { control, setValue } = useFormContext();
  const { field } = useController({
    name: "region",
    control,
  });

  return (
    <div className={`layout_flexCol ${styles.typeLoc_pod}`}>
      <Typography variant="h6">Region</Typography>
      <RadioGroup
        {...field}
        onChange={(event) => {
          field.onChange(event.target.value); // data send back to hook form
          setValue("hub", "");
        }} // send value to hook form
      >
        <FormControlLabel
          value="guanac"
          control={<Radio />}
          label="Guanacaste"
        />
        <FormControlLabel value="caribe" control={<Radio />} label="Caribe" />
        <FormControlLabel value="zonsur" control={<Radio />} label="Zona Sur" />
        <FormControlLabel
          value="pactrl"
          control={<Radio />}
          label="Pacifico Central"
        />
      </RadioGroup>
    </div>
  );
};

export default TypeLoc_Region;
