import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="w-[600px] mx-auto mt-6 border px-10 py-6 rounded-md shadow-md">
      <h2 className="text-xl font-light">Get in touch</h2>
      <h3 className="text-5xl font-medium drop-shadow-md text-black-100 text-opacity-75 mb-8">
        Contact
      </h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 "
      >
        <label className="flex flex-col">
          <span className="text-black-100 font-light mb-4">Your Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="What's your good name?"
            className=" py-4 px-6 placeholder:text-black-100 placeholder:opacity-30 border border-black-100 border-opacity-30 rounded-lg outline-none"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-black-100 font-light mb-4">Your email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your web address?"
            className=" py-4 px-6 placeholder:text-black-100 placeholder:opacity-30 border border-black-100 border-opacity-30 rounded-lg outline-none"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-black-100 font-light mb-4">Your Message</span>
          <textarea
            rows={7}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What you want to say?"
            className=" py-4 px-6 placeholder:text-black-100 placeholder:opacity-30 border border-black-100 border-opacity-30 rounded-lg outline-none"
          />
        </label>

        <button
          type="submit"
          className=" py-3 px-8 rounded-xl outline-none w-fit text-black-100 text-opacity-50 font-light shadow-md"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
