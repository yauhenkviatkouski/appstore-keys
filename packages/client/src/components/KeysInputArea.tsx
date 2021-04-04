import React, { ComponentPropsWithRef, useRef, useState } from "react";
import { Button, styled, TextField } from "@material-ui/core";

type KeysInputAreaProps = {
  onSubmit: (keys: string) => void;
};

function KeysInputArea(props: KeysInputAreaProps) {
  const AreaRef = useRef<ComponentPropsWithRef<any>>(null);
  const [keys, setKeys] = useState("");
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
        rows="4"
        multiline
      />
      <ControlWrapper>
        <StyledButton
          onClick={() => props.onSubmit(keys)}
          variant="contained"
          type="submit"
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
      </ControlWrapper>
    </Root>
  );
}

const Root = styled("div")({
  display: "flex",
});

const StyledTextField = styled(TextField)({
  width: "50%",
});

const ControlWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "stretch",
});

const StyledButton = styled(Button)({
  margin: "8px",
});

export { KeysInputArea };
