
"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fanfan Store - Apk Premium",
  description: "Fanfan Store - Produk digital dan APK Premium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
