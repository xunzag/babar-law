"use client";

import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { matterTypes } from "@/lib/content";
import Dropdown from "@/components/Dropdown";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full bg-ink-4 border border-gold/25 text-cream text-[15px] py-3.5 px-4.5 outline-none transition-colors duration-250 placeholder:text-cream/30 focus:border-gold";

const matterOptions = matterTypes.map((m) => ({ id: m.id, label: m.label }));

export default function ContactForm() {
  const [matterType, setMatterType] = useState(matterTypes[0].id);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const selected = useMemo(
    () => matterTypes.find((m) => m.id === matterType)!,
    [matterType]
  );

  const update = (name: string, value: string) =>
    setFields((f) => ({ ...f, [name]: value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        "EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY."
      );
      setStatus("error");
      setErrorMessage(
        "The enquiry form isn't connected yet. Please use WhatsApp or email above in the meantime."
      );
      return;
    }

    const form = new FormData(e.currentTarget);
    const details = selected.fields
      .map((f) => `${f.label}: ${fields[f.name] || "Not provided"}`)
      .join("\n");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.get("name"),
          from_email: form.get("email"),
          reply_to: form.get("email"),
          phone: form.get("phone") || "Not provided",
          country: form.get("country"),
          matter_type: selected.label,
          message: form.get("message"),
          details: details || "None",
        },
        { publicKey }
      );
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gold/40 bg-ink-4 p-9"
      >
        <div className="font-display text-2xl text-white mb-2.5">
          Thank you. Your message has been sent.
        </div>
        <p className="m-0 text-cream/65 text-[15.5px] leading-relaxed font-light">
          You will receive a reply, usually within one business day. For an
          urgent matter, message directly on WhatsApp.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5">
        <input required name="name" placeholder="Full name" className={inputClasses} />
        <input required type="email" name="email" placeholder="Email address" className={inputClasses} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5">
        <input name="phone" placeholder="Phone (optional)" className={inputClasses} />
        <input required name="country" placeholder="Country of residence" className={inputClasses} />
      </div>

      <div>
        <label className="block text-gold text-[11.5px] tracking-[0.24em] uppercase mb-2.5">
          What is your matter about?
        </label>
        <Dropdown
          label="Matter type"
          options={matterOptions}
          value={matterType}
          onChange={(id) => {
            setMatterType(id);
            setFields({});
          }}
        />
        <p className="mt-2.5 mb-0 text-cream/50 text-sm leading-relaxed font-light">
          {selected.helper}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {selected.fields.length > 0 && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5"
          >
            {selected.fields.map((f) => (
              <input
                key={f.name}
                placeholder={f.placeholder}
                value={fields[f.name] || ""}
                onChange={(e) => update(f.name, e.target.value)}
                className={inputClasses}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <textarea
        required
        name="message"
        rows={5}
        placeholder="Describe your matter, and any deadline"
        className={inputClasses + " resize-none"}
      />

      {status === "error" && (
        <p className="m-0 text-[#e6867b] text-sm">{errorMessage}</p>
      )}

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: status === "submitting" ? 1 : 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gold text-ink py-4 px-9 text-[13px] tracking-[0.16em] uppercase transition-colors duration-300 hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed justify-self-start"
      >
        {status === "submitting" ? "Sending" : "Send enquiry"}
      </motion.button>
    </form>
  );
}
