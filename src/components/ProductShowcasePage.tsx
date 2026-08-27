import React, { useState } from "react";
import SectionTitle from './SectionTitle'


interface Product {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  imageVariant: "molecule" | "powder" | "flasks";
}

interface Customer {
  id: number;
  name: string;
  role: string;
  accent: string;
}

interface FilterTab {
  id: string;
  label: string;
}


const FILTERS: FilterTab[] = [
  { id: "all", label: "همه محصولات" },
  { id: "chemical", label: "شیمیایی" },
  { id: "organic", label: "مواد آلی" },
  { id: "alloy", label: "آلیاژ ها" },
  { id: "industrial", label: "محصولات صنعتی" },
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    imageVariant: "molecule",
  },
  {
    id: 2,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    imageVariant: "powder",
  },
  {
    id: 3,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    imageVariant: "flasks",
  },
  {
    id: 4,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    imageVariant: "flasks",
  },
  {
    id: 5,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    imageVariant: "molecule",
  },
  {
    id: 6,
    category: "مواد شیمیایی",
    title: "پودر شیمیایی منیزیم سولفات",
    description:
      "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
    price: 8900000,
    imageVariant: "powder",
  },
];

const CUSTOMERS: Customer[] = [
  { id: 1, name: "نیما تهرانی", role: "تکنسین برق", accent: "transparent" },
  { id: 2, name: "صابر شیرزاد", role: "مهندس الکترونیک", accent: "transparent" },
  { id: 3, name: "کامران میری", role: "مکانیک", accent: "#f5a623" },
  { id: 4, name: "صابر شیرزاد", role: "مهندس الکترونیک", accent: "#e9e9ef" },
  { id: 5, name: "نیما تهرانی", role: "تکنسین برق", accent: "#4fb6e6" },
  { id: 6, name: "کامران میری", role: "مکانیک", accent: "#f5c944" },
];

/* =========================================================
   Small presentational helpers
========================================================= */
const formatToman = (value: number): string =>
  `${value.toLocaleString("fa-IR")} تومان`;

const Logo: React.FC = () => (
  <div className="logo">
    <span className="logo-pill logo-pill--wide" />
    <span className="logo-pill" />
    <span className="logo-pill" />
  </div>
);

const ProductImage: React.FC<{ variant: Product["imageVariant"] }> = ({
  variant,
}) => {
  if (variant === "molecule") {
    return (
      <div className="product-image product-image--molecule">
        <svg viewBox="0 0 220 140" className="molecule-svg" aria-hidden="true">
          <g stroke="#4fc3f7" strokeWidth="2" fill="none" opacity="0.9">
            <path d="M40 90 L70 70 L70 40 L100 20" />
            <path d="M100 20 L130 40" />
            <path d="M130 40 L160 20 L190 40" />
            <polygon points="70,70 100,90 130,70 130,40 100,20 70,40" />
            <polygon points="130,70 160,90 190,70 190,40 160,20 130,40" />
          </g>
          <g fill="#4fc3f7">
            <circle cx="100" cy="20" r="3" />
            <circle cx="70" cy="40" r="3" />
            <circle cx="130" cy="40" r="3" />
            <circle cx="70" cy="70" r="3" />
            <circle cx="130" cy="70" r="3" />
            <circle cx="190" cy="40" r="3" />
            <circle cx="190" cy="70" r="3" />
          </g>
        </svg>
        <span className="molecule-label">Chlorpromazine</span>
      </div>
    );
  }

  if (variant === "powder") {
    return (
      <div className="product-image product-image--powder">
        <div className="powder-burst" />
      </div>
    );
  }

  return (
    <div className="product-image product-image--flasks">
      <div className="flask-row">
        <div className="flask" />
        <div className="flask flask--tall" />
        <div className="flask flask--pour" />
      </div>
    </div>
  );
};

