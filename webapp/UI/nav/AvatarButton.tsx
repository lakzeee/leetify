import { AiOutlineUser } from "react-icons/ai";
import { User } from "next-auth";
import { BiLogIn, BiLogOut, BiUserPin } from "react-icons/bi";
import AuthModal from "@/UI/nav/AuthModal";
import { LogOut } from "@/Components/utils/authHelper";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  user?: User;
  alt: string;
};
export default function AvatarButton({ user, alt }: Props) {
  const router = useRouter();
  return (
    <>
      <div className="dropdown dropdown-left">
        <div
          tabIndex={0}
          className="btn btn-ghost btn-circle avatar placeholder"
        >
          <div className="bg-gray-100 rounded-full w-9">
            {user?.image ? (
              <Image alt={alt} src={user.image} width={30} height={30} />
            ) : (
              <AiOutlineUser className="text-gray-600" size={24} />
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
                <button onClick={() => router.push("/me")}>
                  <BiUserPin />
                  Profile
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
