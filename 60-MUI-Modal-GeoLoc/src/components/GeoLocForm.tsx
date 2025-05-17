import * as React from "react";

import { useForm, FormProvider } from "react-hook-form";
import {
  Paper,
  Typography,
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Button,
  IconButton,
} from "@mui/material";

import UpdateIcon from "@mui/icons-material/Update";

import styles from "../css/styles.module.css";

interface IGeo {
  latitude: number;
  longitude: number;
}

const GeoLocForm = () => {
  const [selectedValue, setSelectedValue] = React.useState("c");
  const methods = useForm<IGeo>({
    defaultValues: { latitude: 0.0, longitude: 0.0 },
  });

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((formValues) => console.log(formValues))}
      >
        <div className={`core_flexCol core_wrapperMd`}>
          <Paper
            className="core_flexCol"
            sx={{
              justifyContent: "center",
              my: "1rem",
              height: 50,
              background: "#a4539935",
            }}
            square
            elevation={0}
          >
            <Typography sx={{ pl: "2rem" }} variant="h6">
              GeoLocation
            </Typography>
          </Paper>
          <div className={`core_flexRow ${styles.geoloc_podX}`}>
            <Radio
              className={`${styles.geoloc_podX_radio}`}
              checked={selectedValue === "a"}
              onChange={handleSelection}
              value="a"
            />
            <Button disabled={selectedValue !== "a"} variant="contained">
              Get Current Position
            </Button>
          </div>
          <div className={`core_flexRow ${styles.geoloc_podX}`}>
            <Radio
              className={`${styles.geoloc_podX_radio}`}
              checked={selectedValue === "b"}
              onChange={handleSelection}
              value="b"
            />
            {/* </div> */}
            <TextField
              disabled={selectedValue !== "b"}
              label="Copy <latitude,longitude> from Google Maps"
              variant="outlined"
              margin="normal"
              sx={{ my: "auto" }}
            />
            <div className={`${styles.geoloc_podX_updateIcon}`}>
              <IconButton disabled={selectedValue !== "b"}>
                <UpdateIcon />
              </IconButton>
            </div>
          </div>
          <div className={`core_flexRow ${styles.geoloc_podX}`}>
            <Radio
              className={`${styles.geoloc_podX_radio}`}
              checked={selectedValue === "c"}
              onChange={handleSelection}
              value="c"
            />
            <TextField
              disabled={selectedValue !== "c"}
              label="Latitude"
              variant="outlined"
              margin="normal"
              sx={{ my: "auto" }}
            />
            <TextField
              disabled={selectedValue !== "c"}
              label="Longitude"
              variant="outlined"
              margin="normal"
              sx={{ my: "auto" }}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default GeoLocForm;
