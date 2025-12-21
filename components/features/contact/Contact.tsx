"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  Sparkles,
  ExternalLink,
  X,
} from "lucide-react";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { PERSONAL_INFO } from "@/lib/constants";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });

        // Open user's default email client as fallback
        if (data.mailtoLink) {
          window.open(data.mailtoLink, "_blank");
        }

        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      color: "blue",
    },
    {
      icon: Phone,
      label: "Phone",
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone}`,
      color: "green",
    },
    {
      icon: MapPin,
      label: "Location",
      value: PERSONAL_INFO.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(PERSONAL_INFO.location)}`,
      color: "mauve",
    },
  ];

  const socialLinks = [
    { icon: Github, href: PERSONAL_INFO.githubUrl, label: "GitHub", color: "ctp-text" },
    { icon: Linkedin, href: PERSONAL_INFO.linkedinUrl, label: "LinkedIn", color: "ctp-blue" },
    { icon: Twitter, href: PERSONAL_INFO.twitterUrl, label: "Twitter", color: "ctp-sky" },
    { icon: Facebook, href: PERSONAL_INFO.facebookUrl, label: "Facebook", color: "ctp-sapphire" },
    { icon: Instagram, href: PERSONAL_INFO.instagramUrl, label: "Instagram", color: "ctp-pink" },
    { icon: SiDiscord, href: PERSONAL_INFO.discordUrl, label: "Discord", color: "ctp-lavender" },
    { icon: Code2, href: PERSONAL_INFO.codeforcesUrl, label: "Codeforces", color: "ctp-yellow" },
    { icon: Code2, href: PERSONAL_INFO.leetcodeUrl, label: "LeetCode", color: "ctp-peach" },
  ];

  return (
    <Section id="contact" className="bg-ctp-mantle/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-ctp-blue/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-ctp-mauve/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10">
        <SectionTitle
          badge="Get in Touch"
          title="Let's Work Together"
          highlightWord="Together"
          subtitle="Got a project in mind? Let's create something amazing together!"
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Info & Socials */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            ref={formRef}
          >
            {/* Intro Card */}
            <Card className="p-6 bg-linear-to-br from-ctp-surface0/80 to-ctp-surface0/40" variant="elevated">
              <div className="flex items-start gap-4">
                <motion.div
                  className="p-3 bg-ctp-blue/20 rounded-xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-6 h-6 text-ctp-blue" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-display font-bold text-ctp-text mb-2">
                    Ready to Connect?
                  </h3>
                  <p className="text-ctp-subtext0 leading-relaxed">
                    Whether you have a project idea, want to collaborate, or just want to say hi,
                    I&apos;m always excited to hear from fellow developers and potential clients.
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact Methods */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Card
                    className="group p-3 sm:p-4 hover:scale-[1.02] transition-transform"
                    variant="bordered"
                    hover
                  >
                    <a
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4"
                    >
                      <motion.div
                        className={`p-3 bg-ctp-${contact.color}/20 rounded-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <contact.icon className={`w-5 h-5 text-ctp-${contact.color}`} />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm text-ctp-subtext1 mb-1">{contact.label}</p>
                        <p className="text-ctp-text font-medium group-hover:text-ctp-blue transition-colors">
                          {contact.value}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-ctp-subtext0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-base sm:text-lg font-display font-semibold text-ctp-text mb-4 flex items-center gap-2">
                <span>Connect on Social Media</span>
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 bg-ctp-surface0/50 hover:bg-ctp-surface0 rounded-lg border border-ctp-surface1 hover:border-${social.color}/50 transition-all`}
                    aria-label={social.label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: 0.5 + index * 0.05, type: "spring" }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className={`w-5 h-5 text-ctp-subtext0 group-hover:text-${social.color} transition-colors`} />
                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-ctp-surface0 text-ctp-text text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-4 sm:p-6 bg-ctp-surface0/50" variant="elevated">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-ctp-text mb-4 sm:mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 sm:w-6 sm:h-6 text-ctp-blue" />
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.3 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-ctp-text mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-ctp-base border border-ctp-surface1 rounded-lg text-ctp-text placeholder-ctp-subtext1 focus:outline-none focus:ring-2 focus:ring-ctp-blue focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.35 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-ctp-text mb-2"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-ctp-base border border-ctp-surface1 rounded-lg text-ctp-text placeholder-ctp-subtext1 focus:outline-none focus:ring-2 focus:ring-ctp-blue focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.4 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-ctp-text mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-ctp-base border border-ctp-surface1 rounded-lg text-ctp-text placeholder-ctp-subtext1 focus:outline-none focus:ring-2 focus:ring-ctp-blue focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </motion.div>

                {status === "success" && (
                  <motion.div
                    className="flex items-center gap-2 p-4 bg-ctp-green/20 text-ctp-green rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Message sent successfully! Your email client will open shortly.
                    </span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    className="flex items-center gap-2 p-4 bg-ctp-red/20 text-ctp-red rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <X className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Failed to send message. Please try again or email directly.
                    </span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-6 py-3 bg-ctp-blue hover:bg-ctp-sapphire text-ctp-crust font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  {status === "loading" ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-ctp-crust border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
