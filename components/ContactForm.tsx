"use client";
import { useState } from 'react';
import { formAccessKey } from '@/env'

interface Props {
    label: string;
    id: string;
    name: string;
    type?: 'text' | 'email' | 'textarea';
    required?: boolean;
    placeholder?: string;
    value?: string;
    rows?: number;
    error?: string[] | undefined;
}

function Input({ id, label, type, error, required, ...props }: Props) {
    const hasError = error && error.length > 0;
    const baseClasses = "border p-2 md:p-4 rounded text-lg md:text-2xl font-merriweather transition-colors duration-200 focus:outline-none focus:ring-2";
    const inputClasses = hasError
        ? `${baseClasses} border-red-400 focus:ring-red-300 focus:border-red-500`
        : `${baseClasses} border-gray-300 focus:ring-blue-300 focus:border-blue-500`;

    return (
        <div className="flex flex-col mb-4 md:mb-6">
            <label
                className="mb-2 text-xl md:text-3xl uppercase font-londrina-solid font-light"
                htmlFor={id}
            >
                {label}
                {required && <span className="ml-1" aria-label="required">*</span>}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    className={inputClasses}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                    aria-invalid={hasError}
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    className={inputClasses}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                    aria-invalid={hasError}
                    {...props}
                />
            )}
            {hasError && (
                <div id={`${id}-error`} className="mt-1 text-red-600 text-sm font-merriweather" role="alert">
                    {error.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function ContactForm() {
    const [status, setStatus] = useState<"Idle" | "Pending" | "Success" | "Error">("Idle");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>({});

    const validateForm = (formData: FormData): boolean => {
        const errors: { [key: string]: string[] } = {};

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        if (!name?.trim()) {
            errors.name = ["Name is required"];
        }

        if (!email?.trim()) {
            errors.email = ["Email is required"];
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = ["Please enter a valid email address"];
        }

        if (!message?.trim()) {
            errors.message = ["Message is required"];
        } else if (message.trim().length < 10) {
            errors.message = ["Message must be at least 10 characters long"];
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("Pending");
        setErrorMessage("");
        setFieldErrors({});

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        if (!validateForm(formData)) {
            setStatus("Idle");
            return;
        }

        formData.append("access_key", formAccessKey);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus("Success");
                form.reset();
                setFieldErrors({});

                setTimeout(() => {
                    if (status === "Success") setStatus("Idle");
                }, 5000);
            } else {
                setStatus("Error");
                setErrorMessage(data.message || "Failed to send message. Please try again.");
            }
        } catch (error) {
            setStatus("Error");
            setErrorMessage("Network error. Please check your connection and try again.");
            console.error("Form submission error:", error);
        }
    };

    return (
        <form onSubmit={onSubmit} className="w-full max-w-xl flex flex-col">
            <Input
                id="name"
                label="Name"
                name="name"
                type="text"
                required
                error={fieldErrors.name}
                placeholder="Enter your full name"
            />
            <Input
                id="email"
                label="Email"
                name="email"
                type="email"
                required
                error={fieldErrors.email}
                placeholder="your.email@example.com"
            />
            <Input
                id="message"
                label="Message"
                name="message"
                type="textarea"
                rows={6}
                required
                error={fieldErrors.message}
                placeholder="Tell us about your project or inquiry..."
            />

            <button
                type="submit"
                disabled={status === "Pending"}
                className={`font-londrina-solid text-lg md:text-2xl px-6 py-3 rounded-sm transition-all duration-300 ${status === "Pending"
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-foreground text-background hover:bg-primary"
                    }`}
                aria-describedby={status !== "Idle" ? "form-status" : undefined}
            >
                {status === "Pending" ? "Sending..." : "Send Message"}
            </button>

            <div id="form-status" aria-live="polite" className="mt-4">
                {status === "Pending" && (
                    <div className="flex items-center gap-2 text-primary">
                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                        <p className="font-merriweather">Sending your message...</p>
                    </div>
                )}
                {status === "Success" && (
                    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                        <p className="font-merriweather">Thank you for your message! We&apos;ll get back to you soon.</p>
                    </div>
                )}
                {status === "Error" && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                        <p className="font-merriweather">{errorMessage || "There was an error submitting the form."}</p>
                    </div>
                )}
            </div>
        </form>
    );
}