const faunadb = require("faunadb");
const lodash = require("lodash");

const q = faunadb.query;

const FAUNADB_SECRET = "fnAEEkaW1KACAa6r0Iou3cm1Kj5ApMBxWxsk8ZLm";

const client = new faunadb.Client({
  secret: FAUNADB_SECRET,
});

exports.handler = async () => {
  const doc = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index("offers"))),
      q.Lambda((x) => q.Get(x)),
    ),
  );

  console.log("doc", doc);

  const offers = doc.data;

  return {
    statusCode: 200,
    body: JSON.stringify({ offers }),
  };
};
