import { useState } from "react";
import styled from "styled-components";

import { Input, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import COUNTRIES from "../countries.json";

type KeysInputAreaProps = {
  onSubmit: (keys: string, country: string) => void;
};

function KeysInputArea(props: KeysInputAreaProps) {
  const [keys, setKeys] = useState("");
  const [country, setCountry] = useState("US");
  function onCopy() {
    navigator.clipboard.writeText(keys);
  }
  return (
    <Root>
      <Input.TextArea
        value={keys}
        onChange={(e) => setKeys(e.target.value)}
        placeholder="Input comma-separated keywords"
        rows={3}
        onPressEnter={() => props.onSubmit(keys, country)}
      />
      <div>
        <Button
          disabled={!keys}
          icon={<SearchOutlined />}
          onClick={() => props.onSubmit(keys, country)}
        >
          Search
        </Button>
        <Button onClick={onCopy} disabled={!keys}>
          Copy
        </Button>

        <Button onClick={() => setKeys("")} disabled={!keys}>
          Clear
        </Button>
        <Select
          showSearch
          style={{ width: 200 }}
          value={country}
          placeholder="Country"
          optionFilterProp="children"
          filterOption={(input, option) => {
            console.log(
              "🚀 ~ file: KeysInputArea.tsx ~ line 67 ~ KeysInputArea ~ input, option",
              option
            );
            return (
              option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
          }}
          onChange={(value: string) => setCountry(value)}
        >
          {Object.keys(COUNTRIES).map((code) => (
            <Select.Option key={code} value={code}>
              <img src={`https://www.countryflags.io/${code}/shiny/24.png`} />
              {" " + String((COUNTRIES as any)[code])}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Root>
  );
}

const Root = styled.div`
  position: sticky;
  top: 0;
  padding-top: 16px;
  z-index: 2;
  background: white;
  button {
    margin: 8px 8px 0 0;
  }

  .ant-select-selection-search-input {
    padding-left: 26px !important;
  }
`;

export { KeysInputArea };
