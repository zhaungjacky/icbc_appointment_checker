import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface SilderProp {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  sliderMinValue: number;
  sliderMaxValue: number;
  localStorageKey: string;
}

function valuetext(value: number) {
  return `${value} Min`;
}



export default function SliderMinSelection({
  value,
  setValue,
  sliderMinValue,
  sliderMaxValue,
  localStorageKey,
}: Readonly<SilderProp>) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    localStorage.setItem(localStorageKey,JSON.stringify(newValue))
  };
  return (
    <Box sx={{ width: 200 }}>
      <Slider
        aria-label="Minute"
        defaultValue={value}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={1}
        onChange={handleChange}
        step={1}
        marks
        min={sliderMinValue}
        max={sliderMaxValue}
      />
    </Box>
  );
}
