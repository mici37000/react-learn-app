import useForm from "../../../hooks/useForm";
import styles from "./Login.module.scss";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
  [key: string]: string | boolean;
}

function Login() {
  const { values, handleChange, resetForm } = useForm<LoginForm>({
    email: "example@company.com",
    password: "",
    rememberMe: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);
    // Submit logic here
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={values.rememberMe}
            onChange={handleChange}
          />
          Remember me
        </label>
      </div>
      <div>
        <button type="submit">Login</button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default Login;
