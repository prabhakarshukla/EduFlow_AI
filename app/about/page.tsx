"use client";

export default function AboutPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-20"
      style={{ background: "#fcfcf9" }}
    >
      <div className="max-w-2xl w-full">
        <div
          className="rounded-2xl p-8 md:p-12 border"
          style={{ background: "#ffffff", borderColor: "#e5e7eb" }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "#1f2937" }}
          >
            About EduFlow AI
          </h1>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed" style={{ color: "#4b5563" }}>
              EduFlow AI is an intelligent learning companion designed to help
              students excel in their academic journey. Our mission is to make
              quality education accessible and personalized for every learner.
            </p>

            <div>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#1f2937" }}
              >
                Our Vision
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6b7280" }}
              >
                We believe that technology should empower students, not replace
                human interaction. EduFlow AI combines cutting-edge artificial
                intelligence with thoughtful design to create a learning
                experience that adapts to each student's unique needs.
              </p>
            </div>

            <div>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#1f2937" }}
              >
                Key Features
              </h2>
              <ul className="space-y-2 text-base" style={{ color: "#6b7280" }}>
                <li className="flex items-start">
                  <span
                    className="font-semibold mr-3 text-lg"
                    style={{ color: "#14b8a6" }}
                  >
                    •
                  </span>
                  <span>
                    AI-powered doubt resolution and personalized learning paths
                  </span>
                </li>
                <li className="flex items-start">
                  <span
                    className="font-semibold mr-3 text-lg"
                    style={{ color: "#14b8a6" }}
                  >
                    •
                  </span>
                  <span>Study planning and productivity tracking tools</span>
                </li>
                <li className="flex items-start">
                  <span
                    className="font-semibold mr-3 text-lg"
                    style={{ color: "#14b8a6" }}
                  >
                    •
                  </span>
                  <span>
                    Mood and wellness monitoring for holistic student support
                  </span>
                </li>
                <li className="flex items-start">
                  <span
                    className="font-semibold mr-3 text-lg"
                    style={{ color: "#14b8a6" }}
                  >
                    •
                  </span>
                  <span>
                    Comprehensive note-taking and knowledge organization
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href="/"
                className="inline-block px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, #14b8a6 0%, #6ee7d8 100%)",
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
      </div>
    </div>
  );
}
