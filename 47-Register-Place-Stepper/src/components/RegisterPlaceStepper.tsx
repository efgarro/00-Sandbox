import * as React from "react";

import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Stack,
  Button,
  Box,
} from "@mui/material";

import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <p>Form 1</p>; // <AddressForm />;
    case 1:
      return <p>Form 2</p>; // <PaymentForm />;
    case 2:
      return <p>Form 3</p>; // <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const RegisterPlaceStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = ["Shipping address", "Payment details", "Review your order"];

  return (
    <div className="layout_wrapper">
      
      <Stepper
        id="mobile-stepper"
        activeStep={activeStep}
        alternativeLabel
        // sx={{ display: { sm: "flex", md: "none" } }}
      >
        {steps.map((label) => (
          <Step
            sx={{
              ":first-of-type": { pl: 0 },
              ":last-child": { pr: 0 },
              "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
            }}
            key={label}
          >
            <StepLabel
              sx={{ ".MuiStepLabel-labelContainer": { maxWidth: "120px" } }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <Stack spacing={2} useFlexGap>
          <Typography variant="h1">📦</Typography>
          <Typography variant="h5">Thank you for your order!</Typography>
          <Typography variant="body1" color="text.secondary">
            Your order number is
            <strong>&nbsp;#140396</strong>. We have emailed your order
            confirmation and will update you once its shipped.
          </Typography>
          <Button
            variant="contained"
            sx={{
              alignSelf: "start",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Go to my orders
          </Button>
        </Stack>
      ) : (
        <React.Fragment>
          {getStepContent(activeStep)}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              justifyContent: activeStep !== 0 ? "space-between" : "flex-end",
              alignItems: "end",
              flexGrow: 1,
              gap: 1,
              pb: { xs: 12, sm: 0 },
              mt: { xs: 2, sm: 0 },
              mb: "60px",
            }}
          >
            {activeStep !== 0 && (
              <Button
                startIcon={<ChevronLeftRounded />}
                onClick={handleBack}
                variant="text"
                sx={{
                  display: { xs: "none", sm: "flex" },
                }}
              >
                Previous
              </Button>
            )}
            {activeStep !== 0 && (
              <Button
                startIcon={<ChevronLeftRounded />}
                onClick={handleBack}
                variant="outlined"
                fullWidth
                sx={{
                  display: { xs: "flex", sm: "none" },
                }}
              >
                Previous
              </Button>
            )}
            <Button
              variant="contained"
              endIcon={<ChevronRightRounded />}
              onClick={handleNext}
              sx={{
                width: { xs: "100%", sm: "fit-content" },
              }}
            >
              {activeStep === steps.length - 1 ? "Place order" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </div>
  );
};

export default RegisterPlaceStepper;