/* =========================================================
   Main page
========================================================= */
const ProductShowcasePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Hook this up to a real newsletter endpoint
    console.log("subscribe:", email);
    setEmail("");
  };

  return (
    <div className="page" dir="rtl">
      <style>{`
        * { box-sizing: border-box; }
        .page {
          --bg-base: #0c0716;
          --bg-panel: #150c26;
          --bg-panel-soft: #1a0f2e;
          --border-soft: rgba(168, 130, 255, 0.18);
          --text-main: #f4f1fb;
          --text-muted: #a99cc4;
          --accent-purple: #9b5cff;
          --accent-purple-soft: rgba(155, 92, 255, 0.35);
          --accent-teal: #2fd6c8;
          font-family: 'Vazirmatn', 'Segoe UI', Tahoma, sans-serif;
          background:
            radial-gradient(ellipse 900px 500px at 15% 0%, rgba(155, 92, 255, 0.20), transparent 60%),
            radial-gradient(ellipse 900px 600px at 100% 30%, rgba(47, 214, 200, 0.10), transparent 60%),
            var(--bg-base);
          color: var(--text-main);
          min-height: 100vh;
          padding: 20px;
        }

    
        /* ---------- Toolbar ---------- */
        .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin: 100px 4px 24px;
      
        }
        .filter-tabs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .filter-tab {
          border: 1px solid var(--border-soft);
          background: rgba(255,255,255,0.03);
          color: var(--text-muted);
          padding: 10px 22px;
          border-radius: 999px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .filter-tab:hover { color: var(--text-main); border-color: var(--accent-purple-soft); }
        .filter-tab.is-active {
          background: linear-gradient(135deg, #9b5cff, #6f2fe0);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 6px 20px rgba(155, 92, 255, 0.35);
        }
        .sort-control {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-muted);
          font-size: 14px;
        }
        .sort-select {
          background: var(--bg-panel);
          border: 1px solid var(--border-soft);
          color: var(--text-main);
          border-radius: 12px;
          padding: 10px 16px;
          font-size: 14px;
          cursor: pointer;
        }

        /* ---------- Product grid ---------- */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 900px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .product-grid { grid-template-columns: 1fr; }
        }
        .product-card {
          background: var(--bg-panel);
          border: 1px solid var(--border-soft);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .product-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-purple-soft);
          box-shadow: 0 16px 40px rgba(90, 30, 180, 0.25);
        }
        .product-image {
          height: 200px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .product-image--molecule {
          background: radial-gradient(circle at 30% 30%, #12203a, #060a16 70%);
        }
        .molecule-svg { width: 80%; height: 80%; }
        .molecule-label {
          position: absolute;
          bottom: 14px;
          left: 20px;
          font-family: 'Courier New', monospace;
          color: #7fd8ff;
          font-size: 13px;
          letter-spacing: 0.5px;
        }
        .product-image--powder {
          background: radial-gradient(circle at 50% 50%, #241633, #0c0716 75%);
        }
        .powder-burst {
          width: 70%;
          height: 70%;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 40%, rgba(255, 90, 150, 0.85), transparent 40%),
            radial-gradient(circle at 60% 30%, rgba(120, 90, 255, 0.85), transparent 40%),
            radial-gradient(circle at 55% 65%, rgba(255, 190, 60, 0.85), transparent 40%),
            radial-gradient(circle at 40% 60%, rgba(60, 200, 220, 0.85), transparent 40%);
          filter: blur(2px);
        }
        .product-image--flasks {
          background: linear-gradient(160deg, #123049, #061018 70%);
        }
        .flask-row { display: flex; align-items: flex-end; gap: 14px; }
        .flask {
          width: 36px;
          height: 70px;
          border: 2px solid rgba(120, 200, 255, 0.6);
          border-top: none;
          border-radius: 0 0 16px 16px;
          background: linear-gradient(180deg, transparent 40%, rgba(90, 190, 255, 0.35));
        }
        .flask--tall { height: 90px; }
        .flask--pour { height: 60px; }

        .product-body {
          padding: 18px 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .product-category {
          color: var(--accent-teal);
          font-size: 13px;
        }
        .product-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
        }
        .product-description {
          color: var(--text-muted);
          font-size: 13.5px;
          line-height: 1.9;
          margin: 0;
          flex: 1;
        }
        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
        }
        .order-button {
          background: var(--accent-teal);
          color: #052622;
          border: none;
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.2s ease;
        }
        .order-button:hover { filter: brightness(1.1); }
        .product-price {
          color: var(--accent-teal);
          font-size: 15px;
          font-weight: 700;
        }

        /* ---------- Customers ---------- */
        .customers-section { margin: 90px 4px 40px; text-align: center; }
        .customers-heading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-bottom: 46px;
        }
        .customers-heading h2 {
          font-size: 26px;
          margin: 0;
          white-space: nowrap;
        }
        .heading-line {
          height: 1px;
          width: 220px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        }
        .customers-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
        }
        @media (max-width: 900px) {
          .customers-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 560px) {
          .customers-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .customer-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-soft);
          border-radius: 18px;
          padding: 24px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .customer-avatar {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #2a2140;
          border: 3px solid rgba(255,255,255,0.15);
        }
        .customer-name { font-size: 15px; font-weight: 700; margin: 0; }
        .customer-role { font-size: 13px; color: var(--text-muted); margin: 0; }

        /* ---------- Footer ---------- */
        .footer {
          margin: 90px 4px 10px;
          padding-top: 40px;
          border-top: 1px solid var(--border-soft);
          display: grid;
          grid-template-columns: 1.3fr 0.8fr 0.8fr 1.1fr;
          gap: 32px;
        }
        @media (max-width: 900px) {
          .footer { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .footer { grid-template-columns: 1fr; }
        }
        .newsletter h3 { font-size: 18px; margin: 0 0 10px; }
        .newsletter p { color: var(--text-muted); font-size: 13.5px; line-height: 1.8; margin: 0 0 18px; }
        .newsletter-form { display: flex; gap: 10px; }
        .newsletter-form input {
          background: var(--bg-panel);
          border: 1px solid var(--border-soft);
          border-radius: 10px;
          padding: 10px 14px;
          color: var(--text-main);
          font-size: 13.5px;
          flex: 1;
          min-width: 0;
        }
        .newsletter-form button {
          background: var(--accent-teal);
          color: #052622;
          border: none;
          border-radius: 10px;
          padding: 10px 18px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          white-space: nowrap;
        }
        .footer-col h4 { font-size: 14px; color: var(--text-main); margin: 0 0 16px; }
        .footer-col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .footer-col a { color: var(--text-muted); text-decoration: none; font-size: 13.5px; transition: color 0.2s ease; }
        .footer-col a:hover { color: var(--accent-teal); }
        .brand-col { text-align: right; }
        .brand-title { display: flex; align-items: center; gap: 8px; justify-content: flex-start; font-size: 17px; font-weight: 700; margin-bottom: 10px; }
        .brand-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-teal); }
        .brand-col p { color: var(--text-muted); font-size: 13.5px; line-height: 1.9; margin: 0; }
        .footer-bottom {
          margin: 40px 4px 0;
          padding-top: 20px;
          border-top: 1px solid var(--border-soft);
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-muted);
          font-size: 12.5px;
          flex-wrap: wrap;
          gap: 10px;
        }
      `}</style>




      <section className="toolbar">
        <div className="sort-control">
          <span>مرتب‌سازی براساس:</span>
          <select className="sort-select" defaultValue="newest" aria-label="مرتب‌سازی محصولات">
            <option value="newest">جدیدترین‌ها</option>
            <option value="cheapest">ارزان‌ترین</option>
            <option value="expensive">گران‌ترین</option>
          </select>
        </div>

        <div className="filter-tabs" role="tablist" aria-label="فیلتر محصولات">
          {FILTERS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab.id}
              className={`filter-tab${activeFilter === tab.id ? " is-active" : ""}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>


      </section>

      {/* Product grid */}
      <section className="product-grid">
        {PRODUCTS.map((product) => (
          <article className="product-card" key={product.id}>
            <ProductImage variant={product.imageVariant} />
            <div className="product-body">
              <span className="product-category">{product.category}</span>
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer text-white">
                <button type="button" className="order-button bg-[#2BFFFF99] text-white">ثبت سفارش</button>
                <span className="product-price">{formatToman(product.price)}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="customers-section">
        <SectionTitle>مشتریان ما</SectionTitle>

        <div className="customers-grid">
          {CUSTOMERS.map((customer) => (
            <div className="customer-card" key={customer.id}>
              <div
                className="customer-avatar"
                style={{
                  boxShadow: customer.accent !== "transparent"
                    ? `0 0 0 4px ${customer.accent}33`
                    : "none",
                }}
              />
              <p className="customer-name">{customer.name}</p>
              <p className="customer-role">{customer.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ProductShowcasePage;
