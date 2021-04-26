import { Input, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import { KeyTable } from "./components/KeyTable";

import COUNTRIES from "./countries.json";
const queryClient = new QueryClient();

function App() {
  const [keys, setKeys] = useState<string[]>([]);
  const [country, setCountry] = useState<string>("RU");
  const [isSearching, setIsSearching] = useState(false);

  // TODO deleting all dublicates
  function deleteKeyWord(keyWord: string) {
    setKeys((keys) => keys.filter((key) => key !== keyWord));
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <ControlArea>
          <Input.TextArea
            value={keys.join()}
            onChange={(e) => setKeys(e.target.value.split(","))}
            placeholder="Input comma-separated keywords"
            rows={3}
            onPressEnter={() => setIsSearching(true)}
          />

          <Button
            disabled={!keys}
            icon={<SearchOutlined />}
            onClick={() => setIsSearching(true)}
          >
            Search
          </Button>

          <Button
            onClick={() => navigator.clipboard.writeText(keys.join())}
            disabled={!keys}
          >
            Copy
          </Button>

          <Button
            onClick={() => {
              setKeys([]);
              setIsSearching(false);
            }}
            disabled={!keys}
          >
            Clear
          </Button>

          <Select
            showSearch
            style={{ width: 200 }}
            value={country}
            placeholder="Country"
            optionFilterProp="children"
            filterOption={(input, option) => {
              return (
                COUNTRIES[option?.value]
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              );
            }}
            onChange={(value: string) => setCountry(value)}
          >
            {Object.keys(COUNTRIES).map((code) => (
              <Select.Option key={code} value={code}>
                <img
                  style={{ marginRight: "5px" }}
                  src={`https://flagcdn.com/16x12/${code.toLowerCase()}.png`}
                  alt=""
                />
                {" " + String((COUNTRIES as any)[code])}
              </Select.Option>
            ))}
          </Select>
        </ControlArea>
        {keys && isSearching && (
          <KeyTable
            keys={keys}
            country={country}
            onDeleteItem={deleteKeyWord}
          />
        )}
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
