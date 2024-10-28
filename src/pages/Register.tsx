import { FormEvent, useState } from "react";
import { useContent } from "../contexts/ContentContext";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import Page from "../components/Page";

export function Register() {
  const content = useContent();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError(content.invalid.email);
      return;
    }
    if (password !== confirmedPassword) {
      setError(content.invalid.match);
      return;
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      setError(content.invalid.password);
      return;
    }

    const err = await register({ name, email, password });
    if (err) setError(err);
  };
  return (
    <Page title="Sign Up" description="register into Todo Ui web application.">
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-solid dark:bg-solidDark mb-32">
          <h1 className="text-center capitalize text-3xl w-72 sm:w-80">
            {content.register.title}
          </h1>
          <form
            onSubmit={(e: FormEvent) => submit(e)}
            className="w-full flex flex-col gap-3 items-center"
          >
            <Input
              type="text"
              name="name"
              label={content.labels.name}
              value={name}
              required
              change={(e) => {
                if (
                  /^[a-zA-Z]*$/.test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setName(e.target.value);
                }
              }}
            />
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
            <Input
              type="password"
              name="confirmedPassword"
              label={`confirm ${content.labels.password} `}
              value={confirmedPassword}
              required
              change={(e) => setConfirmedPassword(e.target.value)}
            />
            {error && (
              <span className="text-sm text-center text-danger capitalize">
                {error}
              </span>
            )}
            <Button
              disabled={!name || !email || !password || !confirmedPassword}
              full
              type="submit"
            >
              {content.register.action}
            </Button>
            <p className="capitalize">
              {content.register.link.split("?")[0]}?
              <Link to="/login">
                <span className="text-primary">
                  {content.register.link.split("?")[1]}
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Page>
  );
}
