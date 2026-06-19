import { QRCodeSVG } from "qrcode.react";

interface QrCodeBlockProps {
  url: string;
  label?: string;
  size?: number;
  className?: string;
}

const QrCodeBlock = ({ url, label, size = 160, className = "" }: QrCodeBlockProps) => (
  <div className={`inline-flex flex-col items-center gap-3 bg-imperial-cream p-4 ${className}`}>
    <QRCodeSVG
      value={url}
      size={size}
      bgColor="#F9F2E7"
      fgColor="#14181D"
      level="M"
    />
    {label && (
      <p className="font-body text-xs uppercase tracking-imperial text-imperial-ink/70 text-center">
        {label}
      </p>
    )}
  </div>
);

export default QrCodeBlock;
