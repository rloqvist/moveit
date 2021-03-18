const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({ secret: "fnAEEkaW1KACAa6r0Iou3cm1Kj5ApMBxWxsk8ZLm" });

exports.handler = async ({ body }) => {
  const { offer } = JSON.parse(body || "") || {};
  const created = await client.query(q.Create(q.Collection("offers"), { data: offer }));
  ref = created.ref;
  return {
    statusCode: 200,
    body: JSON.stringify({ ref }),
  };
};
