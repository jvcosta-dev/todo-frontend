import { useTranslation } from "react-i18next";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Page from "../components/Page";

export function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError(t(""));
      return;
    }
    const err = await login({ email, password });
    if (err) setError(err);
  };
  return (
    <Page title={t("title-login")} description={t("desc-login")}>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-solid dark:bg-solidDark mb-32">
          <h1 className="text-center capitalize text-3xl w-72 sm:w-80">
            {t("title-login")}
          </h1>
          <form
            onSubmit={(e: FormEvent) => submit(e)}
            className="w-full flex flex-col gap-3 items-center"
          >
            <Input
              type="email"
              name="email"
              label={"email"}
              value={email}
              required
              change={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              label={t("password")}
              value={password}
              required
              change={(e) => setPassword(e.target.value)}
            />
            {error && (
              <span className="text-sm text-center text-danger capitalize">
                {error}
              </span>
            )}
            <Button disabled={!email || !password} full type="submit">
              {t("action-login")}
            </Button>
            <p>
              {t("question-login")}{" "}
              <Link to="/signup">
                <span className="text-primary">{t("link-login")}</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Page>
  );
}
