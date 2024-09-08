import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { MyValueInterface } from "./SelectComponent";
import Box from "@mui/material/Box";
import { Grid2 } from "@mui/material";
import { LocationProp, IcbcService } from "../services/icbcService";

interface LocationCheckBoxProp extends MyValueInterface<LocationProp[]> {
  allLocations: LocationProp[];
}

export default function LocationCheckbox({
  val,
  setVal,
  allLocations,
}: Readonly<LocationCheckBoxProp>) {
  return (
    <FormGroup>
      <Grid2 container>
        {allLocations.map((location) => {
          const isChecked =
            val.filter((loc) => loc.locationName === location.locationName)
              .length > 0;

          return (
            <Box key={location.aPosID} sx={{ width: "16%" }}>
              <Grid2 size={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={isChecked}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                        checked: boolean
                      ) => {
                        if (checked) {
                          setVal((prev) => {
                            let old = prev;
                            const foundIndex = old.indexOf(location);
                            if (foundIndex < 0) {
                              old.push(location);
                            }
                            localStorage.setItem(
                              IcbcService.selectedLocations,
                              JSON.stringify(old)
                            );
                            return old;
                          });
                        } else {
                          setVal((prev) => {
                            let old = prev;
                            old = old.filter(
                              (loa) => loa.aPosID !== location.aPosID
                            );
                            localStorage.setItem(
                              IcbcService.selectedLocations,
                              JSON.stringify(old)
                            );
                            return old;
                          });
                        }
                      }}
                    />
                  }
                  label={location.locationName}
                />
              </Grid2>
            </Box>
          );
        })}
      </Grid2>
    </FormGroup>
  );
}
