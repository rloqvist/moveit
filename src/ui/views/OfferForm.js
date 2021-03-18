import React from "react";

import { Textable } from "ui/components/input/Textable";
import { Searchable } from "ui/components/input/Searchable";
import { Separable } from "ui/components/input/Separable";
import { Radio } from "ui/components/radio/Radio";
import { WrappedFormState } from "utils/formState";
import { schema, initialValues } from "utils/validation";
import { request } from "utils/request";
import { Section } from "ui/components/Section";
import { SubmitButton } from "ui/components/SubmitButton";
import { Layout } from "ui/components/Layout";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${window.location.host}/.netlify/functions`
    : "http://localhost:3001";

const OfferForm = () => {
  const handleSearch = async (q) => {
    const url = baseUrl + "/geolocate";
    const data = await request({ url, data: { q }, method: "POST" });
    const options = data.results.map((result) => ({ label: result.formatted, value: result }));

    return options;
  };

  return (
    <WrappedFormState initialValues={initialValues} schema={schema}>
      <Layout title="Offertförfrågan för bohagsflytt">
        <Section title="Kontaktuppgifter" index={1}>
          <div>
            <div>förnamn</div>
            <Textable name="given_name" />
          </div>
          <div>
            <div>efternamn</div>
            <Textable name="family_name" />
          </div>
          <div>
            <div>e-post</div>
            <Textable name="email" />
          </div>
          <div>
            <div>mobilnummer</div>
            <Textable name="phone" mask="phone" />
          </div>
        </Section>
        <Section title="Adressuppgifter" index={2}>
          <div>
            <div>från vilken adress ska du flytta?</div>
            <Searchable name="move_from" placeholder="adress, postnummer, stad" onSearch={handleSearch} />
          </div>
          <div>
            <div>till vilken adress ska du flytta?</div>
            <Searchable name="move_to" placeholder="adress, postnummer, stad" onSearch={handleSearch} />
          </div>
        </Section>
        <Section title="Flyttuppgifter" index={3}>
          <div>
            <div>bostadens yta i kvm</div>
            <Textable name="area" mask="area" />
          </div>
          <div>
            <div>eventuell biyta, vind, förråd etc i kvm</div>
            <Textable name="co_area" mask="area" />
          </div>
          <div>
            <div>eventuella skrymmande saker så som piano etc?</div>
            <Separable name="heavy_objects" />
          </div>
          <div>
            <div>behövs packhjälp?</div>
            <Radio name="packaging_help" />
          </div>
        </Section>
        <SubmitButton />
      </Layout>
    </WrappedFormState>
  );
};

export default OfferForm;
