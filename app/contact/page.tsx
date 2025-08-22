'use client'

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSubmitMessage('Your message has been sent successfully. We will contact you soon.');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black" >
      <div className="absolute inset-0 overflow-hidden">
        {[60, 80, 100, 120, 90, 70, 110, 85, 95, 75].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 10) % 100}%`,
              top: `${(i * 15) % 100}%`,
              animation: `float ${10 + (i % 3) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -20px) rotate(90deg); }
          50% { transform: translate(-15px, 15px) rotate(180deg); }
          75% { transform: translate(-20px, -10px) rotate(270deg); }
        }
      `}</style>

      <div className="relative z-content container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-cyan-300 text-lg">
            We are always ready to answer your questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cyan-400">Phone</h3>
                    <p className="text-gray-300">+1-800-GAMING</p>
                    <p className="text-gray-300">+1-800-SUPPORT</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cyan-400">Email</h3>
                    <p className="text-gray-300">info@gamingstore.com</p>
                    <p className="text-gray-300">support@gamingstore.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cyan-400">Address</h3>
                    <p className="text-gray-300">Gaming District, Tech Plaza</p>
                    <p className="text-gray-300">Level 6, Unit 8, Cyber City</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cyan-400">Business Hours</h3>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Contact Form</h2>
            
            {submitMessage && (
              <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg">
                <p className="text-green-400 text-sm">{submitMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="complaint">Complaint</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 resize-none"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;