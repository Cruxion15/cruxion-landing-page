"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import V2Nav from "@/components/v2/V2Nav";

/**
 * Code entry for someone holding a printed certificate.
 *
 * The certificate itself says "scan the code, or visit cruxion.in/verify", so
 * this page has to exist or that line is a dead end on paper that can never be
 * corrected. Submitting sends them to /verify/<code>, which redirects to the
 * platform app where the record actually lives.
 */
export default function VerifyEntryPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Tolerate what people actually type: spaces, a pasted full URL, wrong case
    // on the fixed prefix. The random tail stays case-sensitive.
    const cleaned = code
      .trim()
      .replace(/^.*\/verify\//, "")
      .replace(/\s+/g, "");
    if (!cleaned) {
      setError("Enter the code printed on the certificate.");
      return;
    }
    router.push(`/verify/${encodeURIComponent(cleaned)}`);
  }

  return (
    <>
      <V2Nav />
      <main className="flex min-h-screen items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            Verify a certificate
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Enter the code printed on a Cruxion certificate to see exactly what
            the holder demonstrated, and when. Every capability listed was
            checked against work they produced themselves.
          </p>

          <form onSubmit={submit} className="mt-8">
            <label
              htmlFor="code"
              className="block text-xs uppercase tracking-wider text-text-secondary"
            >
              Certificate code
            </label>
            <input
              id="code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError(null);
              }}
              placeholder="CRX-ENG-2026-XXXXXXXX"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "code-error" : "code-hint"}
              className="mt-2 w-full rounded-xl border border-border-subtle bg-surface-card px-4 py-3 font-mono text-sm tracking-wide text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-primary-blue"
            />
            {error ? (
              <p
                id="code-error"
                role="alert"
                className="mt-2 text-xs text-red-400"
              >
                {error}
              </p>
            ) : (
              <p id="code-hint" className="mt-2 text-xs text-text-secondary">
                You can paste the whole link if you have it. Codes are case
                sensitive.
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-surface-bg transition-transform hover:scale-[1.01]"
            >
              Verify
            </button>
          </form>

          <p className="mt-8 text-xs leading-relaxed text-text-secondary">
            Scanning the QR code on the certificate takes you straight there.
            Cruxion runs hands-on engineering workshops and coursework inside
            colleges.
          </p>
        </div>
      </main>
    </>
  );
}
