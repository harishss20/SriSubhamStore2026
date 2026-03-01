"use client"

import { useEffect, useState } from "react";

import { Address } from "@/types";
import { Button, Modal } from "@/components/ui";
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
  const [orderPlaced, setOrderPlaced] = useState(false);
const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (user) {
      // defer to avoid React warning about synchronous setState in effect
      setTimeout(() => {
        setMobile(user.mobile || "");
        if (user.addresses && user.addresses.length) {
          setSelectedAddressId(user.addresses[0]._id);
        }
      }, 0);
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) {
    router.push("/login");
    return null;
  }
  if (items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  const placeOrder = async () => {
    setError("");
    let address: string | undefined;
    if (customAddress) address = customAddress;
    else {
      address = user.addresses?.find((a: Address) => a._id === selectedAddressId)?.value;
    }
    if (!address) {
      setError("Please select or enter an address");
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
      // redirect automatically after a short delay, but let user close early
      const timer = setTimeout(() => router.push("/"), 3000);
      setRedirectTimer(timer);
    } else {
      setError(data.error || "Failed to place order");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="space-y-8">
        <section className="p-6 border rounded-xl shadow-sm bg-white">
          <h2 className="font-semibold mb-2">Contact</h2>
          <input
            className="mt-1 block w-full border rounded px-3 py-2"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile number"
          />
        </section>

        <section className="p-6 border rounded-xl shadow-sm bg-white">
          <h2 className="font-semibold mb-2">Shipping Address</h2>
          {user.addresses && user.addresses.length > 0 && (
            <div className="space-y-2">
              {user.addresses.map((a: Address) => (
                <label key={a._id} className="block">
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddressId === a._id}
                    onChange={() => setSelectedAddressId(a._id || null)}
                  />{' '}
                  {a.value}
                </label>
              ))}
            </div>
          )}
          <div className="mt-3">
            <textarea
              className="mt-1 block w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Or enter new address"
              value={customAddress || ""}
              onChange={(e) => setCustomAddress(e.target.value)}
            />
          </div>
        </section>

        {error && <p className="text-red-600">{error}</p>}

        <section className="p-6 border rounded-xl shadow-sm bg-white flex justify-between items-center">
          <p className="text-lg">
            Total: <strong>{formatPrice(getTotalPrice())}</strong>
          </p>
          <Button onClick={placeOrder} className="px-8">
            Place order
          </Button>
        </section>
      </div>

      <Modal
        isOpen={orderPlaced}
        onClose={() => {
          if (redirectTimer) clearTimeout(redirectTimer);
          router.push("/");
        }}
        title="Order Successful"
      >
        <p>Your order has been placed. Delivery partners will contact you shortly.</p>
        <p className="mt-2 text-sm text-zinc-600">
          We currently offer delivery only; no pickup options.
        </p>
        <div className="mt-4 text-center">
          <Button
            onClick={() => {
              if (redirectTimer) clearTimeout(redirectTimer);
              router.push("/");
            }}
          >
            Go to Home
          </Button>
        </div>
      </Modal>
    </div>
  );
}
