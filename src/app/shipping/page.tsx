export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold text-center">Shipping &amp; Delivery Policy</h1>
      <p>This Shipping &amp; Delivery Policy is applicable to all purchases made through the Subham App, operated by Sri Subham Stores Private Limited.</p>

      <h2 className="text-2xl font-semibold">1. Delivery Coverage Area</h2>
      <p>Subham App delivers only to selected serviceable pincodes in your local area. You will be able to place an order only if your address and pincode fall under our delivery zone. We reserve the right to accept or reject delivery requests based on pincode availability.</p>

      <h2 className="text-2xl font-semibold">2. Delivery Shifts</h2>
      <p>Each product in the Subham App is assigned one or more eligible delivery shifts. Shifts may include (but are not limited to):</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Morning Shift</li>
        <li>Afternoon Shift</li>
        <li>Evening Shift</li>
      </ul>
      <p>Delivery shift information is displayed on the product page, and users can select their preferred delivery time accordingly.</p>

      <h2 className="text-2xl font-semibold">3. Delivery Fee</h2>
      <p>A flat delivery charge of ₹5 is applicable to all orders, regardless of cart value. We currently do not offer free delivery under any circumstance.</p>

      <h2 className="text-2xl font-semibold">4. Missed Delivery &amp; Postponement</h2>
      <p>If the delivery staff is unable to deliver the order because:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>The customer is unavailable</li>
        <li>The delivery is declined</li>
      </ul>
      <p>then the delivery will not be retried automatically. However, customers can reschedule or postpone their delivery to any upcoming eligible shift via the app or by informing our support team before dispatch.</p>

      <h2 className="text-2xl font-semibold">5. Special Delivery Instructions</h2>
      <p>Customers can provide special delivery instructions while placing an order. Examples include:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Call on arrival</li>
        <li>Leave at doorstep</li>
        <li>Ring doorbell and wait</li>
      </ul>
      <p>Our delivery staff will do their best to follow these instructions, subject to feasibility and safety.</p>

      <h2 className="text-2xl font-semibold">6. Other Notes</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Deliveries are performed by our internal staff only, not third-party delivery services.</li>
        <li>In rare cases (e.g., weather, technical issues), delivery may be delayed. You will be notified promptly.</li>
      </ul>
    </div>
  );
}