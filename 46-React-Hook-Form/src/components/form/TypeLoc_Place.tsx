import * as React from "react";

import { useFormContext, useController } from "react-hook-form";
import { RadioGroup, Radio, Typography, FormControlLabel } from "@mui/material";

import styles from "../../css/typeLoc.module.css";

const TypeLoc_Place = () => {
  const { control } = useFormContext();
  const { field } = useController({
    name: "place_type",
    control,
  });

  return (
    <div className={`layout_flexCol ${styles.typeLoc_pod}`}>
      <Typography variant="h6">Place Type</Typography>
      <RadioGroup {...field}>
        <FormControlLabel value="lodge" control={<Radio />} label="Lodging" />
        <FormControlLabel
          value="resta"
          control={<Radio />}
          label="Restaurant"
        />
        <FormControlLabel value="wfall" control={<Radio />} label="Waterfall" />
        <FormControlLabel
          value="trail"
          control={<Radio />}
          label="Hiking Trail"
        />
      </RadioGroup>
    </div>
  );
};

export default TypeLoc_Place;
