import type { ReactNode } from "react";

interface GoldFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a media element in the recurring offset gold hairline + soft halo on
 * hover — the signature framing used for every image and carousel on the site.
 */
const GoldFrame = ({ children, className = "" }: GoldFrameProps) => (
  <div className={`relative gold-glow ${className}`}>
    <div className="absolute -inset-3 border border-luxury-gold/30 pointer-events-none" />
    {children}
  </div>
);

export default GoldFrame;
