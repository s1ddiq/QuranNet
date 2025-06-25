import React from "react";

const SettingSection = ({
  title,
  description,
  control,
}: {
  title: string;
  description: string;
  control: any;
}) => (
  <section className="space-y-2">
    <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
      {title}
    </h2>
    {control}
    {description && (
      <p className="text-sm text-black dark:text-zinc-400">{description}</p>
    )}
  </section>
);

export default SettingSection;
