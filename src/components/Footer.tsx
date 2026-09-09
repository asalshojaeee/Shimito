import React, { useState } from "react";

interface FooterLinkColumn {
  title: string;
  links: string[];
}

const linkColumns: FooterLinkColumn[] = [
  {
    title: "شیمیتو",
    links: ["داستان ما", "تیم توسعه", "فرصت‌های شغلی"],
  },
  {
    title: "بخش‌های فروشگاه",
    links: [
      "تجهیزات هوش مصنوعی",
      "کیت‌های توسعه پردازشی",
      "عینک‌ها و گجت‌های واقعیت مجازی",
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Subscribe email:", email);

    setEmail("");
  };

  return (
    <footer
      dir="rtl"
      className="w-full text-slate-200"
      style={{
        background:
          "linear-gradient(135deg, #0b0f1f 0%, #141a30 45%, #1b2140 100%)",
        fontFamily:
          "'Vazirmatn', 'IRANSans', 'Tahoma', system-ui, sans-serif",
      }}
    >
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid grid-cols-1 gap-20 text-center md:grid-cols-4">




          <div>
            <div className="mb-4 flex items-center justify-start gap-2">

                            <span className="h-3 w-3 rounded-full bg-cyan-400" />

              <h2 className="text-2xl font-extrabold text-white">
                شیمیتو
              </h2>

            </div>

            <p className="text-sm leading-7 text-slate-400">
              شیمیتو برندی پیشرو در عرضه مواد شیمیایی و محصولات آلی و ...
              است. طراحی مدرن و تجربه نوآورانه.
            </p>
          </div>
          <nav aria-label="بخش‌های فروشگاه">
            <h4 className="mb-4 font-bold text-cyan-400">
              بخش‌های فروشگاه
            </h4>

            <ul className="space-y-3">
              {linkColumns[1].links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="شیمیتو">
            <h4 className="mb-4 font-bold text-cyan-400">
              شیمیتو
            </h4>

            <ul className="space-y-3">
              {linkColumns[0].links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="mb-3 text-xl font-bold text-white">
              عضویت در خبرنامه کوانتومی
            </h3>

            <p className="mb-6 max-w-md text-sm leading-7 text-slate-400">
              آخرین ابزارها، مقالات فنی و تخفیف‌های فوق‌العاده برای شما
              ایمیل خواهد شد.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full items-center rounded-full bg-slate-800/60 p-1.5 ring-1 ring-white/10"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل شما..."
                className="w-full flex-1 bg-transparent px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
              />

              <button
                type="submit"
                className="shrink-0 rounded-full bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
              >
                عضویت
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-3 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:px-10">



          <p>
            طراحی شده با الهام از آینده شیمیتو
          </p>

          <p dir="ltr">
            © 2026 SHIMITO. All rights reserved.          </p>

        </div>
      </div>
    </footer>
  );
}