import Link from "next/link";
import image1 from "../../public/about-1.jpg";
import Image from "next/image";
import { getCabins } from "../_lib/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col md:flex-row">
        <div className="">
          <h1 className="text-base md:text-4xl mb-4 md:mb-10 text-accent-400 font-bold uppercase md:font-medium md:normal-case">
            Welcome to the Naturin
          </h1>

          <div className="space-y-8 my-2">
            <p className="text-sm md:text-base">
              Where nature&apos;s beauty and comfortable living blend
              seamlessly. Hidden away in the heart of the Italian Dolomites,
              this is your paradise away from home. But it&apos;s not just about
              the luxury cabins. It&apos;s about the experience of reconnecting
              with nature and enjoying simple pleasures with family.
            </p>
            <p className="text-sm md:text-base">
              Our {cabins.length} luxury cabins provide a cozy base, but the
              real freedom and peace you&apos;ll find in the surrounding
              mountains. Wander through lush forests, breathe in the fresh air,
              and watch the stars twinkle above from the warmth of a campfire or
              your hot tub.
            </p>
            <p className="text-sm md:text-base">
              This is where memorable moments are made, surrounded by
              nature&apos;s splendor. It&apos;s a place to slow down, relax, and
              feel the joy of being together in a beautiful setting.
            </p>
          </div>
        </div>
        <div className="p-4">
          <Image
            src={image1}
            className="h-full object-cover"
            alt="Family sitting around a fire pit in front of cabin"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse">
        <div className="">
          <h1 className="text-base md:text-4xl mb-4 md:mb-10 text-accent-400 font-bold uppercase md:font-medium md:normal-case">
            Managed by our family since 1962
          </h1>

          <div className="space-y-8">
            <p>
              Since 1962, The Naturin has been a cherished family-run retreat.
              Started by our grandparents, this haven has been nurtured with
              love and care, passing down through our family as a testament to
              our dedication to creating a warm, welcoming environment.
            </p>
            <p>
              Over the years, we&apos;ve maintained the essence of The Naturin,
              blending the timeless beauty of the mountains with the personal
              touch only a family business can offer. Here, you&apos;re not just
              a guest; you&apos;re part of our extended family. So join us at
              The Naturin soon, where tradition meets tranquility, and every
              visit is like coming home.
            </p>
          </div>
        </div>
        <div className="relative aspect-square min-w-1/2 ">
          <Image
            fill
            className="object-cover p-6"
            src="/about-2.jpg"
            alt="Family that manages The Naturin"
          />
        </div>
      </div>

      <div className="text-right -translate-y-10">
        <Link
          href="/cabins"
          className="inline-block mt-4 bg-accent-500 px-5 py-3 md:px-8 md:py-5 text-primary-800 text-base md:text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore our luxury cabins
        </Link>
      </div>
    </div>
  );
}
