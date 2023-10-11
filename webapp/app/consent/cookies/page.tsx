import Container from "@/UI/container";

export default function Cookies() {
  return (
    <Container>
      <h1 className="text-3xl">Manage Cookies </h1>
      Cookies are small text files that are stored on your device when you visit
      a website. We use cookies to provide a better user experience, analyze how
      users interact with our website, and to personalize content and ads.
      Please note that by disabling certain cookies, you may limit your ability
      to use certain features of our website. Cookies we use We use cookies to
      provide a better experience on our website and to understand how visitors
      interact with our content.
      <h2 className="text-2xl">Here are the cookies we use</h2>
      <h3 className="text-xl">Stripe (strictly necessary)</h3>
      We use stripe as our payment gateway which allows websites to process
      online payments securely and easily. When a user makes a payment on your
      website using Stripe, their payment information (such as their credit card
      details) needs to be stored temporarily while the payment is being
      processed. Please review the https://stripe.com/cookie-settings settings
      to configure your stripe cookies. To enable this, Stripe uses cookies to
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      store information about the user's session, such as their session ID and
      the status of their payment. These cookies are necessary for the payment
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      process to work properly, and they are stored on the user's browser until
      the payment process is complete. In addition to payment-related cookies,
      Stripe may also use other cookies on your website to improve performance,
      analyze how users interact with the website, and provide relevant
      advertising. However, these additional cookies are optional and you can
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      choose to disable them if you prefer. Stripe's use of cookies is subject
      to their own privacy policy, which you should review if you have any
      specific concerns.
      <h3 className="text-xl">Authentication (strictly necessary)</h3>We use
      next-auth to authenticate users on our application. Next-auth is a library
      which allows users to authenticate using various third party services,
      such as google, which makes it easy to sign up and start using our
      application.
    </Container>
  );
}
