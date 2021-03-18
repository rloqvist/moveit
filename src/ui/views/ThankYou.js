import React from "react";
import { useParams } from "react-router-dom";

import { Section } from "ui/components/Section";
import { Layout } from "ui/components/Layout";

const ThankYou = () => {
  const { offerId } = useParams();

  return (
    <Layout title="Tack!">
      <Section title="Din offert är nu godkänd!">
        <div>
          Offer med ordernummer {offerId} är nu godkänt. Gå till <a href={`/review/${offerId}`}>/review/{offerId}</a>{" "}
          för att åter granska din offert.
        </div>
      </Section>
    </Layout>
  );
};

export default ThankYou;
