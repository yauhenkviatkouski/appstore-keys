import React, { ComponentPropsWithRef, useRef, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  styled,
  TextField,
  MenuItem,
} from "@material-ui/core";
import COUNTRIES from "../countries.json";

type KeysInputAreaProps = {
  onSubmit: (keys: string, country: string) => void;
};

function KeysInputArea(props: KeysInputAreaProps) {
  const AreaRef = useRef<ComponentPropsWithRef<any>>(null);
  const [keys, setKeys] = useState("");
  const [country, setCountry] = useState("US");
  // function onCopy() {
  //   AreaRef.current?.select();
  //   document.execCommand("copy");
  // }
  return (
    <Root>
      <StyledTextField
        value={keys}
        onChange={(e) => setKeys(e.target.value)}
        inputRef={AreaRef}
        placeholder="Input comma-separated keywords"
        label="Keywords"
        variant="outlined"
        rows="5"
        multiline
      />
      <ControlWrapper>
        <StyledButton
          onClick={() => props.onSubmit(keys, country)}
          variant="contained"
        >
          Search
        </StyledButton>
        {/* <StyledButton
          onClick={onCopy}
          disabled={!AreaRef}
          variant="contained"
          type="submit"
        >
          Copy
        </StyledButton> */}

        <StyledButton
          onClick={() => setKeys("")}
          disabled={!Boolean(keys)}
          variant="contained"
        >
          Clear
        </StyledButton>
        <FormControl variant="filled">
          <InputLabel id="coutry-selector">Country</InputLabel>
          <Select
            labelId="coutry-selector"
            id="coutry-selector"
            value={country}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
              setCountry(event.target.value as string)
            }
          >
            {Object.keys(COUNTRIES).map((code) => (
              <MenuItem key={code} value={code}>
                <img src={`https://www.countryflags.io/${code}/shiny/24.png`} />
                {" " + String((COUNTRIES as any)[code])}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ControlWrapper>
    </Root>
  );
}

const Root = styled("div")({
  display: "flex",
  "& .MuiFilledInput-input": {
    display: "flex",
    alignItems: "center",
  },

  "& img": {
    marginRight: "8px",
  },
});

const StyledTextField = styled(TextField)({
  width: "50%",
  marginRight: "16px",
});

const ControlWrapper = styled("div")({
  display: "grid",
  gridGap: "16px",
  gridTemplateColumns: "250px 250px",
});

const StyledButton = styled(Button)({});

export { KeysInputArea };
