import { Header } from "~/components/header";
import { Hero } from "~/components/hero";
import { BeforeVsAfter } from "~/components/before-vs-after";
import { HowItWorks } from "~/components/how-it-works";
import { Features } from "~/components/features";
import { WhyChefsLoveIt } from "~/components/why-chefs-love-it";
// import { Pricing } from "~/components/pricing"; // Re-enable when pricing is finalized
import { SocialProof } from "~/components/social-proof";
import { FAQ } from "~/components/faq";
import { FinalCTA } from "~/components/final-cta";
import { Footer } from "~/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Hero />
        <BeforeVsAfter />
        <HowItWorks />
        <Features />
        <WhyChefsLoveIt />
        {/* <Pricing /> */}
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
