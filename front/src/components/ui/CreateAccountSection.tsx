import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";

function MailIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                d="M13.3335 2.66675H2.66683C1.93045 2.66675 1.3335 3.2637 1.3335 4.00008V12.0001C1.3335 12.7365 1.93045 13.3334 2.66683 13.3334H13.3335C14.0699 13.3334 14.6668 12.7365 14.6668 12.0001V4.00008C14.6668 3.2637 14.0699 2.66675 13.3335 2.66675Z"
                stroke="#6B7280"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.6668 4.66675L8.68683 8.46675C8.48101 8.5957 8.24304 8.66409 8.00016 8.66409C7.75729 8.66409 7.51932 8.5957 7.3135 8.46675L1.3335 4.66675"
                stroke="#6B7280"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                d="M12.6667 7.33325H3.33333C2.59695 7.33325 2 7.93021 2 8.66659V13.3333C2 14.0696 2.59695 14.6666 3.33333 14.6666H12.6667C13.403 14.6666 14 14.0696 14 13.3333V8.66659C14 7.93021 13.403 7.33325 12.6667 7.33325Z"
                stroke="#6B7280"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.6665 7.33325V4.66659C4.6665 3.78253 5.01769 2.93468 5.64281 2.30956C6.26794 1.68444 7.11578 1.33325 7.99984 1.33325C8.88389 1.33325 9.73174 1.68444 10.3569 2.30956C10.982 2.93468 11.3332 3.78253 11.3332 4.66659V7.33325"
                stroke="#6B7280"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
        >
            <path
                d="M12.6668 14V12.6667C12.6668 11.9594 12.3859 11.2811 11.8858 10.781C11.3857 10.281 10.7074 10 10.0002 10H6.00016C5.29292 10 4.61464 10.281 4.11454 10.781C3.61445 11.2811 3.3335 11.9594 3.3335 12.6667V14"
                stroke="#6B7280"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.00016 7.33333C9.47292 7.33333 10.6668 6.13943 10.6668 4.66667C10.6668 3.19391 9.47292 2 8.00016 2C6.5274 2 5.3335 3.19391 5.3335 4.66667C5.3335 6.13943 6.5274 7.33333 8.00016 7.33333Z"
                stroke="#6B7280"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function EyeIcon({ open }: { open: boolean }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4 shrink-0 text-slate-400"
        >
            <path
                d="M2.5 10s2.917-5.833 7.5-5.833S17.5 10 17.5 10s-2.917 5.833-7.5 5.833S2.5 10 2.5 10Z"
                stroke="currentColor"
                strokeWidth="1.3"
            />
            <circle
                cx="10"
                cy="10"
                r="2.083"
                stroke="currentColor"
                strokeWidth="1.3"
            />
            {!open && (
                <path
                    d="M3.5 3.5 16.5 16.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                />
            )}
        </svg>
    );
}

function GoogleMark() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                d="M15.04 8.16675C15.04 7.64675 14.9933 7.14675 14.9067 6.66675H8V9.50675H11.9467C11.7733 10.4201 11.2533 11.1934 10.4733 11.7134V13.5601H12.8533C14.24 12.2801 15.04 10.4001 15.04 8.16675Z"
                fill="#4285F4"
            />
            <path
                d="M7.99979 15.3332C9.97979 15.3332 11.6398 14.6799 12.8531 13.5599L10.4731 11.7132C9.81979 12.1532 8.98646 12.4199 7.99979 12.4199C6.09312 12.4199 4.47313 11.1332 3.89313 9.3999H1.45312V11.2932C2.65979 13.6866 5.13312 15.3332 7.99979 15.3332Z"
                fill="#34A853"
            />
            <path
                d="M3.89317 9.39338C3.7465 8.95338 3.65984 8.48671 3.65984 8.00005C3.65984 7.51338 3.7465 7.04671 3.89317 6.60671V4.71338H1.45317C0.953171 5.70005 0.666504 6.81338 0.666504 8.00005C0.666504 9.18671 0.953171 10.3 1.45317 11.2867L3.35317 9.80671L3.89317 9.39338Z"
                fill="#FBBC05"
            />
            <path
                d="M7.99979 3.58675C9.07979 3.58675 10.0398 3.96008 10.8065 4.68008L12.9065 2.58008C11.6331 1.39341 9.97979 0.666748 7.99979 0.666748C5.13312 0.666748 2.65979 2.31341 1.45312 4.71342L3.89313 6.60675C4.47313 4.87341 6.09312 3.58675 7.99979 3.58675Z"
                fill="#EA4335"
            />
        </svg>
    );
}

