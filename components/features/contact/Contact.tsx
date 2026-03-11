"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Code2,
  Twitter,
  Facebook,
  Instagram,
  Phone,
  CheckCircle2,
  X,
} from "lucide-react";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { PERSONAL_INFO } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: PERSONAL_INFO.phone,
    href: `tel:${PERSONAL_INFO.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: PERSONAL_INFO.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(PERSONAL_INFO.location)}`,
  },
];

const socialLinks = [
  { icon: Github, href: PERSONAL_INFO.githubUrl, label: "GitHub" },
  { icon: Linkedin, href: PERSONAL_INFO.linkedinUrl, label: "LinkedIn" },
  { icon: Twitter, href: PERSONAL_INFO.twitterUrl, label: "Twitter" },
  { icon: Facebook, href: PERSONAL_INFO.facebookUrl, label: "Facebook" },
  { icon: Instagram, href: PERSONAL_INFO.instagramUrl, label: "Instagram" },
  { icon: SiDiscord, href: PERSONAL_INFO.discordUrl, label: "Discord" },
  { icon: Code2, href: PERSONAL_INFO.codeforcesUrl, label: "Codeforces" },
  { icon: Code2, href: PERSONAL_INFO.leetcodeUrl, label: "LeetCode" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        if (data.mailtoLink) window.open(data.mailtoLink, "_blank");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Section id="contact" className="relative overflow-hidden">
      <SectionTitle
        badge="Get in Touch"
        title="Let's Work Together"
        highlightWord="Together"
        subtitle="Have a project in mind? Send me a message or find me on socials."
      />

      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Left: Info & Socials */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          {/* Contact methods */}
          <div className="space-y-3">
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-ctp-surface0/60 bg-ctp-surface0/30 hover:border-ctp-surface1 transition-colors"
              >
                <div className="p-2 rounded-lg bg-ctp-blue/10">
                  <c.icon className="w-5 h-5 text-ctp-blue" />
                </div>
                <div>
                  <p className="text-xs text-ctp-overlay0">{c.label}</p>
                  <p className="text-sm font-medium text-ctp-text">{c.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social links */}
          <div>
            <h4 className="text-sm font-semibold text-ctp-text mb-3">
              Social Profiles
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 rounded-lg bg-ctp-surface0/30 border border-ctp-surface0/60 hover:border-ctp-surface1 transition-colors"
                  aria-label={s.label}
                  title={s.label}
                >
                  <s.icon className="w-5 h-5 text-ctp-overlay0 group-hover:text-ctp-blue transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/30 backdrop-blur-sm p-6"
          >
            <h3 className="text-lg font-display font-semibold text-ctp-text flex items-center gap-2 mb-2">
              <Send className="w-4 h-4 text-ctp-blue" />
              Send a Message
            </h3>

            <div>
              <label
                htmlFor="name"
                className="block text-sm text-ctp-subtext0 mb-1.5"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-ctp-base border border-ctp-surface1 rounded-lg text-ctp-text placeholder-ctp-overlay0 focus:outline-none focus:ring-2 focus:ring-ctp-blue/50 focus:border-ctp-blue transition-all text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-ctp-subtext0 mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-ctp-base border border-ctp-surface1 rounded-lg text-ctp-text placeholder-ctp-overlay0 focus:outline-none focus:ring-2 focus:ring-ctp-blue/50 focus:border-ctp-blue transition-all text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm text-ctp-subtext0 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2.5 bg-ctp-base border border-ctp-surface1 rounded-lg text-ctp-text placeholder-ctp-overlay0 focus:outline-none focus:ring-2 focus:ring-ctp-blue/50 focus:border-ctp-blue transition-all resize-none text-sm"
                placeholder="Tell me about your project..."
              />
            </div>

            {status === "success" && (
              <div className="flex items-center gap-2 p-3 bg-ctp-green/10 text-ctp-green rounded-lg text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Message sent!
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 p-3 bg-ctp-red/10 text-ctp-red rounded-lg text-sm">
                <X className="w-4 h-4" />
                Failed to send. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-6 py-2.5 bg-ctp-blue hover:bg-ctp-sapphire text-ctp-crust font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <div className="w-4 h-4 border-2 border-ctp-crust border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
