'use client';

import dynamic from "next/dynamic";

const DynamicDisclaimerBanner = dynamic(
  () => import("./DisclaimerBanner"),
  { ssr: false }
);

export default function ClientDisclaimerBanner() {
  return <DynamicDisclaimerBanner />;
}
