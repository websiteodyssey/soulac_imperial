import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

/** Consistent heading + prose block for the legal / privacy pages. */
const LegalSection = ({ title, children }: LegalSectionProps) => (
  <Reveal className="mt-12 first:mt-0">
    <h2 className="font-display text-2xl md:text-3xl text-luxury-gold mb-4">{title}</h2>
    <div className="space-y-4 font-body text-luxury-champagne/80 leading-relaxed">{children}</div>
  </Reveal>
);

export default LegalSection;
