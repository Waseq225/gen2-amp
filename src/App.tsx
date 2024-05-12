import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Todo } from "./TodoList";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          {user && <Todo user={user} />}
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </Authenticator>
  );
}

export default App;
