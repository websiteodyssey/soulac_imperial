import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { siteConfig, hasReservationUrl } from "../config/siteConfig";

interface ReserveButtonProps {
  className?: string;
  /** Libellé ; par défaut « Réserver ». */
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

/**
 * LE bouton « Réserver » du site — un seul composant, partout.
 *
 * Tant que `siteConfig.reservationUrl` est vide, il renvoie vers la page
 * Contact (aucun lien mort, aucun bouton inerte). Dès que l'URL est renseignée,
 * il ouvre le module de réservation dans un nouvel onglet — sans rien d'autre
 * à modifier dans le code.
 */
const ReserveButton = ({ className = "", label, children, onClick }: ReserveButtonProps) => {
  const { t } = useTranslation();
  const content = children ?? label ?? t("common.reserve");

  if (!hasReservationUrl) {
    return (
      <Link to="/contact" className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={siteConfig.reservationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {content}
    </a>
  );
};

export default ReserveButton;
