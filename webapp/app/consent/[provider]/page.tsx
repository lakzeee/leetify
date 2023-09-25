"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/session/authUtils";
import { createUser, getUserByEmail } from "@/Components/actions/userActions";
import { useRouter } from "next/navigation";
import Container from "@/UI/container";
import ConsentCheckBox from "@/app/consent/[provider]/ConsentCheckBox";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Heading from "@/UI/heading";
import CookiesStrictlyCheckBox from "@/app/consent/[provider]/CookiesStrictlyCheckBox";
import CookiesFunctionalCheckBox from "@/app/consent/[provider]/CookiesFunctionalCheckBox";

export default function Consent({ params }: { params: { provider: string } }) {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(false);
  const [isConsent, setIsConsent] = useState(false);
  const [isStrictlyCookiesConsent, setIsStrictlyCookiesConsent] =
    useState(true);
  const [isFunctionalCookiesConsent, setIsFunctionalCookiesConsent] =
    useState(true);
  const [profileName, setProfileName] = useState("");
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function fetchUserInfo() {
      const user: any = await getCurrentUser();
      if (user) setUser(user);
    }

    async function verifyIfIsNewUser() {
      const userData: any = await getCurrentUser();
      setProfileName(userData.name);
      if (userData.email) {
        getUserByEmail()
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
            signOut({ callbackUrl: "/" });
          });
      }
    }

    verifyIfIsNewUser();
  }, [router]);

  function handleCreateUser() {
    const data = {
      name: "",
      email: "",
      authProvider: params.provider,
      isConsent: isConsent,
      isStrictlyCookiesConsent: isStrictlyCookiesConsent,
      isFunctionalCookiesConsent: isFunctionalCookiesConsent,
      profileName: profileName,
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
          {"About Cookies Policy, Privacy Policy & Terms of Service"}
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
        <CookiesStrictlyCheckBox
          value={isStrictlyCookiesConsent}
          handleChange={(value) => setIsStrictlyCookiesConsent(value)}
        />

        <CookiesFunctionalCheckBox
          value={isFunctionalCookiesConsent}
          handleChange={(value) => setIsFunctionalCookiesConsent(value)}
        />

        <button
          className={`btn btn-primary btn-sm mr-2 ${
            (!isStrictlyCookiesConsent || !isConsent) && "btn-disabled"
          }`}
          onClick={() =>
            // @ts-ignore
            document.getElementById("profileName_modal").showModal()
          }
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
      <dialog id="profileName_modal" className="modal modal-middle">
        <form method="dialog" className="modal-box max-w-sm">
          <Heading
            title={"Confirm Your Profile Name"}
            subTitle={`You can modify from your profile page later`}
          />
          <input
            type="text"
            value={profileName}
            onChange={(e) => e.target.value}
            placeholder="Profile Name"
            className="mt-2 input input-ghost w-full max-w-xs focus:ring-0 focus:border-none"
          />

          <div className="modal-action flex flex-row gap-2 mt-4 justify-start">
            <button
              className="btn btn-sm btn-outline"
              onClick={handleCreateUser}
            >
              Confirm
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </Container>
  );
}
