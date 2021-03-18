const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({ secret: "fnAEEkaW1KACAa6r0Iou3cm1Kj5ApMBxWxsk8ZLm" });

exports.handler = async ({ queryStringParameters }) => {
  const { offerId } = queryStringParameters;
  const doc = await client.query(q.Get(q.Ref(q.Collection("offers"), offerId)));
  const offer = doc.data;
  return {
    statusCode: 200,
    body: JSON.stringify({ offer }),
  };
};
