import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store";
import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [customAddress, setCustomAddress] = useState<string | null>(null);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

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
      address = user.addresses?.find((a: any) => a._id === selectedAddressId)?.value;
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
      router.push(`/order/${data.orderId}`);
    } else {
      setError(data.error || "Failed to place order");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="mb-6">
        <h2 className="font-semibold">Contact</h2>
        <input
          className="border p-2 w-full"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile number"
        />
      </div>
      <div className="mb-6">
        <h2 className="font-semibold">Shipping Address</h2>
        {user.addresses && user.addresses.length > 0 && (
          <div className="space-y-2">
            {user.addresses.map((a: any) => (
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
            className="border w/full p-2"
            rows={3}
            placeholder="Or enter new address"
            value={customAddress || ""}
            onChange={(e) => setCustomAddress(e.target.value)}
          />
        </div>
      </div>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <div className="mb-4">
        <p>Total: <strong>{formatPrice(getTotalPrice())}</strong></p>
      </div>
      <Button onClick={placeOrder}>Place order</Button>
    </div>
  );
}
