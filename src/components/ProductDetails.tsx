import React, { useState } from "react";
import { Download, FileText } from "lucide-react";


import PayCompleteSampleModal from "./PayCompleteSampleModal";
import { Link } from "react-router";

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

interface ProductSidebarProps {
  product: ProductData;
  onOpenSampleModal: () => void;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  product,
  onOpenSampleModal,
}) => (
  <aside
    className="
      flex
      w-full
      shrink-0
      flex-col
      items-center
      gap-4
      lg:w-80
      lg:items-start
    "
  >
    {/* Product Image */}
    <div className="flex w-full flex-col items-center gap-4">

      {/* Product Image */}
      <div
        className="
      h-28
      w-28
      overflow-hidden
      rounded-2xl
      border-2
      border-purple-400/60
      shadow-[0_0_30px_rgba(168,85,247,0.35)]
      sm:h-32
      sm:w-32
    "
      >
        <img
          src={product.avatarUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Name */}
      <h2
        className="
      text-center
      text-xl
      font-bold
      text-white
      sm:text-2xl
    "
      >
        {product.name}
      </h2>

    </div>

    {/* Information */}
    <div className="flex w-full flex-col gap-3">

      {/* Category */}
      <div
        className="
          flex
          flex-col
          gap-2
          rounded-xl
          bg-white/[0.03]
          p-3
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:bg-transparent
          sm:p-0
        "
      >
        <span className="shrink-0 text-sm text-white">
          دسته‌بندی
        </span>

        <div
          className="
            flex
            flex-wrap
            justify-start
            gap-2
            sm:justify-end
          "
        >
          {product.tags.map((tag) => (
            <Tag
              key={tag.id}
              label={tag.label}
            />
          ))}
        </div>
      </div>

      {/* Purity */}
      <InfoRow
        label="درصد خلوص"
        value={`${product.purityPercent} درصد`}
      />

      {/* Manufacturer */}
      <InfoRow
        label="کشور سازنده"
        value={product.manufacturerCountry}
      />

      {/* Price */}
      <div
        className="
          flex
          min-h-12
          w-full
          items-center
          justify-between
          gap-3
          rounded-xl
          bg-[#4A007499]
          px-3
          py-3
          sm:px-4
        "
      >
        <span className="shrink-0 text-xs text-white sm:text-sm">
          قیمت کالا
        </span>

        <span
          className="
            text-left
            text-xs
            font-semibold
            text-white
            sm:text-sm
          "
        >
          {formatToman(product.price)} تومان
        </span>
      </div>

      {/* Download */}
      <button
        type="button"
        className="
          flex
          min-h-12
          w-full
          items-center
          justify-between
          gap-2
          rounded-xl
          bg-[#4A007499]
          px-3
          py-3
          transition-all
          hover:bg-[#5A008F99]
          sm:px-4
        "
      >
        <FileText className="h-4 w-4 shrink-0 text-white" />

        <span
          className="
            flex-1
            text-center
            text-xs
            text-white
            sm:text-sm
          "
        >
          دانلود جدول شیمیایی
        </span>

        <Download className="h-4 w-4 shrink-0 text-white" />
      </button>

      {/* Buttons */}
      <div
        className="
          flex
          w-full
          flex-col
          gap-3
          pt-1
          sm:flex-row
        "
      >
        <Link
          to={'/addtocart'}
          className="
            w-full
            rounded-xl
            
            bg-[#FF00E533]
            py-3
            text-sm
            font-medium
            text-white
            transition-all
     
            sm:flex-1
            text-center
                hover:border-[#EF2CC5]
            hover:bg-gradient-to-t
            hover:from-[#FF00E533]
            hover:to-[#99008ACC]
            hover:shadow-[0_14px_14px_0_#7F0A7B63]
          "
        >
          افزودن به سبد خرید        </Link>


      </div>
    </div>
  </aside>
);


const ProductDetails: React.FC = () => {
  const [isSampleModalOpen, setIsSampleModalOpen] =
    useState(false);

  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        w-full
        bg-gradient-to-br
        from-[#02000A]
        via-[#140024]
        to-[#0B1521]
        px-3
        pb-12
        pt-24
        font-sans
        sm:px-5
        sm:pt-28
        lg:px-8
      "
      style={{
        fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
      }}
    >
      <div className="mx-auto w-full max-w-6xl">

        <main
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-[#FFFFFF00]
            p-3
            backdrop-blur-md
            sm:rounded-3xl
            sm:p-5
            lg:p-8
          "
        >

          {/* Main Layout */}
          <div
            className="
              flex
              w-full
              flex-col
              gap-5
              lg:flex-row
              lg:gap-8
            "
          >

            {/* Sidebar */}
            <ProductSidebar
              product={PRODUCT}
              onOpenSampleModal={() =>
                setIsSampleModalOpen(true)
              }
            />

            {/* Description + Gallery */}
            <div
              className="
    flex
    min-w-0
    w-full
    flex-1
    flex-col
    justify-between
    gap-5
    rounded-2xl
    bg-[#FFFFFF0A]
    p-4
    sm:rounded-3xl
    sm:p-5
    lg:gap-6
  "
            >

              {/* Description */}
              <div className="w-full">
                <h3
                  className="
                    mb-3
                    text-base
                    font-bold
                    text-white
                    sm:mb-4
                    sm:text-lg
                  "
                >
                  درباره محصول
                </h3>

                <p
                  className="
                    text-justify
                    text-sm
                    leading-7
                    text-white/70
                    sm:text-base
                    sm:leading-8
                  "
                >
                  {PRODUCT.description}
                </p>
              </div>

              {/* Gallery */}
              <div
                className="
                  grid
                  w-full
                  grid-cols-2
                  gap-3
                  pt-3
                  sm:grid-cols-3
                  sm:gap-4
                  sm:pt-6
                  md:grid-cols-4
                  lg:grid-cols-5
                  lg:pt-10
                "
              >
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

      {/* Modal */}
      <PayCompleteSampleModal
        isOpen={isSampleModalOpen}
        onClose={() =>
          setIsSampleModalOpen(false)
        }
      />
    </div>
  );
};

export default ProductDetails;
