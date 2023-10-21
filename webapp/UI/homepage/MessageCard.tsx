type Props = {
  userName: string;
};
export default function MessageCard({ userName = "" }: Props) {
  return (
    <div className="block max-w-sm lg:max-w-3xl w-full p-6 bg-white border-gray-200 rounded-lg shadow dark:bg-gray-800">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Welcome {userName}
      </h2>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Thank you so much for trying out Leetify! I hope you find Leetify
        helpful for your coding interview preparation. If you encounter any
        problems or have any feedback, please feel free to contact me via
        leetify.live@gmail.com or DM me on{" "}
        <a href="https://www.linkedin.com/in/zehucai/" className="underline">
          LinkedIn
        </a>
        . I am committed to making Leetify better and better. There are more
        features to come. Stay tuned!
      </p>
      <h3 className="mt-2 text-xl tracking-tight text-gray-900 dark:text-white">
        How to get started?
      </h3>
      <p className="mt-2 font-normal text-gray-700 dark:text-gray-400">
        The dashboard page you are seeing right now probably has a lot going on.
        To get started, you can create a new LeetCode plan or save an existing
        plan.
      </p>
      <p className="ml-4 mt-2 font-normal text-gray-700 dark:text-gray-400">
        - To create a new plan, click the menu button on the top left side of
        the page, go to My Plans, and create a new plan by clicking the "Create
        Plan" button.
      </p>
      <p className="ml-4 font-normal text-gray-700 dark:text-gray-400">
        - To save an existing plan, click the menu button on the top left side
        of the page, go to Explore Plans, and save a new plan by clicking the
        heart button.
      </p>
      <p className="mt-2 font-normal text-gray-700 dark:text-gray-400">
        After you create or save a plan, go back to My Plans, click on one of
        the plans, and then you can start making progress.
      </p>
    </div>
  );
}
