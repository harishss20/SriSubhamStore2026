"use client"

import { Button, Modal } from "@/components/ui";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [newAddress, setNewAddress] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  if (loading || !user) {
    return <p className="text-center py-20">Loading...</p>;
  }

  const saveProfile = async () => {
    const res = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, mobile }),
    });
    const data = await res.json();
    setMessage(data.success ? "Profile saved" : data.error || "Failed");
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
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-center">My Profile</h1>

      {/* Contact Section */}
      <div className="bg-white border rounded-2xl shadow-md p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 bg-[#3D9AC3]/10 text-[#3D9AC3] rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <h2 className="text-xl font-semibold">Contact Information</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D9AC3]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile</label>
            <input
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D9AC3]"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile number"
            />
          </div>
        </div>

        <Button onClick={saveProfile} className="w-full">
          Save Changes
        </Button>
      </div>

      {/* Address Section */}
      <div className="bg-white border rounded-2xl shadow-md p-8 space-y-6">
        <h2 className="text-xl font-semibold">Saved Addresses</h2>

        {user.addresses && user.addresses.length > 0 ? (
          <ul className="space-y-4">
            {user.addresses.map((a, idx) => (
              <li
                key={a._id}
                className={`relative border rounded-xl p-4 transition ${
                  idx === 0
                    ? "border-green-400 bg-green-50"
                    : "hover:bg-zinc-50"
                }`}
              >
                {editingId === a._id ? (
                  <div className="space-y-3">
                    <textarea
                      className="w-full border rounded-lg px-3 py-2"
                      rows={3}
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        onClick={() => {
                          fetch("/api/auth/profile", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              address: editingText,
                              addressId: a._id,
                            }),
                          })
                            .then((res) => res.json())
                            .then((data) => {
                              setMessage(
                                data.success
                                  ? "Address updated"
                                  : data.error || "Failed"
                              );
                              setShowModal(true);
                              setEditingId(null);
                              setTimeout(() => window.location.reload(), 800);
                            });
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="pr-16 whitespace-pre-line">
                      {a.value}
                    </p>

                    <div className="absolute top-3 right-3 flex gap-3 text-sm">
                      <button
                        className="text-[#3D9AC3] hover:underline"
                        onClick={() => {
                          setEditingId(a._id!);
                          setEditingText(a.value);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => remove(a._id!)}
                      >
                        Delete
                      </button>
                    </div>

                    {idx === 0 ? (
                      <span className="mt-3 inline-block text-xs text-green-600 font-medium">
                        ✅ Default Address
                      </span>
                    ) : (
                      <button
                        className="mt-3 text-xs text-[#3D9AC3] hover:underline"
                        onClick={() => {
                          fetch("/api/auth/profile", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              defaultAddressId: a._id,
                            }),
                          })
                            .then((res) => res.json())
                            .then((data) => {
                              if (data.success) {
                                setMessage("Default address updated");
                                setShowModal(true);
                                setTimeout(
                                  () => window.location.reload(),
                                  800
                                );
                              }
                            });
                        }}
                      >
                        Make Default
                      </button>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">
            No addresses added yet.
          </p>
        )}

        <div className="space-y-3 pt-4 border-t">
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            placeholder="Enter a new address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <Button onClick={addAddress} className="w-full">
            Add Address
          </Button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <p>{message}</p>
      </Modal>
    </div>
  );
}