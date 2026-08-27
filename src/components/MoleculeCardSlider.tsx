import React, { useEffect, useState } from "react";

export interface MoleculeCardItem {
  id: string;
  name: string;
  descriptionFa: string;
  image: string;
}

export interface MoleculeCardSliderProps {
  items: MoleculeCardItem[];
  interval?: number;
}

const MoleculeCardSlider: React.FC<MoleculeCardSliderProps> = ({
  items,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /*
   * تنظیمات کارت
   */

  const cardWidth = 280;

  // مقدار overlap بین کارت‌ها
  const overlap = 45;

  // فاصله واقعی حرکت هر کارت
  const slideWidth = cardWidth - overlap;

  /*
   * حرکت خودکار
   */

  useEffect(() => {
    if (items.length <= 1 || paused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= items.length - 1) {
          return 0;
        }

        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval, paused]);

  return (
    <section
      dir="rtl"
      className="
        relative
        w-full
        overflow-hidden
        py-16
      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2

          -translate-x-1/2
          -translate-y-1/2

          w-[600px]
          h-[300px]

          rounded-full

          bg-[#ffffff6b]
          blur-[120px]
        "
      />

      {/* Slider */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1200px]

          overflow-hidden

          px-4
        "
      >
        {/* Cards Row */}

        <div
          className="
            flex
            items-stretch

            transition-transform
            duration-700
            ease-in-out
          "
          style={{
            transform: `translateX(${currentIndex * slideWidth}px)`,
          }}
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="
                group
                relative
                shrink-0

                w-[280px]
                min-h-[390px]

                -mr-[45px]

                rounded-[24px]



                backdrop-blur-xl


                p-5

                flex
                flex-col
                items-center

                transition-all
                duration-300

                hover:z-50
                hover:-translate-y-2


                hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]
              "
            >
              {/* Image */}

              <div
                className="
                  relative

                  w-full
                  h-[230px]

                  flex
                  items-center
                  justify-center

                  rounded-[20px]


                  overflow-hidden
                "
              >
                {/* Image Glow */}

                <div
                  className="
                    pointer-events-none
                    absolute

                    w-[160px]
                    h-[160px]

                    rounded-full

                    bg-[#FFFFFF1A]

                    blur-[50px]
                  "
                />

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    relative
                    z-10

                    max-w-[90%]
                    max-h-[90%]

                    object-contain

                    transition-transform
                    duration-500

                    group-hover:scale-105
                  "
                />
              </div>

              {/* Name */}

              <h3
                className="
                  mt-5

                  text-[18px]
                  font-thin

                  text-[#290051]
                  text-center
                "
              >
                {item.name}
              </h3>

              {/* Divider */}

              <div
                className="
                  mt-3
                  mb-3

                  w-12
                  h-[2px]

                  rounded-full

                "
              />

              {/* Description */}

              <p
                className="
                  text-[13px]
                  leading-7

                  text-white

                  text-center
                "
              >
                {item.descriptionFa}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Dots */}

      {/* <div
        className="
          relative
          z-50

          mt-8

          flex
          items-center
          justify-center

          gap-2
        "
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`
              h-2
              rounded-full

              transition-all
              duration-300

              ${
                currentIndex === index
                  ? "w-8 bg-purple-600"
                  : "w-2 bg-gray-400/50"
              }
            `}
            aria-label={`کارت ${index + 1}`}
          />
        ))}
      </div> */}
    </section>
  );
};

export default MoleculeCardSlider;