import { Input, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import { KeyTable } from "./components/KeyTable";

import COUNTRIES from "./countries.json";
const queryClient = new QueryClient();

function App() {
  const [keys, setKeys] = useState("");
  const [country, setCountry] = useState<string>("RU");

  function onSubmitInputArea() {
    setKeys(keys);
    setCountry(country);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <ControlArea>
          <Input.TextArea
            value={keys}
            onChange={(e) => setKeys(e.target.value)}
            placeholder="Input comma-separated keywords"
            rows={3}
            onPressEnter={onSubmitInputArea}
          />

          <Button
            disabled={!keys}
            icon={<SearchOutlined />}
            onClick={() => onSubmitInputArea()}
          >
            Search
          </Button>

          <Button
            onClick={() => navigator.clipboard.writeText(keys)}
            disabled={!keys}
          >
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
        </ControlArea>
        {keys && <KeyTable keys={keys?.split(",")} country={country} />}
      </AppWrapper>
    </QueryClientProvider>
  );
}

const ControlArea = styled.div`
  position: sticky;
  top: 0;
  padding: 16px 0 16px;
  z-index: 2;
  background: white;
`;

const AppWrapper = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  button {
    margin: 8px 8px 0 0;
  }

  .ant-select-selection-search-input {
    padding-left: 26px !important;
  }
`;

export default App;
