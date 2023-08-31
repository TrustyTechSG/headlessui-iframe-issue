
const dataTag = "lastRevalidate";

export default async function Page({ params }) {
  const host = params.host;
  const response = await fetch(process.env.KV_REST_API_URL, {
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
    },
    body: `["HGET", "${host}", "${dataTag}"]`,
    method: "POST",
    next: {
      tags: [dataTag],
    },
  });

  const { result } = await response.json();

  return (
    <>
      <h3>Last revalidate: {result}</h3>
      <br />
      <a href={`/api/revalidate?tag=${dataTag}`}>Revalidate tag</a>
      <br />
      <br />
      <a href={`/api/revalidate`}>Revalidate path</a>
    </>
  );
}
