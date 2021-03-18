import { schema } from "utils/validation";

it("Test validation", () => {
  const offer = {
    given_name: "qwer",
    family_name: "qwer",
    email: "qwer@qwer.qewr",
    phone: "023453045",
    move_from: {
      lat: 59.2854236,
      lng: 17.915482,
      formatted: "Sätra, Stockholms kommun, Stockholm County, Sweden",
    },
    move_to: {
      lat: 59.8184191,
      lng: 17.4749741,
      formatted: "755 91 Uppsala, Sweden",
    },
    area: "12",
    co_area: "",
    heavy_objects: [],
    packaging_help: "yes",
  };

  expect(schema.isValidSync(offer)).toBe(true);
});
