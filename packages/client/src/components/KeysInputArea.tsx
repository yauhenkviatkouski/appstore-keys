import React, { ComponentPropsWithRef, useRef, useState } from "react";
import styled from "styled-components";

import { Input, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

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
      <Input.TextArea
        value={keys}
        onChange={(e) => setKeys(e.target.value)}
        ref={AreaRef}
        placeholder="Input comma-separated keywords"
        rows={4}
        onPressEnter={() => props.onSubmit(keys, country)}
      />
      <div>
        <Button
          icon={<SearchOutlined />}
          onClick={() => props.onSubmit(keys, country)}
          // variant="contained"
        >
          Search
        </Button>
        {/* <Button
          onClick={onCopy}
          disabled={!AreaRef}
          variant="contained"
          type="submit"
        >
          Copy
        </Button> */}

        <Button
          onClick={() => setKeys("")}
          disabled={!Boolean(keys)}
          // variant="contained"
        >
          Clear
        </Button>
        <Select
          showSearch
          style={{ width: 200 }}
          value={country}
          placeholder="Country"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          onChange={(event: any) => setCountry(event.target.value as string)}
        >
          {Object.keys(COUNTRIES).map((code) => (
            <Select.Option key={code} value={code}>
              <img src={`https://www.countryflags.io/${code}/shiny/24.png`} />
              {" " + String((COUNTRIES as any)[code])}
            </Select.Option>
          ))}
        </Select>
        {/* <FormControl variant="filled">
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
        </FormControl> */}
      </div>
    </Root>
  );
}

const Root = styled.div``;

export { KeysInputArea };
