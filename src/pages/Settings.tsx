import Page from "../components/Page";
import { primaryColor, useSettings } from "../contexts/SettingsContext";

export function Settings() {
  const { changePrimaryColor, switchDarkMode, primaryColor, darkMode } =
    useSettings();

  const primaryColors = [
    { name: "Azure", color: "#2b91ff" },
    { name: "Coral", color: "#ff5252" },
    { name: "Turquoise", color: "#00acc1" },
    { name: "Amethyst", color: "#7b3cbe" },
    { name: "Sunset", color: "#bc600b" },
  ];

  return (
    <Page title="Settings" description="View and edit your settings">
      <div className="inline-flex items-center gap-2">
        <label className="flex items-center cursor-pointer relative">
          <input
            onChange={switchDarkMode}
            checked={darkMode}
            type="checkbox"
            aria-label="switch dark mode"
            className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-primary"
            id="check"
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <span>Dark Mode</span>
      </div>
      <label htmlFor="primaryColor" className="flex flex-col gap-1">
        Primary Color
        <select
          id="primaryColor"
          style={{ borderColor: primaryColor.color }}
          className="p-1 border-2 rounded-lg bg-solid dark:bg-solidDark outline-none"
          onChange={(e) => {
            changePrimaryColor(JSON.parse(e.target.value) as primaryColor);
          }}
        >
          <option value={JSON.stringify(primaryColor)}>
            {primaryColor.name}
          </option>
          {primaryColors.map((color, i) => (
            <option value={JSON.stringify(color)} key={i}>
              {color.name}
            </option>
          ))}
        </select>
      </label>
    </Page>
  );
}