function FacebookMark() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                d="M16 8.04858C16 3.63058 12.418 0.048584 8 0.048584C3.582 0.048584 0 3.63058 0 8.04858C0 12.0419 2.92533 15.3513 6.75 15.9513V10.3613H4.71867V8.04792H6.75V6.28658C6.75 4.28192 7.94467 3.17392 9.772 3.17392C10.6467 3.17392 11.5627 3.33058 11.5627 3.33058V5.29925H10.5533C9.55933 5.29925 9.24933 5.91592 9.24933 6.54858V8.04858H11.468L11.1133 10.3619H9.24933V15.9519C13.0747 15.3513 16 12.0413 16 8.04858Z"
                fill="#030711"
            />
        </svg>
    );
}

export default function CreateAccountSection() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [agreeTerms, setAgreeTerms] = useState(false);
    const [subscribe, setSubscribe] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!agreeTerms) {
            setError(
                "You must agree to the Terms of Service and Privacy Policy."
            );
            return;
        }

        setLoading(true);

        try {
            await register(
                firstName,
                lastName,
                email,
                password
            );

            setSuccess(
                "Account created successfully! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch {
            setError("Unable to create your account.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-[linear-gradient(135deg,rgba(243,244,246,0.30)_0%,rgba(243,244,246,0.10)_100%)] flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
            <div className="flex w-full max-w-md flex-col items-start gap-8">

                <div className="flex w-full flex-col items-center text-center">
                    <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#030711]">
                            <span className="text-xl font-bold text-white">
                                S
                            </span>
                        </div>

                        <span className="text-2xl font-bold tracking-tight text-[#030711]">
                            STYLE
                        </span>
                    </div>

                    <span className="text-base text-[#6B7280]">
                        Create your account and start shopping
                    </span>
                </div>

                <div className="w-full sm:rounded-2xl sm:p-8 sm:shadow-xl">

                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-[#030711]">
                            Create Account
                        </h1>

                        <p className="mt-1 text-base text-[#6B7280]">
                            Join our community and discover amazing fashion
                        </p>
                    </div>

                    <div className="mb-5 space-y-3">
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            <GoogleMark />
                            Continue with Google
                        </button>

                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            <FacebookMark />
                            Continue with Facebook
                        </button>
                    </div>

                    <div className="mb-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-slate-200" />

                        <span className="text-center text-[12px] font-normal leading-6 text-[#6B7280]">
                            OR CREATE WITH EMAIL
                        </span>

                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">

                            <div className="min-w-0">
                                <label
                                    htmlFor="firstName"
                                    className="mb-1.5 block text-sm font-medium text-[#030711]"
                                >
                                    First Name
                                </label>

                                <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 transition-colors focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-400">
                                    <UserIcon />

                                    <input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        placeholder="First name"
                                        className="min-w-0 flex-1 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="min-w-0">
                                <label
                                    htmlFor="lastName"
                                    className="mb-1.5 block text-sm font-medium text-[#030711]"
                                >
                                    Last Name
                                </label>

                                <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 transition-colors focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-400">
                                    <input
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        placeholder="Last name"
                                        className="min-w-0 flex-1 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-medium text-[#030711]"
                            >
                                E-mail address
                            </label>

                            <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 transition-colors focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-400">
                                <MailIcon />

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter your email"
                                    className="min-w-0 flex-1 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-medium text-[#030711]"
                            >
                                Password
                            </label>

                            <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 transition-colors focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-400">
                                <LockIcon />

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Create your password"
                                    className="min-w-0 flex-1 text-sm text-[#030711] placeholder-slate-400 focus:outline-none"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="shrink-0"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    <EyeIcon open={showPassword} />
                                </button>
                            </div>

                            <p className="mt-1.5 text-xs text-slate-500">
                                Must be at least 8 characters long
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1.5 block text-sm font-medium text-[#030711]"
                            >
                                Confirm Password
                            </label>

                            <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 transition-colors focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-400">
                                <LockIcon />

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    placeholder="Confirm your password"
                                    className="min-w-0 flex-1 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="shrink-0"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    <EyeIcon
                                        open={showConfirmPassword}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 pt-1">

                            <label className="flex cursor-pointer items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) =>
                                        setAgreeTerms(e.target.checked)
                                    }
                                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border border-slate-300 accent-[#030711]"
                                    required
                                />

                                <span className="text-sm leading-5 text-slate-500">
                                    I agree to{" "}
                                    <a
                                        href="/termos"
                                        className="font-medium text-[#030711] hover:underline"
                                    >
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="/privacidade"
                                        className="font-medium text-[#030711] hover:underline"
                                    >
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>

                            <label className="flex cursor-pointer items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={subscribe}
                                    onChange={(e) =>
                                        setSubscribe(e.target.checked)
                                    }
                                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border border-slate-300 accent-[#030711]"
                                />

                                <span className="text-sm leading-5 text-slate-500">
                                    Subscribe to our newsletter for exclusive
                                    offers and updates
                                </span>
                            </label>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        {success && (
                            <p className="text-sm text-green-600">
                                {success}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[#030711] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
                        >
                            {loading
                                ? "Creating account..."
                                : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-5 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="font-medium text-[#030711] hover:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}