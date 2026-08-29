import React from "react";
import { Download, FileText } from "lucide-react";

interface ProductTag {
  id: string;
  label: string;
}

interface ProductGalleryItem {
  id: string;
  label: string;
  imageUrl?: string;
}

interface ProductData {
  name: string;
  description: string;
  avatarUrl: string;
  tags: ProductTag[];
  purityPercent: number;
  manufacturerCountry: string;
  price: number;
  gallery: ProductGalleryItem[];
}


const PRODUCT: ProductData = {
  name: "نام محصول",
  description:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری برای طراحان رایانه ای علی الخصوص طراحان",
  avatarUrl:
    "/im/image 6.png",
  tags: [
    { id: "1", label: "اسید ها" },
    { id: "2", label: "هیدروکسیدها" },
    { id: "3", label: "موادآلی" },
  ],
  purityPercent: 90,
  manufacturerCountry: "آلمان",
  price: 8_900_000,
  gallery: [
    { id: "g1", label: "تصاویر محصول" },
    { id: "g2", label: "تصاویر محصول" },
    { id: "g3", label: "تصاویر محصول" },
    { id: "g4", label: "تصاویر محصول" },
    { id: "g5", label: "تصاویر محصول" },
  ],
};

const formatToman = (value: number): string => value.toLocaleString("fa-IR");



const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="px-3 py-1 rounded-full bg-white text-[#6155F5] text-xs font-bold">
    {label}
  </span>
);

const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className="flex items-center justify-between">
    <span className="text-white text-sm">{label}</span>
    <span className="text-white text-sm">{value}</span>
  </div>
);

const GalleryThumb: React.FC<{ label: string; imageUrl?: string }> = ({
  label,
  imageUrl,
}) => (
  <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
    {imageUrl ? (
      <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
    ) : (
      <span className="text-white text-xs text-center px-2">{label}</span>
    )}
  </div>
);

const ProductSidebar: React.FC<{ product: ProductData }> = ({ product }) => (
  <aside className="w-full lg:w-80 flex flex-col items-center lg:items-start gap-4 shrink-0  ">
    <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-purple-400/60 shadow-[0_0_30px_rgba(168,85,247,0.35)]">
      <img
        src={product.avatarUrl}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>

    <h2 className="text-2xl font-bold text-white">{product.name}</h2>

    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">

        <span className="text-white text-sm shrink-0">دسته‌بندی</span>

        <div className="flex gap-2 flex-wrap justify-end">
          {product.tags.map((tag) => (
            <Tag key={tag.id} label={tag.label} />
          ))}
        </div>
      </div>

      <InfoRow label="درصد خلوص" value={`${product.purityPercent} درصد`} />
      <InfoRow label="کشور سازنده" value={product.manufacturerCountry} />

      <div className="flex items-center justify-between rounded-xl bg-[#4A007499] px-4 py-3">
        <span className="text-white text-sm">قیمت کالا</span>

        <span className="text-white font-semibold">
          {formatToman(product.price)} تومان
        </span>
      </div>

      <button className="flex items-center justify-between rounded-xl bg-[#4A007499]  px-4 py-3 ">

        <FileText className="w-4 h-4 text-white" />

        <span className="text-white text-sm">دانلود جدول شیمیایی</span>

        <Download className="w-4 h-4 text-white" />


      </button>

      <div className="flex gap-3 pt-1">
        <button className="flex-1 py-2.5 rounded-xl bg-[#FF00E533] border border-white/10 text-white text-sm font-medium ">
          خرید کامل
        </button>
        <button
          className="
    flex-1 py-2.5 rounded-xl
    bg-[#FF00E533]
    text-white text-sm font-medium
    hover:bg-gradient-to-t
    hover:from-[#FF00E533]
    hover:to-[#99008ACC]
    transition-all
    hover:border border-[#EF2CC5]
    hover:shadow-[0_14px_1p4x_0_#7F0A7B63]
  "
        >
          خرید نمونه
        </button>

      </div>
    </div>
  </aside>
);

const ProductDetails: React.FC = () => {
  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-gradient-to-br from-[#02000A] via-[#140024] to-[#0B1521] pt-24 px-4 md:px-8 font-sans"
      style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">

        <main className=" rounded-3xl bg-[#FFFFFF00] backdrop-blur-md border border-white/10 p-8">
          <div className="flex flex-col lg:flex-row gap-8 ">

            <ProductSidebar product={PRODUCT} />

            <div className="bg-[#FFFFFF0A] p-5 rounded-3xl flex-1 flex flex-col gap-6">
              <div className="">
                <h3 className="text-white font-bold text-lg mb-4">
                  درباره محصول
                </h3>

                <p className="text-white/70 leading-8 text-justify">
                  {PRODUCT.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-auto pt-10">
                {PRODUCT.gallery.map((item) => (
                  <GalleryThumb
                    key={item.id}
                    label={item.label}
                    imageUrl={item.imageUrl}
                  />
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductDetails;
