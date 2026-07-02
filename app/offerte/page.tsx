import OfferteClient from "./OfferteClient";

export const metadata = {
  title: "Offerte aanvragen — BenzolPro",
  description: "Vraag scherpe staffelprijzen aan voor jouw garage of werkplaats.",
  robots: { index: false },
};

export default function OffertePage() {
  return <OfferteClient />;
}
