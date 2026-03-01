import { Address, User } from "@/types";

export async function fetchProfile(): Promise<{ user: User | null }> {
  const res = await fetch("/api/auth/profile");
  return res.json();
}

export async function updateProfile(data: Partial<{ name: string; mobile: string }>) {
  const res = await fetch("/api/auth/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function addAddress(address: Address) {
  const res = await fetch("/api/auth/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address }),
  });
  return res.json();
}

export async function removeAddress(id: string) {
  const res = await fetch("/api/auth/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ removeAddress: true, addressId: id }),
  });
  return res.json();
}
