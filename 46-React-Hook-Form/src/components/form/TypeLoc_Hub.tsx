import * as React from "react";

import { useFormContext, useController } from "react-hook-form";
import { RadioGroup, Radio, Typography, FormControlLabel } from "@mui/material";

import styles from "../../css/typeLoc.module.css";

const TypeLoc_Hub = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const { field } = useController({
    name: "hub",
    control,
  });
  const selectedRegion = watch("region");

  return (
    <div className={`layout_flexCol ${styles.typeLoc_pod}`}>
      <Typography variant="h6">Hub</Typography>
      <RadioGroup {...field}>
        <FormControlLabel
          disabled={selectedRegion === "caribe" ? false : true}
          value="climon"
          control={<Radio />}
          label="Ciudad de Limón"
        />
        <FormControlLabel
          disabled={selectedRegion === "caribe" ? false : true}
          value="ptovjo"
          control={<Radio />}
          label="Puerto Viejo"
        />
        <FormControlLabel
          disabled={selectedRegion === "guanac" ? false : true}
          value="tmrndo"
          control={<Radio />}
          label="Tamarindo"
        />
        <FormControlLabel
          disabled={selectedRegion === "pactrl" ? false : true}
          value="jacher"
          control={<Radio />}
          label="Jacó / Herradura"
        />
        <FormControlLabel
          disabled={selectedRegion === "guanac" ? false : true}
          value="stcruz"
          control={<Radio />}
          label="Santa Cruz"
        />
        <FormControlLabel
          disabled={selectedRegion === "guanac" ? false : true}
          value="nicoya"
          control={<Radio />}
          label="Nicoya"
        />
        <FormControlLabel
          disabled={selectedRegion === "zonsur" ? false : true}
          value="perzel"
          control={<Radio />}
          label="Perez Zeledón"
        />
        <FormControlLabel
          disabled={selectedRegion === "pactrl" ? false : true}
          value="domcal"
          control={<Radio />}
          label="Dominical"
        />
      </RadioGroup>
      {errors.hub?.message && <p>{errors.hub.message as string}</p>}
    </div>
  );
};

export default TypeLoc_Hub;
