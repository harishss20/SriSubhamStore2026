export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>

      <p>
        Sri Subham Stores Private Limited ("we", "our", or "us") respects your privacy and is committed to protecting the personal information you share with us through our mobile application Subham (the "App"). This Privacy Policy explains how we collect, use, and protect your information when you use our services.
      </p>

      <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Full Name</li>
        <li>Phone Number</li>
        <li>Home Address</li>
        <li>Pincode</li>
        <li>Geo-location (for delivery purposes)</li>
        <li>Razorpay-related identifiers (e.g., payment reference IDs, wallet IDs)</li>
      </ul>
      <p>We do not collect card numbers or UPI PINs. All payment processing is handled securely by Razorpay.</p>

      <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>To process and fulfill your orders</li>
      </ul>
      <p>We do not use your data for advertising or promotional messaging.</p>

      <h2 className="text-2xl font-semibold">3. Third-Party Services We Use</h2>

      <p>We do not share your personal data with any other third-party service providers or delivery partners. All deliveries are managed by our in-house staff only.</p>

      <h2 className="text-2xl font-semibold">4. User Accounts</h2>
      <p>Users can:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Create an account</li>
        <li>View and edit their name, phone number, address, and pincode</li>
        <li>Update saved preferences and delivery details</li>
      </ul>
      <p>Users cannot delete their accounts at this time. However, you may contact us if you need assistance or have concerns regarding your data.</p>

      <h2 className="text-2xl font-semibold">5. Children's Privacy</h2>
      <p>Our app is intended for a general audience. However, it is not designed for children under the age of 13. We do not knowingly collect data from minors.</p>

      <h2 className="text-2xl font-semibold">6. Sensitive Product Information</h2>
      <p>While we offer products such as sanitary napkins and condoms through our app, we do not advertise or promote them explicitly.</p>

      <h2 className="text-2xl font-semibold">7. Data Security</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Data is stored securely on AWS servers</li>
        <li>Payment details are processed securely via Razorpay</li>
        <li>OTPs are sent using secure APIs via MSG91</li>
      </ul>

      <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
      <p>We may update this Privacy Policy occasionally. We will notify you of any significant changes via the app or other communication channels.</p>

      <h2 className="text-2xl font-semibold">9. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy or your data, please contact:</p>
      <p>
        Sri Subham Stores Private Limited<br />
        Email: contact@srisubhamstores.com<br />
        Phone: +91 7603824925
      </p>
    </div>
  );
}