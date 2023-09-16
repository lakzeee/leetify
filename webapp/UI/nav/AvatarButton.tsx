import { AiOutlineUser } from "react-icons/ai";
import { User } from "next-auth";
import { BiLogIn, BiLogOut, BiUserPin } from "react-icons/bi";
import AuthModal from "@/UI/nav/AuthModal";
import { LogOut } from "@/Components/utils/authHelper";

type Props = {
  avatarChar?: string;
  user?: User;
};
export default function AvatarButton({ avatarChar, user }: Props) {
  return (
    <>
      <div className="dropdown dropdown-left">
        <div
          tabIndex={0}
          className="btn btn-ghost btn-circle avatar placeholder"
        >
          <div
            className={`${
              avatarChar ? "bg-accent" : "bg-neutral-content"
            } rounded-full w-9`}
          >
            {avatarChar ? (
              <span className="text-accent-content">{avatarChar}</span>
            ) : (
              <AiOutlineUser className="text-accent-content" size={24} />
            )}
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-0 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40 z-50"
        >
          {!user && (
            <li>
              <button
                onClick={() =>
                  // @ts-ignore
                  document.getElementById("auth_modal").showModal()
                }
              >
                <BiLogIn />
                Log In
              </button>
            </li>
          )}

          {user && (
            <>
              <li>
                <button>
                  <BiUserPin />
                  My Plans
                </button>
              </li>
              <li>
                <button onClick={() => LogOut()}>
                  <BiLogOut />
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      <AuthModal />
    </>
  );
}
