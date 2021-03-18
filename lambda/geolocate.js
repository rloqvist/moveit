const fetch = require("node-fetch");
const lodash = require("lodash");
const LRU = require("lru-cache");

const { set, get } = lodash;

const GEOCODE_TOKEN = "40a830d84a0e492c8de721043db1e86f";
const GEOCODE_URL = "https://api.opencagedata.com/geocode/v1/json";

const cache = new LRU();
const ttl = 15 * 60 * 1000;

const fields = [
  //"components.city",
  //"components.road",
  //"components.postcode",
  //"components.house_number",
  "geometry.lat",
  "geometry.lng",
  "formatted",
];

exports.handler = async ({ body }) => {
  const { q } = JSON.parse(body || "") || {};
  let results = [];

  if (cache.has(q)) {
    results = cache.get(q);
  } else {
    const url =
      GEOCODE_URL +
      Object.entries({
        q: encodeURIComponent(q),
        key: GEOCODE_TOKEN,
        limit: 5,
        countrycode: "se",
        confidence: 5,
      }).reduce((acc, [key, value]) => `${acc}&${key}=${value}`, "?");
    console.log(url);
    const result = await fetch(url);
    if (result.status === 200) {
      const data = await result.json();
      results = data.results.map((item) =>
        fields.reduce((acc, curr) => set(acc, curr.split(".").slice(-1), get(item, curr)), {}),
      );
      cache.set(q, results, ttl);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ results }),
  };
};
