export default function PaymentPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold text-center">Payment Policy</h1>

      <p>
        Sri Subham Stores focuses on providing a simple and convenient payment
        experience for our customers. Currently, we primarily support Cash on
        Delivery (COD) to ensure customers can safely receive their products
        before making a payment.
      </p>

      <h2 className="text-2xl font-semibold">1. Accepted Payment Methods</h2>
      <p>We currently accept the following payment methods:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Cash on Delivery (COD)</li>
        <li>UPI payment at the time of delivery</li>
      </ul>

      <h2 className="text-2xl font-semibold">2. Payment Timing</h2>
      <p>
        We do not collect any payment in advance. Payment will only be collected
        after the order has been delivered successfully. Customers can make the
        payment after receiving and verifying their order.
      </p>

      <h2 className="text-2xl font-semibold">3. No Prepaid Orders</h2>
      <p>At present, we do not support prepaid payment methods such as:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Credit Card</li>
        <li>Debit Card</li>
        <li>Net Banking</li>
        <li>Wallet payments</li>
        <li>Any other advance online payment methods</li>
      </ul>

      <h2 className="text-2xl font-semibold">4. No Wallet Facility</h2>
      <p>
        Sri Subham Stores does not provide any wallet facility within our store
        or mobile application.
      </p>

      <h2 className="text-2xl font-semibold">5. COD as Primary Method</h2>
      <p>
        Our primary payment mode is Cash on Delivery. In some situations,
        customers may also choose to complete the payment through UPI after the
        order has been successfully delivered.
      </p>

      <h2 className="text-2xl font-semibold">6. Order Completion</h2>
      <p>
        Payment is required only after the order has been completed and
        delivered successfully. Customers are not required to make any payment
        before delivery.
      </p>
    </div>
  );
}