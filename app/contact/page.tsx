"use client";

import { FormEvent, useState } from "react";

type FormState = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
	name: "",
	email: "",
	subject: "",
	message: "",
};

export default function ContactPage() {
	const [form, setForm] = useState<FormState>(initialState);
	const [errors, setErrors] = useState<FormErrors>({});
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validate = () => {
		const nextErrors: FormErrors = {};

		if (!form.name.trim()) nextErrors.name = "Name is required.";
		if (!form.email.trim()) {
			nextErrors.email = "Email is required.";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
			nextErrors.email = "Enter a valid email address.";
		}
		if (!form.subject.trim()) nextErrors.subject = "Subject is required.";
		if (!form.message.trim()) nextErrors.message = "Message is required.";

		setErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSuccessMessage("");
		setErrorMessage("");

		if (!validate()) return;

		setIsSubmitting(true);
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			const data = (await response.json()) as { message?: string };

			if (!response.ok) {
				throw new Error(data.message || "Failed to send message.");
			}

			setForm(initialState);
			setErrors({});
			setSuccessMessage("Thanks for reaching out. Your message has been sent.");
		} catch (error) {
			setErrorMessage(
				error instanceof Error
					? error.message
					: "Something went wrong. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (field: keyof FormState) => (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const value = event.target.value;
		setForm((current) => ({ ...current, [field]: value }));
		if (errors[field]) {
			setErrors((current) => {
				const next = { ...current };
				delete next[field];
				return next;
			});
		}
		if (successMessage) setSuccessMessage("");
		if (errorMessage) setErrorMessage("");
	};

	const inputBase =
		"w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 transition-colors outline-none placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(20,184,166,0.10)]";

	return (
		<main className="min-h-screen bg-[linear-gradient(180deg,#fbfcfb_0%,#f5f7f4_100%)] pt-24 pb-16">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
					<section className="rounded-[32px] border border-slate-200/80 bg-white/90 p-8 sm:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
						<span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
							Contact EduFlow AI
						</span>

						<h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
							Contact EduFlow AI
						</h1>

						<p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
							Have a question, suggestion, or partnership idea? Send a quick
							message and we&apos;ll get back to you as soon as possible.
						</p>

						<form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
							<div className="grid gap-5 sm:grid-cols-2">
								<label className="block">
									<span className="mb-2 block text-sm font-medium text-slate-700">
										Name
									</span>
									<input
										type="text"
										value={form.name}
										onChange={handleChange("name")}
										className={inputBase}
										placeholder="Your name"
										aria-invalid={Boolean(errors.name)}
										aria-describedby={errors.name ? "name-error" : undefined}
									/>
									{errors.name ? (
										<p id="name-error" className="mt-2 text-sm text-rose-600">
											{errors.name}
										</p>
									) : null}
								</label>

								<label className="block">
									<span className="mb-2 block text-sm font-medium text-slate-700">
										Email
									</span>
									<input
										type="email"
										value={form.email}
										onChange={handleChange("email")}
										className={inputBase}
										placeholder="you@example.com"
										aria-invalid={Boolean(errors.email)}
										aria-describedby={errors.email ? "email-error" : undefined}
									/>
									{errors.email ? (
										<p id="email-error" className="mt-2 text-sm text-rose-600">
											{errors.email}
										</p>
									) : null}
								</label>
							</div>

							<label className="block">
								<span className="mb-2 block text-sm font-medium text-slate-700">
									Subject
								</span>
								<input
									type="text"
									value={form.subject}
									onChange={handleChange("subject")}
									className={inputBase}
									placeholder="What can we help with?"
									aria-invalid={Boolean(errors.subject)}
									aria-describedby={errors.subject ? "subject-error" : undefined}
								/>
								{errors.subject ? (
									<p id="subject-error" className="mt-2 text-sm text-rose-600">
										{errors.subject}
									</p>
								) : null}
							</label>

							<label className="block">
								<span className="mb-2 block text-sm font-medium text-slate-700">
									Message
								</span>
								<textarea
									value={form.message}
									onChange={handleChange("message")}
									className={`${inputBase} min-h-[160px] resize-y`}
									placeholder="Share your question or feedback..."
									aria-invalid={Boolean(errors.message)}
									aria-describedby={errors.message ? "message-error" : undefined}
								/>
								{errors.message ? (
									<p id="message-error" className="mt-2 text-sm text-rose-600">
										{errors.message}
									</p>
								) : null}
							</label>

							<div className="flex justify-end">
								<button
									type="submit"
									disabled={isSubmitting}
									className="inline-flex items-center justify-center rounded-2xl bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(20,184,166,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
								>
									{isSubmitting ? "Sending..." : "Submit"}
								</button>
							</div>

							{successMessage ? (
								<div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
									{successMessage}
								</div>
							) : null}

							{errorMessage ? (
								<div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
									{errorMessage}
								</div>
							) : null}
						</form>
					</section>

					<aside className="rounded-[32px] border border-teal-100 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbfa_100%)] p-8 sm:p-10 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
						<h2 className="text-xl font-semibold text-slate-900">
							A faster way to connect
						</h2>
						<p className="mt-3 text-sm leading-6 text-slate-600">
							Use the form for general questions, support requests, or feature
							ideas. We usually respond within one business day.
						</p>

						<div className="mt-8 space-y-4">
							<div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
								<p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
									Email
								</p>
								<p className="mt-2 text-sm text-slate-700">support@eduflow.ai</p>
							</div>
							<div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
								<p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
									Response time
								</p>
								<p className="mt-2 text-sm text-slate-700">Usually within 24 hours</p>
							</div>
							<div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
								<p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
									Best for
								</p>
								<p className="mt-2 text-sm text-slate-700">
									Product feedback, academic support, and partnership inquiries
								</p>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</main>
	);
}
