import type { ComponentType } from "react";
import {
  PassportIcon,
  KeyIcon,
  BankIcon,
  BriefcaseIcon,
  ScalesIcon,
  HandshakeIcon,
  BookIcon,
} from "@/components/icons";

const byNum: Record<string, ComponentType<{ className?: string }>> = {
  "01": PassportIcon,
  "02": KeyIcon,
  "03": BankIcon,
  "04": BriefcaseIcon,
  "05": ScalesIcon,
  "06": HandshakeIcon,
  "07": BookIcon,
};

export default function PracticeIcon({ num, className }: { num: string; className?: string }) {
  const Icon = byNum[num];
  if (!Icon) return null;
  return <Icon className={className} />;
}
