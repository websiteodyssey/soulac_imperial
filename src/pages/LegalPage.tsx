import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

interface Section {
  h: string;
  p: string;
}

const LegalPage = ({ kind }: { kind: "legal" | "privacy" }) => {
  const { t } = useTranslation();
  const sections = t(`${kind}.sections`, { returnObjects: true }) as unknown as Section[];

  return (
    <div>
      <PageHero title={t(`${kind}.pageTitle`)} subtitle={t(`${kind}.pageSubtitle`)} />
      <section className="py-16 md:py-24 bg-imperial-ink">
        <div className="section-padding max-w-3xl mx-auto space-y-10">
          {(Array.isArray(sections) ? sections : []).map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <h2 className="font-display text-2xl md:text-3xl text-imperial-cream mb-3">{s.h}</h2>
              <div className="hairline w-12 mb-4" />
              <p className="font-body font-light text-imperial-cream/70 leading-relaxed">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
