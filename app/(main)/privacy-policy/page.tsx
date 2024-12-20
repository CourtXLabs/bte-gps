export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
        <p className="mb-4">
          Welcome to Courtside Xperience Labs Inc.&apos;s Privacy Policy. This Privacy Policy describes how we collect,
          use, process, and disclose your information, including personal information, in conjunction with your access
          to and use of Courtside Xperience Labs Inc.&apos;s services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>
        <p className="mb-4">We collect several types of information from and about users of our services, including:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>
            Personal Information: This may include your name, email address, postal address, phone number, and other
            identifiers by which you may be contacted online or offline.
          </li>
          <li>
            Usage Information: Details of your visits to our website, including traffic data, location data, logs, and
            other communication data and the resources that you access and use on the website.
          </li>
          <li>
            Device Information: Information about your computer and internet connection, including your IP address,
            operating system, and browser type.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">How We Use Your Information</h2>
        <p className="mb-4">
          We use information that we collect about you or that you provide to us, including any personal information:
        </p>
        <ul className="mb-4 list-disc pl-6">
          <li>To provide and maintain our services</li>
          <li>To notify you about changes to our services</li>
          <li>To allow you to participate in interactive features of our services when you choose to do so</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our services</li>
          <li>To monitor the usage of our services</li>
          <li>To detect, prevent and address technical issues</li>
          <li>
            To provide you with news, special offers and general information about other goods, services and events
            which we offer
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Changes to Our Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the &quot;Last Modified&quot; date at the top of this Privacy Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
        <p className="mb-4">
          To ask questions or comment about this Privacy Policy and our privacy practices, contact us at:
        </p>
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
