import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto p-4 flex flex-col md:flex-row items-center justify-between">
        <span className="text-sm text-gray-500 text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://leetify.live" className="hover:underline">
            Leetify.live
          </a>{" "}
          All Rights Reserved.
        </span>

        <div className="flex flex-row gap-4 justify-center items-center mt-2 md:mt-0">
          <ul className="flex flex-row text-sm font-medium text-gray-500 dark:text-gray-400">
            <li>
              <a href="/privacypolicy.html" className="hover:underline mr-2">
                Privacy
              </a>
            </li>
            <li>
              <a href="/consent/termsofservice" className="hover:underline">
                Terms
              </a>
            </li>
          </ul>
          <div className="text-gray-500 dark:text-gray-400 w-auto flex items-end justify-center gap-4">
            <a href="https://github.com/lakzeee">
              <AiFillGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/zehucai/">
              <AiFillLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
