import { Header } from "~/components/header";
import { Hero } from "~/components/hero";
import { TrustRail } from "~/components/trust-rail";
import { SpeedToLead } from "~/components/speed-to-lead";
import { BookingStory } from "~/components/booking-story";
import { StoryContinuation } from "~/components/story-continuation";
// import { Pricing } from "~/components/pricing"; // Re-enable when pricing is finalized
import { FAQ } from "~/components/faq";
import { FinalCTA } from "~/components/final-cta";
import { Footer } from "~/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Hero />
        <TrustRail />
        <SpeedToLead />
        <BookingStory />
        <StoryContinuation />
        {/* <Pricing /> */}
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
