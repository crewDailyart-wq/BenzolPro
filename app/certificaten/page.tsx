import CertificatesClient from "./CertificatesClient";

export const metadata = {
  title: "Certificaten — BenzolPro",
  description: "Officiële certificaten en kwaliteitsnormen van Benzol motorolie, met downloadbare specificatiebladen (PDF).",
};

export default function CertificatenPage() {
  return <CertificatesClient />;
}
