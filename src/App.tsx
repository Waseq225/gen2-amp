import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { EcUpdate } from "./EcUpdate";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <EcUpdate user={user} />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </Authenticator>
  );
}

export default App;
