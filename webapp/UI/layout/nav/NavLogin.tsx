import { signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { BiLogIn, BiUserPin } from "react-icons/bi";

// @ts-ignore
export default function NavLogin({ user }) {
  const router = useRouter();
  const curPath = usePathname();

  function handleAfterClick() {
    const elem = document.activeElement;
    // @ts-ignore
    elem?.blur();
  }

  return (
    <>
      <ul
        tabIndex={0}
        className="mt-0 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40 z-50"
      >
        {!user && (
          <li>
            <button onClick={() => signIn()}>
              <BiLogIn />
              SignIn
            </button>
          </li>
        )}

        {user && (
          <>
            <li>
              <button>
                <BiUserPin />
                My Auctions
              </button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}
