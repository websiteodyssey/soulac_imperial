import { useTranslation } from "react-i18next";
import { Printer } from "lucide-react";
import QrCodeBlock from "../components/QrCodeBlock";

const TABLE_COUNT = 12;

const QrCodes = () => {
  const { t } = useTranslation();
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="bg-imperial-cream min-h-screen pt-20">
      <div className="section-padding py-12 md:py-16">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 print:hidden">
          <div>
            <h1 className="text-display-md font-display text-imperial-ink">{t("qrCodes.pageTitle")}</h1>
            <p className="font-body text-imperial-gray-dark mt-2">{t("qrCodes.pageSubtitle")}</p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 border border-imperial-gold text-imperial-ink px-5 py-3 uppercase text-sm tracking-imperial hover:bg-imperial-gold/10"
          >
            <Printer size={16} /> {t("qrCodes.print")}
          </button>
        </div>

        <p className="font-body text-imperial-gray-dark max-w-2xl mb-10 print:hidden">
          {t("qrCodes.instructions")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 print:grid-cols-2 print:gap-8">
          {Array.from({ length: TABLE_COUNT }, (_, i) => i + 1).map((tableNumber) => (
            <div
              key={tableNumber}
              className="imperial-card p-6 flex flex-col items-center gap-4 text-center break-inside-avoid"
            >
              <h2 className="font-display text-xl text-imperial-ink">
                {t("qrCodes.tableLabel", { number: tableNumber })}
              </h2>
              <QrCodeBlock url={`${baseUrl}/carte?table=${tableNumber}`} label={t("qrCodes.scanLabel")} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QrCodes;
