import { signIn } from "next-auth/react";

export default function AuthModal() {
  return (
    <dialog id="auth_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Welcome</h3>
        <button
          onClick={() => signIn("github", { callbackUrl: "/consent/github" })}
          className="btn btn-primary"
        >
          Log In with GitHub
        </button>
        <button
          onClick={() => signIn("google", { callbackUrl: "/consent/google" })}
          className="btn btn-primary"
        >
          Log In with Google
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
