"use client"

import { Button, Modal } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [newAddress, setNewAddress] = useState<string>("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    const msg = data.success ? "Profile saved" : data.error || "Failed";
    setMessage(msg);
    setShowModal(true);
  };

  const addAddress = async () => {
    const res = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: newAddress }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Address added");
      setShowModal(true);
      setNewAddress("");
      // reload in a moment
      setTimeout(() => window.location.reload(), 800);
    } else {
      setMessage(data.error || "Failed");
      setShowModal(true);
    }
  };

  const remove = async (id: string) => {
    const res = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ removeAddress: true, addressId: id }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Address removed");
      setShowModal(true);
      setTimeout(() => window.location.reload(), 800);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 p-6 border rounded-xl shadow-sm bg-white">
          <h2 className="text-xl font-semibold">Contact Info</h2>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              className="mt-1 block w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile</label>
            <input
              className="mt-1 block w-full border rounded px-3 py-2"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile number"
            />
          </div>
          <Button onClick={saveProfile} className="mt-2 w-full">
            Save Changes
          </Button>
        </div>

        <div className="space-y-4 p-6 border rounded-xl shadow-sm bg-white">
          <h2 className="text-xl font-semibold">Addresses</h2>
          {user.addresses && user.addresses.length > 0 ? (
            <ul className="space-y-2">
              {user.addresses.map((a) => (
                <li key={a._id} className="border rounded p-2 relative">
                  <span className="block break-words">{a.value}</span>
                  <button
                    className="absolute top-1 right-1 text-red-600"
                    onClick={() => remove(a._id!)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500">No addresses added yet.</p>
          )}
          <div className="mt-4">
            <textarea
              className="block w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Enter a new address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
            <Button onClick={addAddress} className="mt-2 w-full">
              Add Address
            </Button>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <p>{message}</p>
      </Modal>
    </div>
  );
}
