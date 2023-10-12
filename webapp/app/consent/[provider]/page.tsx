"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/session/authUtils";
import { getUserByEmail } from "@/Components/actions/userActions";
import { useRouter } from "next/navigation";
import Container from "@/UI/container";
import { signOut } from "next-auth/react";

export default function Consent({
  params,
}: {
  params: {
    provider: string;
  };
}) {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    async function verifyIfIsNewUser() {
      const userData: any = await getCurrentUser();
      if (userData.email) {
        getUserByEmail(params.provider)
          .then((r) => {
            if (r.error) {
              throw r.error;
            }
            if (!r.isNewUser) {
              router.push("/dashboard");
            }
          })
          .catch((e) => {
            signOut({ callbackUrl: "/auth/error" });
          });
      }
    }

    verifyIfIsNewUser();
  }, [router]);

  // function handleCreateUser() {
  //   const data = {
  //     authProvider: params.provider,
  //     profileName: profileName,
  //   };
  //   if (user) {
  //     createUser(data)
  //       .then((r) => {
  //         if (r.error) {
  //           throw r.error;
  //         }
  //         toast("Thanks for signing up!");
  //         router.push("/");
  //       })
  //       .catch((e) => {
  //         // TODO: Redirect to auth error page
  //         signOut({ callbackUrl: "/" });
  //       });
  //   } else {
  //     toast.error("User Info Missing");
  //   }
  // }

  if (!isNewUser) return <></>;

  return (
    <Container displayAvatar={false}>
      hello
      {/*<div className="text-left">*/}
      {/*  <Heading*/}
      {/*    title={"Confirm Your Profile Name"}*/}
      {/*    subTitle={`You can modify from your profile page later`}*/}
      {/*  />*/}
      {/*  <input*/}
      {/*    required*/}
      {/*    type="text"*/}
      {/*    value={profileName}*/}
      {/*    onChange={(e) => setProfileName(e.target.value)}*/}
      {/*    placeholder="Profile Name"*/}
      {/*    className="mt-2 input-bordered input input-ghost w-full max-w-xs border focus:ring-0 focus:border-none"*/}
      {/*  />*/}
      {/*  <form method="dialog" className="modal-backdrop">*/}
      {/*    <button>close</button>*/}
      {/*  </form>*/}
      {/*</div>*/}
    </Container>
  );
}
