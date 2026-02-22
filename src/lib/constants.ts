export const APP_CONFIG = {
  name: "SrisubhamStores",
  description: "Fresh dairy products - Milk & Butter",
  primaryColor: "#3D9AC3",
} as const;

export const ROUTES = {
  home: "/",
  products: "/products",
  cart: "/cart",
  login: "/login",
  signup: "/signup",
} as const;

export const API_ROUTES = {
  auth: {
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    session: "/api/auth/session",
    logout: "/api/auth/logout",
  },
} as const;

export const CLOUDINARY = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "",
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "",
} as const;
