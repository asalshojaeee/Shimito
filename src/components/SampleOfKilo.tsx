import React, { useState } from "react";
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

  avatarUrl: "/im/image 6.png",

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

const formatToman = (value: number): string =>
  value.toLocaleString("fa-IR");



const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="px-3 py-1 rounded-full bg-white text-[#6155F5] text-xs font-bold">
    {label}
  </span>
);



const InfoRow: React.FC<{
  label: string;
  value: React.ReactNode;
}> = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-white text-sm">
      {label}
    </span>

    <span className="text-white text-sm">
      {value}
    </span>
  </div>
);



const GalleryThumb: React.FC<{
  label: string;
  imageUrl?: string;
}> = ({ label, imageUrl }) => (
  <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={label}
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-white text-xs text-center px-2">
        {label}
      </span>
    )}
  </div>
);



interface ProductSidebarProps {
  product: ProductData;


  quantity: number;


  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  product,
  quantity,
  setQuantity,
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
        max-w-full
        text-center
        text-xl
        font-bold
        text-white
        sm:text-2xl
        lg:text-right
      "
    >
      {product.name}
    </h2>

    <div className="flex w-full flex-col gap-3">

      {/* Category */}
      <div
        className="
          flex
          w-full
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <span className="shrink-0 text-sm text-white">
          دسته‌بندی
        </span>

        <div
          className="
            flex
            min-w-0
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
            min-w-0
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
            min-w-0
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

      {/* Quantity */}
      <div
        className="
          flex
          w-full
          flex-wrap
          items-center
          justify-center
          gap-2
          pt-1
          sm:justify-start
        "
      >
        {/* Plus */}
        <button
          type="button"
          onClick={() => setQuantity(quantity + 1)}
          className="
            h-11
            w-12
            shrink-0
            rounded-3xl
            bg-[#FF00E533]
            text-2xl
            font-medium
            text-white
            transition-all
            hover:bg-[#FF00E555]
            sm:h-12
            sm:w-14
            sm:text-3xl
          "
        >
          +
        </button>

        {/* Minus */}
        <button
          type="button"
          onClick={() =>
            setQuantity(Math.max(1, quantity - 1))
          }
          className="
            h-11
            w-12
            shrink-0
            rounded-3xl
            border
            border-[#EF2CC5]
            bg-gradient-to-t
            from-[#FF00E533]
            to-[#99008ACC]
            text-2xl
            font-medium
            text-white
            transition-all
            hover:shadow-[0_10px_20px_0_#7F0A7B63]
            sm:h-12
            sm:w-14
            sm:text-3xl
          "
        >
          -
        </button>

        {/* Quantity Number */}
        <p
          className="
            flex
            h-11
            min-w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#FF00E51A]
            px-3
            text-base
            font-bold
            text-white
            sm:h-12
            sm:min-w-14
            sm:text-lg
          "
        >
          {quantity}
        </p>

        {/* Units */}
        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
            sm:mr-auto
          "
        >
          <button
            type="button"
            className="
              shrink-0
              rounded-full
              bg-[#99008A]
              px-3
              py-2
              text-xs
              text-white
              sm:px-4
              sm:text-sm
            "
          >
            کیلو گرم
          </button>

          <button
            type="button"
            className="
              shrink-0
              rounded-full
              bg-[#FF00E51A]
              px-3
              py-2
              text-xs
              text-white
              sm:px-4
              sm:text-sm
            "
          >
            تن
          </button>
        </div>
      </div>
    </div>
  </aside>
);


const CountiueOfPayment: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

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
              quantity={quantity}
              setQuantity={setQuantity}
            />

            {/* Product Content */}
            <div
              className="
                flex
                min-w-0
                w-full
                flex-1
                flex-col
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
    </div>
  );

};

export default CountiueOfPayment;