"use client";

import { Button, Modal } from "@/components/ui";
import { useEffect, useState } from "react";

import { Address } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [customAddress, setCustomAddress] = useState<string | null>(null);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setMobile(user.mobile || "");
        if (user.addresses && user.addresses.length) {
          setSelectedAddressId(user.addresses[0]._id);
        }
      }, 0);
    }
  }, [user]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!user) {
    router.push("/login");
    return null;
  }

  const placeOrder = async () => {
    setError("");
    setErrorModal(false);
    setLoadingOrder(true);
    let address: string | undefined;
    if (customAddress) address = customAddress;
    else {
      address = user.addresses?.find(
        (a: Address) => a._id === selectedAddressId
      )?.value;
    }
    if (!address) {
      setError("Please select or enter an address");
      setLoadingOrder(false);
      return;
    }
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        total: getTotalPrice(),
        shippingAddress: address,
        contactPhone: mobile,
      }),
    });
    const data = await res.json();
    if (data.success) {
      clearCart();
      setOrderPlaced(true);
    } else {
      setError(data.error || "Failed to place order");
      setErrorModal(true);
    }
    setLoadingOrder(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-zinc-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#3D9AC3]">
        Checkout
      </h1>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <section className="bg-white p-8 rounded-2xl shadow-md border lg:sticky lg:top-24 h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-100">
                  <img
                    src={item.images?.[0] || ""}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-zinc-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-zinc-600">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="font-semibold text-zinc-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
            <div className="pt-6 border-t">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-2xl shadow-md border space-y-4">
            <h2 className="text-xl font-semibold">Contact</h2>
            <input
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#3D9AC3] focus:outline-none"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile number"
            />
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-md border space-y-6">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            {user.addresses && user.addresses.length > 0 && (
              <div className="space-y-4">
                {user.addresses.map((a: Address) => (
                  <label
                    key={a._id}
                    className={`block p-4 rounded-xl border transition cursor-pointer ${
                      selectedAddressId === a._id
                        ? "border-[#3D9AC3] bg-[#3D9AC3]/5"
                        : "hover:bg-zinc-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === a._id}
                      onChange={() =>
                        setSelectedAddressId(a._id || null)
                      }
                      className="mr-3 accent-[#3D9AC3]"
                    />
                    <span>{a.value}</span>
                  </label>
                ))}
              </div>
            )}

            <textarea
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#3D9AC3] focus:outline-none"
              rows={3}
              placeholder="Or enter new address"
              value={customAddress || ""}
              onChange={(e) => setCustomAddress(e.target.value)}
            />
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-md border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-lg font-semibold">
              Total: {formatPrice(getTotalPrice())}
            </p>
            <Button
              onClick={placeOrder}
              className="px-10 py-3"
              disabled={loadingOrder}
            >
              {loadingOrder ? "Placing…" : "Place order"}
            </Button>
          </section>
        </div>
      </div>

      <Modal
        isOpen={errorModal}
        onClose={() => setErrorModal(false)}
        title="Checkout Error"
      >
        <p className="text-red-600">{error}</p>
        <div className="mt-4 text-center">
          <Button onClick={() => setErrorModal(false)}>Close</Button>
        </div>
      </Modal>

      <Modal
        isOpen={orderPlaced}
        onClose={() => router.push("/")}
        title="Order Successful"
      >
        <p>Your order has been placed successfully!</p>
        <p className="mt-2 text-sm text-zinc-600">
          Our delivery partner will contact you soon with the details.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          You will be redirected to the home page when you close this message.
        </p>
        <div className="mt-4 text-center">
          <Button onClick={() => router.push("/")}>
            Go to Home
          </Button>
        </div>
      </Modal>
    </div>
  );
}