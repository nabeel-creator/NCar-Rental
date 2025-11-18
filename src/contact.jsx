import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Code,
  Smartphone,
  Globe,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const formDataToSend = new FormData(event.target);
    formDataToSend.append("access_key", "0b029365-75f3-4782-b1c9-d42a928afe0d");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setResult("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setResult("error");
      }
    } catch (error) {
      setResult("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 5000);
    }
  };

  const services = [
    {
      icon: <Code size={24} />,
      title: "Full-Stack Development",
      desc: "React, Django, Node.js & More",
    },
    {
      icon: <Smartphone size={24} />,
      title: "Responsive Design",
      desc: "Mobile-First Approach",
    },
    {
      icon: <Globe size={24} />,
      title: "Modern Web Apps",
      desc: "Fast, Scalable & Secure",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed top-20 right-20 w-96 h-96 bg-lime-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-lime-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-500 rounded-full opacity-5 blur-3xl"></div>
      <div className="bg-zinc-900 h-15"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Get In <span className="text-lime-400">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Looking for professional full-stack web development? We build
            modern, scalable applications with React, Django, and cutting-edge
            technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Full-Stack Web Development
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                We specialize in creating modern, responsive web applications
                using the latest technologies. From concept to deployment, we
                deliver scalable solutions tailored to your needs.
              </p>

              <div className="space-y-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-black/60 border border-lime-500/30 rounded-lg p-4 hover:border-lime-500/50 transition-all hover:shadow-lg hover:shadow-lime-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-lime-500/20 border border-lime-500/30 rounded-lg text-lime-400 flex-shrink-0">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-400">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-lime-500/20 border border-lime-500/30 rounded-lg text-lime-400 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <a
                      href="mailto:mun73350@gmail.com"
                      className="text-white hover:text-lime-400 transition-colors"
                    >
                      mun73350@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-lime-500/20 border border-lime-500/30 rounded-lg text-lime-400 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Phone</p>
                    <a
                      href="tel:+923134922658"
                      className="text-white hover:text-lime-400 transition-colors"
                    >
                      +92 313 4922658
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-lime-500/20 border border-lime-500/30 rounded-lg text-lime-400 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Location</p>
                    <p className="text-white">
                      Remote & On-site Services
                      <br />
                      Available Worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-lime-500/10 to-lime-600/10 border border-lime-500/30 rounded-2xl p-6">
              <p className="text-sm text-gray-400 mb-3">Technologies We Use</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Django",
                  "Node.js",
                  "PostgreSQL",
                  "Tailwind",
                  "AWS",
                  "Next.js",
                  "Framer Motion",
                  "Docker",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-black/60 border border-lime-500/30 rounded-lg text-sm text-lime-400 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-2xl p-8 sticky top-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Send Us a Message
              </h2>

              {result === "success" && (
                <div className="mb-6 bg-lime-500/10 border border-lime-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-lime-400" size={24} />
                    <div>
                      <p className="font-semibold text-lime-400">
                        Message Sent Successfully!
                      </p>
                      <p className="text-sm text-gray-300">
                        We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {result === "error" && (
                <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 text-sm">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="M.Nabeel"
                    className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="m.nabeel3@example.com"
                    className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 12345678"
                    className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your project..."
                    rows="6"
                    className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-3 text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3.5 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-6">
                We typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-lime-500/10 via-lime-600/10 to-lime-500/10 border border-lime-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Let's build something amazing together. Whether it's a car rental
            platform, e-commerce site, or custom web application, we've got you
            covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:info@webdev.com"
              className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-black font-semibold rounded-lg transition-all"
              style={{ boxShadow: "0 0 20px rgba(132, 204, 22, 0.3)" }}
            >
              Email Us Directly
            </a>
            <button className="px-6 py-3 bg-black/60 border border-lime-500/30 hover:border-lime-500/50 text-white font-semibold rounded-lg transition-all">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
