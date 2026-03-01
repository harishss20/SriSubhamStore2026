export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold text-center">About Us</h1>
      <p className="text-lg text-zinc-800 leading-relaxed">
        Welcome to Sri Subham Store – Your Trusted Source for Freshness. We specialize in delivering the freshest milk and premium groceries straight to your doorstep. Whether you're planning for your daily needs or stocking up for the month, we’re here to make your shopping experience effortless, reliable, and convenient. Experience freshness like never before – because you deserve the best!
      </p>
      <h2 className="text-2xl font-semibold">Our Services</h2>
      <ul className="list-disc list-inside space-y-2 text-zinc-700">
        <li>Daily and monthly milk and grocery delivery plans.</li>
        <li>Fresh and high-quality products sourced locally.</li>
        <li>Five daily delivery shifts to suit your schedule.</li>
      </ul>
      <h2 className="text-2xl font-semibold">How It Works</h2>
      <p className="text-zinc-700 leading-relaxed">
        Our delivery system operates in five shifts daily, ensuring timely service that fits your routine. Customers can conveniently place orders using our mobile app (Currently under&nbsp;development).
      </p>
    </div>
  );
}