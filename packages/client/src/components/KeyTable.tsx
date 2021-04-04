import { styled } from "@material-ui/core";
import { KeyRow } from "./KeyRow";

type KeyTableProps = {
  keys: string[];
};

function KeyTable(props: KeyTableProps) {
  return (
    <Root>
      {props.keys.map(
        (key) => !!key.length && <KeyRow key={key} keyWord={key} />
      )}
    </Root>
  );
}

const Root = styled("div")({
  width: "100%",
  marginTop: "32px",
});

export { KeyTable };
