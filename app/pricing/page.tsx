"use client";

export default function PricingPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-20"
      style={{ background: "#fcfcf9" }}
    >
      <div className="max-w-2xl w-full text-center">
        <div
          className="rounded-2xl p-12 border"
          style={{ background: "#ffffff", borderColor: "#e5e7eb" }}
        >
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#1f2937" }}
          >
            This page is no longer used
          </h1>
          <p className="text-lg mb-8" style={{ color: "#6b7280" }}>
            Pricing information has been updated. Please visit the dashboard or
            home page for more information.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #14b8a6 0%, #6ee7d8 100%)",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 10px 22px rgba(20,184,166,0.32)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
