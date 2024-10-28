interface Props {
  title: string;
  description: string;
  value: string;
}

export function Widget({ title, description, value }: Props) {
  return (
    <div className="flex flex-col justify-between p-6 gap-1 rounded-xl bg-solid dark:bg-solidDark">
      <p className="text-xl">{title}</p>
      <h2 className="text-5xl font-bold text-center">{value}</h2>
      <p className="text-center">{description}</p>
    </div>
  );
}
