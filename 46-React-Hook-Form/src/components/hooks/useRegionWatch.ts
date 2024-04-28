import {
  useFormContext,
  useWatch,
  Control,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";

export const useRegionWatch = ({ control }: { control: Control }) => {
  //   const { control } = useFormContext();
  const regionWatch = useWatch({ control, name: "region" });
  console.log(regionWatch);
  return regionWatch;
};
