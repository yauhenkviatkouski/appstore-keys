import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import { KeysInputArea } from "./components/KeysInputArea";
import { KeyTable } from "./components/KeyTable";
const queryClient = new QueryClient();

function App() {
  const [keysString, setKeysString] = useState<string | null>(null);
  const [country, setCountry] = useState<string>("");
  const keys = new Set(keysString?.split(","));

  function onSubmitInputArea(keys: string, country: string) {
    setKeysString(keys);
    setCountry(country);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <KeysInputArea
          onSubmit={(keys, country) => onSubmitInputArea(keys, country)}
        />
        <br />
        {keys && <KeyTable keys={Array.from(keys)} country={country} />}
      </AppWrapper>
    </QueryClientProvider>
  );
}

const AppWrapper = styled.main`
  padding: 16px;
  max-width: 1080px;
  margin: 0 auto;
`;

export default App;
