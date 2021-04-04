import { styled } from "@material-ui/core";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { KeysInputArea } from "./components/KeysInputArea";
import { KeyTable } from "./components/KeyTable";
const queryClient = new QueryClient();

function App() {
  const [keysString, setKeysString] = useState<string | null>(null);
  const keys = new Set(keysString?.split(","));

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <KeysInputArea onSubmit={setKeysString} />
        <br />
        {keys && <KeyTable keys={Array.from(keys)} />}
      </AppWrapper>
    </QueryClientProvider>
  );
}

const AppWrapper = styled("main")({
  padding: "16px",
  maxWidth: "1080px",
  margin: "0 auto",
});

export default App;
