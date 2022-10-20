import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Welcome: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    console.log(session.user);
  }

  return (
    <div>
      <Head>
        <title>SD MVP</title>
        <meta
          name="description"
          content="SD 2022.2 Class Project - Hospital MVP"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>
        Página de welcome! {session?.user?.name}
        <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      </h1>
    </div>
  );
};

export default Welcome;
