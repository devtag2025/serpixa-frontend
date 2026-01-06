"use client";
import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { HiMail, HiLocationMarker, HiPhone } from "react-icons/hi";
import { FaWhatsapp  } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic
    toast.success(t("landing.contact.form.successMessage"));
    setFormData({ name: "", email: "", website: "", message: "" });
  };

  const contactInfo = [
    {
      icon: HiMail,
      label: t("landing.contact.email"),
      value: "contact@serpixa.eu",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: HiLocationMarker,
      label: t("landing.contact.address"),
      value: "Anvers, Belgique",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: HiPhone,
      label: t("landing.contact.phone"),
      value: "+32 3 434 36 35",
      color: "bg-green-100 text-green-600",
    },
    {
      label: t("landing.contact.whatsappNumber"),
      icon: FaWhatsapp ,
      value: "+32 491 55 67 29",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("landing.contact.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              {t("landing.contact.subtitle")}
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                      <p className="text-lg font-medium text-gray-900">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("landing.contact.form.name")}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("landing.contact.form.email")}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder={t("landing.contact.form.website")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("landing.contact.form.message")}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
              >
                {t("landing.contact.form.submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

