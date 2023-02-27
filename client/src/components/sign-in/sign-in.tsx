import FormInput from "../form-input/form-input";
import { ReactComponent as Logo } from "../../logo.svg";
import { getData } from "../../utils/data-utils";
import { ChangeEvent, FormEvent } from "react";
import { User } from "../../types/componentTypes";

export default function SignIn({
  onReset,
  formFields,
  onReload,
  setUser,
  setFormFields,
}: any) {
  const { email, password } = formFields;
  // handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // make the API call
      const res: User = await getData(
        "http://localhost:8000/login",
        email,
        password
      );
      setUser(res);
      onReset();
    } catch (error) {
      alert("User Sign In Failed");
    }
  };
  return (
    <div className="card">
      <Logo className="logo" />
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />
        <div className="button-group">
          <button type="submit">Sign In</button>
          <span>
            <button type="button" onClick={onReload}>
              Clear
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}
