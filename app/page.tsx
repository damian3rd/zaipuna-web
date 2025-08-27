import PinnedHero from "@/components/PinnedHero";
import ZoomHeadlineSection from "@/components/ZoomHeadlineSection";

export default function Page() {
  return (
    <div>
      {/* Scroll-pinned hero with 3D + benefits */}
      <PinnedHero />

      {/* NEXT SECTION: no 3D, zoom-out headline covering the viewport */}
      <ZoomHeadlineSection />

      {/* ...your other sections below */}
    </div>
  );
}
