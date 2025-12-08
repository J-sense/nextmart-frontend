export type UserType = {
  email: string;
  exp: number;
  hasShop: boolean;
  iat: number;
  isActive: boolean;
  name: string;
  role: "user" | "admin";
  userId: string;
};
import { LucideIcon } from 'lucide-react';

export type MenuItem = {
  icon: LucideIcon;
  label: string;
  href: string;
};