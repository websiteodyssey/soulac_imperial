import { media } from "../config/media";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image?: string;
}

const PageHero = ({ title, subtitle, image = media.interior }: PageHeroProps) => {
  return (
    <section className="relative h-[42vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-imperial-ink">
      <div className="absolute inset-0">
        <img src={image} alt="" className="img-cover kenburns" />
        <div className="absolute inset-0 bg-imperial-gradient" />
      </div>
      <div className="relative z-10 text-center px-6">
        <p className="eyebrow text-imperial-gold mb-5">{subtitle}</p>
        <h1 className="text-display-lg md:text-display-xl font-display text-imperial-cream font-medium">{title}</h1>
        <div className="hairline w-24 mx-auto mt-7" />
      </div>
    </section>
  );
};

export default PageHero;
