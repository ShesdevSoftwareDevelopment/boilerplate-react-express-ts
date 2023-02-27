import { useState } from "react";
import Homepage from "../homepage/homepage";
import SignIn from "../sign-in/sign-in";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function AppHeader({ user, setUser }: any) {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  // handle input changes
  const reload = () => {
    setUser(null);
    resetFormFields();
  };

  return (
    <div className="App-header">
      <h1>{user && `Welcome! ${user.name}`}</h1>
      {user && <Homepage onLogout={reload} />}
      {!user && (
        <SignIn
          onReload={reload}
          onReset={resetFormFields}
          setFormFields={setFormFields}
          setUser={setUser}
          formFields={formFields}
        />
      )}
    </div>
  );
}
