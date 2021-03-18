const faunadb = require("faunadb");
const lodash = require("lodash");

const q = faunadb.query;

const FAUNADB_SECRET = "fnAEEkaW1KACAa6r0Iou3cm1Kj5ApMBxWxsk8ZLm";

const client = new faunadb.Client({
  secret: FAUNADB_SECRET,
});

exports.handler = async ({ queryStringParameters }) => {
  const { offerId } = queryStringParameters;

  //const doc = client.query(q.get(q.ref(q.collection("offers"), offerId)))
  console.log("offerId", offerId);

  const doc = await client.query(q.Update(q.Ref(q.Collection("offers"), offerId), { data: { accepted: true } }));

  const offer = doc.data;

  return {
    statusCode: 200,
    body: JSON.stringify({ offer }),
  };
};
