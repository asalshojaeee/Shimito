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


const MoleculeCardSlider: React.FC<MoleculeCardSliderProps> = ({ items }) => {
  return (
    <section
      dir="rtl"
      className="
        relative
        w-full
        py-16
      "
    >
      {/* Glow */}
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

      <div className="relative hidden md:block w-full">
        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[1200px]
            min-h-[450px]

            flex
            items-center
            justify-center
          "
        >
          {items.map((item, index) => {
            // موقعیت ثابت کارت‌ها
            const position = index;

            return (
              <Link
                key={item.id}
                to="/our-products"
                className="absolute shrink-0"
                style={{
                  zIndex: items.length - position,
right: `
  calc(
    0%
    - min(35vw, 700px)
    + ${position * 15}vw
  )
`,

                  transform: `
                    translateY(${position === 0 ? "-25px" : "0px"})
                  `,
                  width: "clamp(240px, 19vw, 280px)",
                  minHeight: "390px",
                }}
              >

<article
  className="
    group
    relative

    w-full
    min-h-[390px]

    rounded-[24px]

    bg-white/5

    backdrop-blur-xl
    md:backdrop-blur-2xl
    lg:backdrop-blur-[35px]
    xl:backdrop-blur-[45px]

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

                  {/* Title */}
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};


export default MoleculeCardSlider;