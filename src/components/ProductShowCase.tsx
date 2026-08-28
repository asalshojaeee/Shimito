import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  ChevronLeft,
  FlaskConical,
} from "lucide-react";

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
    <div className="pt-28 flex w-full max-w-[1900px] flex-col-reverse items-stretch justify-start gap-3 px-8 sm:flex-row sm:items-center sm:justify-start ">
      <div className="relative w-full max-w-[420px]">
        <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          type="text"
          placeholder="جستجو کنید..."
          className="w-full rounded-full border border-white/10 bg-white/5 py-3 pr-11 pl-4 text-sm text-[#FFFFFF] placeholder-[#FFFFFF] outline-none transition-colors focus:border-fuchsia-400/50 focus:bg-white/10"
        />
      </div>

      <div className="relative w-full sm:w-auto">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white sm:w-auto"
        >
          <span>{sort}</span>

          <ChevronDown
            className={`h-4 w-4 text-white/50 transition-transform ${open ? "rotate-180" : ""
              }`}
          />
        </button>

        {open && (
          <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-purple-950/95 py-1 shadow-xl backdrop-blur-md sm:right-auto sm:w-44">
            {sortOptions.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onSortChange(opt);
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-right text-sm text-white/80 hover:bg-white/10"
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <article className="group flex flex-col overflow-hidden rounded-3xl border border-[#FFFFFF1A] bg-[#FFFFFF1A] transition-all w-[360px] items-center justify-center">
    <div className="relative h-52 w-full overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        className="h-full w-full rounded-3xl p-4 object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 " />
    </div>

    <div className=" flex justify-center items-start flex-1 flex-col gap-2 px-5 pt-4 pb-5">
      <span className="flex items-center gap-1.5 text-xs font-medium text-[#2BFFFF]">

        {product.category}
      </span>

      <h3 className="text-lg font-semibold text-white">
        {product.title}
      </h3>

      <p className="text-sm leading-6 text-white/50">
        {product.description}
      </p>

      <div

        className="
    group
    w-10/12
    rounded-3xl
    bg-gradient-to-t
    from-[#A855F7]
    to-[#4C00FF]
    mt-3
    mx-auto
    flex
    cursor-pointer
    items-center
    justify-around
    gap-2
    p-3
    text-center
    transition-all
    duration-300
    hover:bg-white
    hover:bg-none
  "
      >
        <span className="whitespace-nowrap text-sm font-semibold text-white transition-colors group-hover:text-[#6155F5]">
          {formatToman(product.price)} تومان
        </span>

        <span className="whitespace-nowrap text-sm font-semibold text-white transition-colors group-hover:text-[#6155F5]">
          |
        </span>

        <button
          type="button"
          className="
      flex
      items-center
      gap-1.5
      text-xs
      font-semibold
      text-white
      transition-all
      duration-300
      group-hover:text-[#6155F5]
      group-hover:scale-[1.03]
    "
        >
          ثبت سفارش

          <ChevronLeft className="h-3.5 w-3.5 transition-colors group-hover:text-[#6155F5]" />
        </button>
      </div>
    </div>
  </article>
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
      pb-24
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

      <main className="mx-auto mt-8 w-full max-w-[1900px] px-8">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-white/50">
            محصولی یافت نشد.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductShowCase;