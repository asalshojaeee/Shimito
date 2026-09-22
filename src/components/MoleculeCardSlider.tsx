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
}) => {
  return (
    <section
      dir="rtl"
      className="relative w-full py-16 overflow-hidden"
    >
      {/* ================= GLOW ================= */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[35%]
          -translate-x-1/2
          -translate-y-1/2
          w-[70%]
          h-[180px]
          rounded-full
          bg-[#5A00A7]/20
          blur-[100px]
        "
      />

      {/* ================= DESKTOP ================= */}
      <div className="relative hidden md:block w-full">
        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[1400px]
            min-h-[470px]
            flex
            items-center
            justify-center
          "
        >
          {items.slice(0, 9).map((item, index) => {
            let position = 0;

            if (index > 0) {
              const step = Math.ceil(index / 2);

              position =
                index % 2 === 1
                  ? step
                  : -step;
            }

            const gap = 170;

            return (
              <Link
                key={item.id}
                to="/our-products"
                className="absolute shrink-0"
                style={{
                  zIndex:
                    items.length -
                    Math.abs(position),

                  left: "50%",

                  transform: `
                    translateX(calc(-50% + ${
                      position * gap
                    }px))
                    translateY(${
                      index === 0 ? "-25px" : "0px"
                    })
                  `,

                  width: "clamp(210px, 16vw, 250px)",

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
                    shadow-[0_12px_100px_0_#5A00A740]
                    transition-all
                    duration-300
                    hover:z-50
                    hover:-translate-y-2
                  "
                >
                  {/* ================= IMAGE ================= */}
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

                  {/* ================= TITLE ================= */}
                  <h3
                    className="
                      mt-5
                      text-[18px]
                      font-thin
                      text-[#290051]
                      text-center
                      whitespace-nowrap
                    "
                  >
                    {item.name}
                  </h3>

                  {/* ================= DIVIDER ================= */}
                  <div
                    className="
                      mt-3
                      mb-3
                      w-12
                      h-[2px]
                      rounded-full
                    "
                  />

                  {/* ================= DESCRIPTION ================= */}
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

      {/* ================= MOBILE ================= */}
      <div
        className="
          md:hidden
          relative
          w-full
          px-4
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-5
          "
        >
          {items.map((item) => (
            <Link
              key={item.id}
              to="/our-products"
              className="w-full max-w-[320px]"
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
                  p-5
                  flex
                  flex-col
                  items-center
                  shadow-[0_12px_100px_0_#5A00A740]
                  transition-all
                  duration-300
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoleculeCardSlider;