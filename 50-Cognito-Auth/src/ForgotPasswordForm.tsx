import * as React from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "./services/authServices";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");

  const handleForgotPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      navigate("/forgotpsw", { state: { email } });
    } catch (error) {
      alert(`Request failed: ${error}`);
    }
  };

  return (
    <React.Fragment>
      <h1>Welcome</h1>
      <h4>Reset forgotten password</h4>
      <form onSubmit={handleForgotPassword}>
        <div>
          <input
            className="inputText"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <button type="submit">Send Code to Email</button>
      </form>
    </React.Fragment>
  );
};

export default ForgotPasswordForm;
