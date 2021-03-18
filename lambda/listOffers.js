const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({ secret: "fnAEEkaW1KACAa6r0Iou3cm1Kj5ApMBxWxsk8ZLm" });

exports.handler = async () => {
  const doc = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index("offers"))),
      q.Lambda((x) => q.Get(x)),
    ),
  );
  const offers = doc.data;
  return {
    statusCode: 200,
    body: JSON.stringify({ offers }),
  };
};
