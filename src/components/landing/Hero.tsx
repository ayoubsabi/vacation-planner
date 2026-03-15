import Link from "next/link";
import { Button } from "@/components/common/Button";
import { MapPin, TrendingUp, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)] via-[#ff8a5b] to-[var(--accent)] text-white px-4 pt-10 sm:pt-16 pb-20 sm:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 right-8 w-24 h-24 sm:w-48 sm:h-48 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-8 left-4 w-16 h-16 sm:w-32 sm:h-32 rounded-full bg-white blur-2xl" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium mb-6">
          <span>✈️</span>
          <span>No login required — 100% free</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
          Free Vacation &amp;{" "}
          <span className="text-[var(--secondary)] bg-white/20 px-2 rounded-lg">
            Trip Planner
          </span>
        </h1>

        <p className="text-lg text-white/90 mb-6 sm:mb-8 max-w-md mx-auto">
          Your all-in-one travel planner and vacation budget tracker — split expenses with friends, visualize spending, and export PDF reports. All offline, no account needed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/trip/new">
            <Button size="lg" className="bg-white !text-[var(--primary)] hover:bg-white/90 w-full sm:w-auto shadow-lg">
              Start Planning ✈️
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button size="lg" variant="ghost" className="!text-white hover:bg-white/20 w-full sm:w-auto border border-white/30">
              How it works
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 text-sm">
          <div className="flex items-center gap-1.5">
            <MapPin size={16} />
            <span>Any destination</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} />
            <span>Group splits</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={16} />
            <span>Live charts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
