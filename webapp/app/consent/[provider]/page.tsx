"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/session/authUtils";
import { createUser, getUserByEmail } from "@/Components/actions/userActions";
import { useRouter } from "next/navigation";
import Container from "@/UI/container";
import ConsentCheckBox from "@/app/consent/[provider]/ConsentCheckBox";
import { signOut } from "next-auth/react";
import { UserSes } from "@/types";
import toast from "react-hot-toast";

export default function Consent({ params }: { params: { provider: string } }) {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(false);
  const [isConsent, setIsConsent] = useState(false);
  const [user, setUser] = useState<UserSes>();

  useEffect(() => {
    async function fetchUserInfo() {
      const user: any = await getCurrentUser();
      if (user) setUser(user);
    }

    async function verifyIfIsNewUser() {
      const userData: any = await getCurrentUser();
      if (userData.email) {
        getUserByEmail(userData.email)
          .then((r) => {
            if (r.error) {
              throw r.error;
            }
            if (!r.isNewUser) {
              router.push("/");
            } else {
              fetchUserInfo();
              setIsNewUser(true);
            }
          })
          .catch((e) => {
            // TODO: Redirect to auth error page
            signOut({ callbackUrl: "/" });
          });
      }
    }

    verifyIfIsNewUser();
  }, []);

  function handleCreateUser() {
    const data = {
      name: "",
      email: "",
      authProvider: params.provider,
      isConsent: isConsent,
    };
    if (user) {
      data.name = user.name;
      data.email = user.email;
      createUser(data)
        .then((r) => {
          if (r.error) {
            throw r.error;
          }
          toast("Thanks for signing up!");
          router.push("/");
        })
        .catch((e) => {
          // TODO: Redirect to auth error page
          signOut({ callbackUrl: "/" });
        });
    } else {
      toast.error("User Info Missing");
    }
  }

  if (!isNewUser) return <></>;

  return (
    <Container displayAvatar={false}>
      <div className="text-left">
        <div className="text-2xl text-accent font-bold">
          {"Accept Privacy Policy & Terms of Service"}
        </div>
        <div className="font-light mt-2">
          {
            "Please acknowledge the following terms and conditions to finish creating your account."
          }
        </div>
        <ConsentCheckBox
          value={isConsent}
          handleChange={(value) => {
            setIsConsent(value);
          }}
        />
        <button
          className={`btn btn-primary btn-sm mr-2 ${
            !isConsent && "btn-disabled"
          }`}
          onClick={handleCreateUser}
        >
          Submit
        </button>
        <button
          className="btn btn-neutral btn-sm"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Cancel SignUp
        </button>
      </div>
    </Container>
  );
}
