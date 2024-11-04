import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import Page from "../components/Page";

export function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError(t("invalid-email"));
      return;
    }
    if (password !== confirmedPassword) {
      setError(t("invalid-confirm-password"));
      return;
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      setError(t("invalid-password"));
      return;
    }

    const err = await register({ name, email, password });
    if (err) setError(err);
  };
  return (
    <Page title={t("title-signup")} description={t("desc-signup")}>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-solid dark:bg-solidDark mb-32">
          <h1 className="text-center capitalize text-3xl w-72 sm:w-80">
            {t("title-signup")}
          </h1>
          <form
            onSubmit={(e: FormEvent) => submit(e)}
            className="w-full flex flex-col gap-3 items-center"
          >
            <Input
              type="text"
              name="name"
              label={t("name")}
              value={name}
              required
              change={(e) => {
                if (
                  /^[a-zA-Z\s]*$/.test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setName(e.target.value);
                }
              }}
            />

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
            <Input
              type="password"
              name="confirmedPassword"
              label={t("confirm-password")}
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
              {t("action-signup")}
            </Button>
            <p>
              {t("question-signup")}{" "}
              <Link to="/login">
                <span className="text-primary">{t("link-signup")}</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Page>
  );
}
