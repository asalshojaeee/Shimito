import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  const cardWidth = 280;
  const overlap = 45;

  // فاصله‌ای که هر بار اسلاید حرکت می‌کند
  const slideWidth = cardWidth - overlap;

  useEffect(() => {
    // اگر یک کارت یا هیچ کارتی نداریم، اسلاید نکن
    if (items.length <= 1 || paused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        // وقتی به آخر رسیدیم، دوباره از اول شروع کن
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
      py-16
    "
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
  >
    {/* نور پشت کارت‌ها */}
    <div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-full
        h-[300px]
        rounded-full
        blur-[120px]
      "
    />

    {/* ردیف کارت‌ها */}
    <div
      className="
        relative
        w-full
        min-h-[450px]
        flex
        items-center
        justify-center
      "
    >
      {items.map((item, index) => {
        const position =
          (index - currentIndex + items.length) % items.length;

        return (
          <Link
            key={item.id}
            to="/our-products"
            className="
              absolute
              shrink-0
            "
            style={{
              zIndex: items.length - position,

              right: `
                calc(50% - 560px + ${position * 235}px)
              `,

              transform: `
                translateY(${position === 0 ? "-25px" : "0px"})
              `,

              transition:
                "right 700ms ease-in-out, transform 700ms ease-in-out",

              width: "280px",
              minHeight: "390px",
            }}
          >
            <article
              className="
                group
                relative

                w-[280px]
                min-h-[390px]

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
              "
            >
              {/* تصویر */}
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

              {/* عنوان */}
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

              {/* خط */}
              <div
                className="
                  mt-3
                  mb-3
                  w-12
                  h-[2px]
                  rounded-full
                "
              />

              {/* توضیحات */}
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
          </Link>
        );
      })}
    </div>
  </section>
);
};

export default MoleculeCardSlider;