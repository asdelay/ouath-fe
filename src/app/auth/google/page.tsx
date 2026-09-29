export default async function GoogleAuthPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const code = params.code;
  const scope = params.scope;
  const iss = params.iss;

  if (code) {
    // send code on backend
  } else {
    <h1>Auth error!</h1>;
  }

  return <div>Code: {code}</div>;
}
