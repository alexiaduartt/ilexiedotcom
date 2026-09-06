import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function Section({
  title,
  children,
}: SectionProps) {
  return (
    <section className="mb-20">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        {title}
      </h2>

      {children}
    </section>
  );
}