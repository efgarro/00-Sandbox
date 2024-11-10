import * as React from "react";
import { useController } from "react-hook-form";
import { isPhoneValid } from "../../utils/phoneNumberUtil";
import { PhoneInput } from "react-international-phone";

import { FormControlLabel, Typography } from "@mui/material";

const MobileWhatsApp = () => {
  const {
    field: mobile,
    fieldState: { isDirty: isDirtyMobile },
  } = useController({ name: "mobile", shouldUnregister: true });

  const isValid = isPhoneValid(mobile.value);

  return (
    <React.Fragment>
      <PhoneInput
        {...mobile}
        style={{
          "--react-international-phone-font-size": "15px",
        }}
        required={true}
        placeholder="Mobile & WhatsApp"
        disableDialCodeAndPrefix={true}
        showDisabledDialCodeAndPrefix={true}
        defaultCountry="cr"
        hideDropdown={true}
      />
      {isValid ? undefined : isDirtyMobile ? (
        <Typography sx={{ color: "red", fontSize: "13px" }}>
          Is Dirty Phone is not valid
        </Typography>
      ) : undefined}
    </React.Fragment>
  );
};

export default MobileWhatsApp;
