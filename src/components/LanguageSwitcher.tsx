import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";

const LANGUAGES = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "en", label: "EN", name: "English" },
];

interface LanguageSwitcherProps {
  dark?: boolean;
}

const LanguageSwitcher = ({ dark }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // `i18n.language` peut valoir « fr-FR » : on compare sur le préfixe.
  const current =
    LANGUAGES.find((l) => i18n.language?.startsWith(l.code)) ?? LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const textColor = dark ? "text-luxury-cream" : "text-luxury-cream";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 ${textColor} hover:text-luxury-gold transition-colors font-body uppercase text-sm tracking-wide`}
        aria-label="Change language"
      >
        <Globe size={16} />
        {current.label}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-luxury-black border border-luxury-gold/30 shadow-xl z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm font-body transition-colors ${
                lang.code === current.code
                  ? "text-luxury-gold"
                  : "text-luxury-cream hover:text-luxury-gold"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
