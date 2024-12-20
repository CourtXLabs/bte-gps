const TermsOfServicePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
        <p className="mb-4">
          Welcome to Courtside Xperience Labs Inc.&apos;s Terms of Service. By using our services, you agree to these
          terms. Please read them carefully.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">2. Use of Services</h2>
        <p className="mb-4">
          You must follow any policies made available to you within the Services. Don&apos;t misuse our Services. For
          example, don&apos;t interfere with our Services or try to access them using a method other than the interface
          and the instructions that we provide.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">3. Privacy</h2>
        <p className="mb-4">
          Our privacy policies explain how we treat your personal data and protect your privacy when you use our
          Services. By using our Services, you agree that we can use such data in accordance with our privacy policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">4. Modifications to the Service</h2>
        <p className="mb-4">
          We are constantly changing and improving our Services. We may add or remove functionalities or features, and
          we may suspend or stop a Service altogether.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">5. Termination</h2>
        <p className="mb-4">
          We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we
          are investigating suspected misconduct.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">6. Contact Information</h2>
        <p className="mb-4">If you have any questions about these Terms, please contact us at:</p>
        <address className="not-italic">
          <p>Courtside Xperience Labs Inc.</p>
          <p>Country: USA</p>
          <p>
            Email:{" "}
            <a href="mailto:info@beattheexpert.com" className="text-blue-600 hover:underline">
              info@beattheexpert.com
            </a>
          </p>
        </address>
      </section>
    </div>
  )
}

export default TermsOfServicePage
