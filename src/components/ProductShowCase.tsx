import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  ChevronLeft,
  // FlaskConical,
} from "lucide-react";
import { Link } from "react-router";

interface Product {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    image: "/image 6.png",
  },

  {
    id: 2,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    image: "/image 5.png",
  },

  {
    id: 3,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    image: "/image 4.png",
  },

  {
    id: 4,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    image: "/image 5.png",
  },
  {
    id: 5,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    image: "/image 4.png",
  },

  {
    id: 6,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    image: "/image 6.png",
  },


];

function formatToman(value: number): string {
  return new Intl.NumberFormat("fa-IR").format(value);
}

const Toolbar: React.FC<{
  query: string;
  onQueryChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
}> = ({ query, onQueryChange, sort, onSortChange }) => {
  const [open, setOpen] = useState(false);

  const sortOptions = [
    "جدیدترین ها",
    "ارزان‌ترین",
    "گران‌ترین",
    "محبوب‌ترین",
  ];

  return (

<div
  dir="rtl"
  className="
    w-full
    max-w-[1900px]
    px-4
    pt-28
    md:pr-[130px]

    sm:px-6
    md:px-8
  "
>
  <div
    className="
      flex
      w-full
      flex-col
      items-start
      justify-start
      gap-3

      sm:flex-row
      sm:items-center

      md:gap-4
      
    "
  >
    {/* Search */}
    <div className="relative w-full sm:w-auto bg-[#FFFFFF1A">
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        type="text"
        placeholder="جستجو کنید..."
        className="
          w-full
          rounded-[16px]
          border
          border-white/10
          bg-[#FFFFFF0A]

          py-3
          pr-11
          pl-4

          text-sm
          text-white
          placeholder-white

          outline-none
          transition-colors

          focus:border-fuchsia-400/50
          focus:bg-white/10

          sm:w-[240px]
          md:w-[260px]
          lg:w-[286px]
        "
      />

      <Search
        className="
          pointer-events-none
          absolute
          right-4
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-white/40
        "
      />
    </div>

    {/* Dropdown */}
    <div className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-3
          rounded-[16px]
          border
          border-white/10
          bg-white/5
          px-5
          py-3
          text-sm
          text-white

          sm:w-[180px]
          md:w-[190px]
        "
      >
        <span>{sort}</span>

        <ChevronDown
          className={`
            h-4
            w-4
            text-white/50
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <ul
          className="
            absolute
            right-0
            top-full
            z-20
            mt-2
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-purple-950/95
            py-1
            shadow-xl
            backdrop-blur-md

            sm:w-[180px]
            md:w-[190px]
          "
        >
          {sortOptions.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onSortChange(opt);
                  setOpen(false);
                }}
                className="
                  block
                  w-full
                  px-4
                  py-2
                  text-right
                  text-sm
                  text-white/80
                  hover:bg-white/10
                "
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>


  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
<Link
  to="/product-details"
  className="block w-full"
>
<article
  className="
    group
    flex
    w-full
    flex-col
    items-center
    justify-center
    overflow-hidden
    rounded-3xl

    bg-[#FFFFFF1A]

    transition-all
    duration-300

    hover:bg-gradient-to-t
    hover:from-[#A855F7]
    hover:from-[0%]
    hover:via-[#FFFFFF1A]
    hover:via-[50%]
    hover:to-[#FFFFFF1A]
  "
>
    {/* Image */}
    <div
      className="
        relative
        h-48
        w-full
        overflow-hidden
        sm:h-52
      "
    >
      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        className="
          h-full
          w-full
          rounded-3xl
          p-3
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
          sm:p-4
        "
      />

      <div className="absolute inset-0" />
    </div>

    {/* Content */}
    <div
      className="
        flex
        flex-1
        flex-col
        items-start
        gap-2
        px-4
        pb-5
        pt-4
        sm:px-5
      "
    >
      {/* Category */}
      <span
        className="
          flex
          items-center
          gap-1.5
          text-xs
          font-medium
          text-[#2BFFFF]
        "
      >
        {product.category}
      </span>

      {/* Title */}
      <h3
        className="
          line-clamp-2
          text-base
          font-semibold
          text-white
          sm:text-lg
        "
      >
        {product.title}
      </h3>

      {/* Description */}
      <p
        className="
          line-clamp-3
          text-xs
          leading-6
          text-white/50
          sm:text-sm
        "
      >
        {product.description}
      </p>

      {/* Price / Order */}
      <div
        className="
          mt-3
          flex
          w-full
          items-center
          justify-around
          gap-2
          rounded-3xl

          bg-gradient-to-t
          from-[#A855F7]
          to-[#4C00FF]

          p-3
          text-center

          transition-all
          duration-300

          group-hover:from-white
          group-hover:to-white
        "
      >
        {/* Price */}
        <span
          className="
            whitespace-nowrap
            text-xs
            font-semibold
            text-white
            transition-colors
            duration-300
            group-hover:text-[#6155F5]
            sm:text-sm
          "
        >
          {formatToman(product.price)} تومان
        </span>

        {/* Separator */}
        <span
          className="
            text-xs
            font-semibold
            text-white
            transition-colors
            duration-300
            group-hover:text-[#6155F5]
            sm:text-sm
          "
        >
          |
        </span>

        {/* Order */}
        <button
          type="button"
          className="
            flex
            items-center
            gap-1
            whitespace-nowrap
            text-xs
            font-semibold
            text-white

            transition-all
            duration-300

            group-hover:text-[#6155F5]

            sm:gap-1.5
          "
        >
          ثبت سفارش

          <ChevronLeft
            className="
              h-3.5
              w-3.5
              transition-colors
              duration-300
         
            "
          />
        </button>
      </div>
    </div>
  </article>
</Link>
);

const ProductShowCase: React.FC = () => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("جدیدترین ها");

  const filtered = PRODUCTS.filter((p) =>
    p.title.includes(query.trim())
  );

return (
  <div
    dir="rtl"
    className="
      min-h-screen
      w-full
      bg-[linear-gradient(135deg,#02000A_0%,#140024_35%,#2B0147_65%,#0B1521_100%)]
      pb-16
      sm:pb-24
      font-[system-ui]
      text-white
    "
  >
    <Toolbar
      query={query}
      onQueryChange={setQuery}
      sort={sort}
      onSortChange={setSort}
    />

    <main
      className="
        mx-auto
        mt-12
        sm:mt-8
        w-full
        max-w-[1900px]
        px-4
        sm:px-6
        lg:px-8
      "
    >
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-white/50 sm:py-20 sm:text-base">
          محصولی یافت نشد.
        </p>
      ) : (
 <div
  className="
    mx-auto
    grid
    w-full
    max-w-[1500px]
    grid-cols-1
    justify-items-center
    gap-5

    sm:grid-cols-2
    sm:gap-6

    lg:grid-cols-3
    lg:gap-7

    xl:grid-cols-4
    xl:gap-8
  "
>
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  </div>
);
};

export default ProductShowCase;