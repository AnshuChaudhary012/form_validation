import emailjs from "@emailjs/browser";
import { useState } from "react";
import Swal from "sweetalert2";

const EMAILJS_SERVICE_ID = "service_il4lvcn";
const EMAILJS_TEMPLATE_ID = "template_0qgn9pp";
const EMAILJS_PUBLIC_KEY = "L8ZJFkTrL1JFAxLhc";

export default function Home() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (values.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Phone number must contain at least 10 digits.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: values.name.trim(),
          user_email: values.email.trim(),
          user_phone: values.phone.trim(),
          message: values.message.trim(),
        },
        EMAILJS_PUBLIC_KEY,
      );

      await Swal.fire({
        icon: "success",
        title: "Message sent!",
        text: `Thanks, ${values.name.trim()}. Your message has been delivered.`,
        confirmButtonColor: "#4f46e5",
      });

      setValues({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS form submission failed:", error);
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "text" in error &&
        typeof error.text === "string"
          ? error.text
          : error instanceof Error
            ? error.message
            : "EmailJS returned an unexpected error.";
      await Swal.fire({
        icon: "error",
        title: "Unable to send your message",
        text: errorMessage,
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClasses =
    "mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <section className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl shadow-slate-200 sm:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Get in touch
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Contact us</h1>
          <p className="mt-2 text-slate-600">
            Fill out the form below and we’ll get back to you.
          </p>
        </div>

        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              autoComplete="name"
              className={inputClasses}
              id="name"
              name="name"
              onChange={handleChange}
              placeholder="Your name"
              value={values.name}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              autoComplete="email"
              className={inputClasses}
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              type="email"
              value={values.email}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              autoComplete="tel"
              className={inputClasses}
              id="phone"
              name="phone"
              onChange={handleChange}
              placeholder="Your phone number"
              type="tel"
              value={values.phone}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className={inputClasses}
              id="message"
              name="message"
              onChange={handleChange}
              placeholder="How can we help?"
              rows="4"
              value={values.message}
            />
          </div>

          <button
            className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>
      </section>
    </main>
  );
}
