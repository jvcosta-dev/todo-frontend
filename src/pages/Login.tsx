import { FormEvent, useState } from "react";
import { useContent } from "../contexts/ContentContext";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

export function Login() {
  const content = useContent();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError(content.invalid.email);
      return;
    }
    if (!/[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      setError(content.invalid.password);
      return;
    }
    await login({ email, password });
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white mb-32">
        <h1 className="text-center capitalize text-3xl w-80">
          {content.login.title}
        </h1>
        <form
          onSubmit={(e: FormEvent) => submit(e)}
          className="w-full flex flex-col gap-3 items-center"
        >
          <Input
            type="email"
            name="email"
            label={content.labels.email}
            value={email}
            required
            change={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            label={content.labels.password}
            value={password}
            required
            change={(e) => setPassword(e.target.value)}
          />
          {error && (
            <span className="text-sm text-center text-danger capitalize">
              {error}
            </span>
          )}
          <Button disabled={!email || !password} type="submit">
            {content.login.action}
          </Button>
          <p className="capitalize">
            {content.login.link.split("?")[0]}?
            <Link to="/signup">
              <span className="text-primary">
                {content.login.link.split("?")[1]}
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
