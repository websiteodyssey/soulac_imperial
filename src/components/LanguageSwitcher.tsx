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

const LanguageSwitcher = ({ dark = true }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current =
    LANGUAGES.find((l) => l.code === i18n.language.split("-")[0]) ?? LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const textColor = dark ? "text-imperial-cream" : "text-imperial-ink";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 ${textColor} hover:text-imperial-gold transition-colors font-body uppercase text-xs tracking-[0.2em]`}
        aria-label="Change language"
      >
        <Globe size={13} strokeWidth={1.5} />
        {current.label}
        <ChevronDown size={11} strokeWidth={1.5} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-imperial-ink border border-imperial-gold/30 shadow-xl z-50">
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
                  ? "text-imperial-gold"
                  : "text-imperial-cream hover:text-imperial-gold"
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
