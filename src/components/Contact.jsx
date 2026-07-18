import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for contacting! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-slate-800">Contact Us</h2>
        <p className="mt-3 text-lg text-slate-500">
          Have a question, suggestion, or feedback? We'd love to hear from you.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200"
      >
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Message
            </label>

            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Write your message..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-lg text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;