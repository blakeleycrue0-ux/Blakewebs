import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import Logo from "../components/Logo";
import GoogleMark from "../components/GoogleMark";
import { useStore } from "../lib/store";

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function Login() {
  const { login, loadDemo } = useStore();
  const [mode, setMode] = useState<"choose" | "email">("choose");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function continueWithGoogle() {
    // Placeholder auth — no real OAuth wired up yet.
    login({
      provider: "google",
      name: "Alex Rivera",
      email: "alex.rivera@gmail.com",
      initials: "AR",
    });
  }

  function continueWithEmail() {
    if (!email.trim()) return;
    const displayName = name.trim() || email.split("@")[0];
    login({
      provider: "email",
      name: displayName,
      email: email.trim(),
      initials: initialsFrom(displayName),
    });
  }

  return (
    <div className="min-h-dvh flex flex-col max-w-md mx-auto px-6 justify-center">
      <div className="flex flex-col items-center mb-10">
        <Logo size={40} />
        <h1 className="mt-4 text-[22px] font-semibold" style={{ color: "var(--text)" }}>
          Pace
        </h1>
        <p className="text-[14px] mt-1" style={{ color: "var(--text-secondary)" }}>
          Spend with intention.
        </p>
      </div>

      {mode === "choose" && (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={continueWithGoogle}
            className="w-full flex items-center justify-center gap-2.5 rounded-full py-3.5 border text-[14.5px] font-medium"
            style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
          >
            <GoogleMark size={18} />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => setMode("email")}
            className="w-full flex items-center justify-center gap-2.5 rounded-full py-3.5 border text-[14.5px] font-medium"
            style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
          >
            <Mail className="w-[18px] h-[18px]" strokeWidth={1.8} />
            Continue with email
          </button>

          <button
            type="button"
            onClick={loadDemo}
            className="mt-6 text-[13px] font-medium text-center"
            style={{ color: "var(--text-tertiary)" }}
          >
            Just exploring? <span style={{ color: "var(--accent)" }}>View a sample budget</span>
          </button>
        </div>
      )}

      {mode === "email" && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Email
            </label>
            <input
              type="email"
              inputMode="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className="w-full rounded-xl px-3.5 py-2.5 text-[15px] outline-none border"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
            />
          </div>
          <div>
            <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Name (optional)
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl px-3.5 py-2.5 text-[15px] outline-none border"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
            />
          </div>

          <button
            type="button"
            disabled={!email.trim()}
            onClick={continueWithEmail}
            className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-[14.5px] font-semibold disabled:opacity-40 mt-1"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMode("choose")}
            className="text-[13px] font-medium text-center"
            style={{ color: "var(--text-tertiary)" }}
          >
            Back
          </button>
        </div>
      )}

      <p className="text-[11.5px] text-center mt-10" style={{ color: "var(--text-tertiary)" }}>
        By continuing you agree this is a prototype. No real account is created.
      </p>
    </div>
  );
}
