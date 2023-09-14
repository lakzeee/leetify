import { getSession } from "next-auth/react";
import { getCurrentUser, getTokenWorkAround } from "@/app/session/authUtils";

export default async function Page() {
  const session = await getSession();
  const token = await getTokenWorkAround(true);
  const user = await getCurrentUser();

  return (
    <div>
      <h1 title="Session Dashboard" />
      <div>
        <h3>Current User</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div>
        <h3>Session Data</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      <div>
        <h3>Token Data</h3>
        <pre>{JSON.stringify(token, null, 2)}</pre>
      </div>
    </div>
  );
}
