import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FF6B35 0%, #E55A28 40%, #004E89 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative circle top-right */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        {/* Decorative circle bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "40px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        {/* App icon + name row */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "24px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
          >
            ✈️
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.5px",
            }}
          >
            Budget Rover
          </span>
        </div>

        {/* Main headline — dynamic when ?title= is provided */}
        <div
          style={{
            fontSize: title ? (title.length > 60 ? "48px" : "60px") : "72px",
            fontWeight: "800",
            color: "#ffffff",
            lineHeight: "1.1",
            letterSpacing: "-2px",
            marginBottom: "28px",
            maxWidth: "900px",
          }}
        >
          {title ?? "Vacation Budget Planner"}
        </div>

        {/* Subheadline — only shown on the default (no title) image */}
        {!title && (
          <div
            style={{
              fontSize: "30px",
              color: "rgba(255,255,255,0.85)",
              marginBottom: "56px",
              maxWidth: "680px",
              lineHeight: "1.4",
            }}
          >
            Track spending, split expenses with friends, export PDF reports.
          </div>
        )}

        {/* Feature chips */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: title ? "16px" : "0" }}>
          {["No Login Required", "Works Offline", "Split Expenses", "100% Free"].map((label) => (
            <div
              key={label}
              style={{
                padding: "12px 24px",
                borderRadius: "40px",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: "600",
                background: "rgba(255,255,255,0.12)",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
