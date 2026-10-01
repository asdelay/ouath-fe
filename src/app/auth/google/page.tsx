export default async function GoogleAuthPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const code = params.code;
  const scope = params.scope;
  const iss = params.iss;
  const state = params.state;

  let userData: null | {
    userName: string;
    email: string;
    profilePic: string;
    files: string[];
  } = null;

  if (code && state) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/auth/google/callback`,
        {
          method: "POST",
          body: JSON.stringify({
            code: code,
            state: state,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const result = await response.json();
      console.log(result);
      userData = {
        userName: result.user.given_name,
        email: result.user.email,
        profilePic: result.user.picture,
        files: result.files,
      };
    } catch {
      console.log("some error catched on frontend");
    }
  } else {
    <h1>Auth error!</h1>;
  }

  return (
    <div className="flex justify-center items-center p-4">
      {userData ? (
        <div className="flex flex-col justify-center items-center text-2xl gap-4 mt-8">
          <img
            src={`${userData.profilePic}`}
            alt="user profile picture"
            referrerPolicy="no-referrer"
            className="size-30 rounded-full"
          />
          <div className="flex flex-col justify-center items-center">
            <b>{userData.userName}</b>
            <p className="text-lg">{userData.email}</p>
          </div>
          <div className="flex flex-col items-center">
            <b className="text-2xl">Google drive files:</b>
            <div className="flex flex-col items-center max-h-100 overflow-scroll">
              {userData.files.map((file, idx) => (
                <h1 className="text-sm my-2 italic" key={idx}>
                  {file}
                </h1>
              ))}
            </div>
            <i className="text-sm opacity-50">scroll down</i>
          </div>
        </div>
      ) : (
        <h1>Failed to log in :(</h1>
      )}
    </div>
  );
}
