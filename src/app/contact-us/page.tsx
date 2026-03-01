export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>
      <p className="text-sm text-zinc-600">Effective Date: 13/05/2025</p>

      <p className="text-zinc-700 leading-relaxed">
        If you have any questions, concerns, feedback, or need assistance regarding orders, deliveries, payments, or app usage, feel free to contact us using any of the methods below.
      </p>

      <h2 className="text-2xl font-semibold">Company Details</h2>
      <p className="text-zinc-700">Sri Subham Stores Private Limited</p>

      <h3 className="text-xl font-semibold">Registered Office</h3>
      <address className="not-italic text-zinc-700">
        No 89, Aranmanai Street,<br />
        Vadakarai, Periyakulam,<br />
        Theni - 625601
      </address>

      <h3 className="text-xl font-semibold">Operating Area</h3>
      <p className="text-zinc-700">Selected serviceable pincodes in your local region.</p>

      <h3 className="text-xl font-semibold">Customer Support</h3>
      <ul className="list-none space-y-1 text-zinc-700">
        <li>📞 Phone: +91 763824925</li>
        <li>📧 Email: contact@srisubhamstores.com</li>
        <li>🕐 Working Hours: Monday to Saturday, 9:00 AM to 6:00 PM</li>
        <li>📱 App Support: Tap on Help or Support in the Subham App for real-time assistance</li>
      </ul>

      <h3 className="text-xl font-semibold">Grievance Escalation</h3>
      <p className="text-zinc-700">
        If your issue is not resolved via regular support, you may escalate the matter to:
      </p>
      <div className="bg-zinc-50 p-4 rounded">
        <p className="text-zinc-700">Grievance Officer</p>
        <p className="text-zinc-700">Sri Subham Stores Pvt. Ltd.</p>
        <p className="text-zinc-700">📧 Email: contact@srisubhamstores.com</p>
        <p className="text-zinc-700">⏱️ Response Time: We aim to respond within 48 hours and resolve issues within 7 working days.</p>
      </div>
    </div>
  );
}