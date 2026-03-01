import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [newAddress, setNewAddress] = useState<string>("");
  const [message, setMessage] = useState("");

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  const saveProfile = async () => {
    const res = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, mobile }),
    });
    const data = await res.json();
    setMessage(data.success ? "Saved" : data.error || "Failed");
  };

  const addAddress = async () => {
    const res = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: newAddress }),
    });
    const data = await res.json();
    if (data.success) window.location.reload();
    else setMessage(data.error || "Failed");
  };

  const remove = async (id: string) => {
    const res = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ removeAddress: true, addressId: id }),
    });
    const data = await res.json();
    if (data.success) window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      <div className="space-y-4">
        <div>
          <label>Name</label>
          <input
            className="border p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
          />
        </div>
        <div>
          <label>Mobile</label>
          <input
            className="border p-2"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile number"
          />
        </div>
        <Button onClick={saveProfile}>Save</Button>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-2">Addresses</h2>
      <ul className="space-y-2">
        {user.addresses?.map((a) => (
          <li key={a._id} className="border p-2 relative">
            <span className="text-sm break-words">{a.value}</span>
            <button
              className="absolute top-1 right-1 text-red-600"
              onClick={() => remove(a._id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold">Add Address</h3>
        <textarea
          className="border w-full p-2"
          rows={3}
          placeholder="Full address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <Button onClick={addAddress}>Add</Button>
      </div>
    </div>
  );
}
