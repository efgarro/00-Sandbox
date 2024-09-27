import * as React from "react";
import { TextField, Typography } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";

import Select from "react-select";

import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

import styles from "../../css/typeLoc.module.css";
const rr_baseAttr = 0;

const BaseAttributes = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const { field: name } = useController({ name: "name" });
  const { field: description } = useController({ name: "description" });
  const { field: food_genre } = useController({ name: "food_genre" });
  const { field: latitude } = useController({ name: "latitude" });
  const { field: longitude } = useController({ name: "longitude" });
  const {
    field: mobile,
    fieldState: { isDirty: isDirtyMobile },
  } = useController({ name: "mobile" });

  const isValid = isPhoneValid(mobile.value);

  //   console.log(errors.latitude);

  const genreOptions = [
    { value: "white", label: "White" },
    { value: "green", label: "Green" },
    { value: "red", label: "Red" },
  ];

  return (
    <>
      <Select
        {...food_genre}
        placeholder={'Food Genre'}
        options={genreOptions}
        classNamePrefix="react-select"
        styles={{
          menu: (baseStyles) => ({
            ...baseStyles,
            zIndex: 10,
          }),
        }}
      ></Select>
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
      {/* <div className={`layout_flexRow ${styles.baseAttr_LatLon}`}> */}
      <PhoneInput
        {...mobile}
        style={{ "--react-international-phone-font-size": "15px" }}
        placeholder="Mobile & WhatsApp"
        disableDialCodeAndPrefix={true}
        showDisabledDialCodeAndPrefix={true}
        defaultCountry="cr"
        hideDropdown={true}
      />
      {isValid ? undefined : isDirtyMobile ? (
        <Typography sx={{ color: "red", fontSize: "13px" }}>
          Phone is not valid
        </Typography>
      ) : undefined}
      {/* {!isValid && <div style={{ color: "red" }}>Phone is not valid</div>} */}
      {errors?.latitude && <p>{errors.latitude.message?.toString()}</p>}
      {errors?.longitude && <p>{errors.longitude.message?.toString()}</p>}

      <p>{rr_baseAttr}</p>
    </>
  );
};

export default BaseAttributes;
