import { Pencil, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

function CategoryTag({ text }: { text: string }) {
  return (
    <span
      dir="rtl"
      className="
        inline-flex
        max-w-full
        shrink-0
        items-center
        rounded-full
        border
        border-[#A855F7]
        bg-[#F4E8FF]
        px-2.5
        py-1
        text-[10px]
        font-medium
        text-[#420081]
        sm:px-3
        sm:text-xs
      "
    >
      {text}
    </span>
  );
}

function ActionButton({
  icon,
  variant,
  onClick,
  label,
}: {
  icon: React.ReactNode;
  variant: "edit" | "delete";
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        transition
        sm:h-11
        sm:w-11
        sm:rounded-2xl

        ${
          variant === "edit"
            ? "bg-white text-indigo-600 hover:bg-white/90"
            : "bg-rose-500 text-white hover:bg-rose-600"
        }
      `}
    >
      {icon}
    </button>
  );
}

function ProductRow({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <article
      dir="rtl"
      className="
        flex
        w-full
        min-w-0
        flex-col
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-white/[0.08]
        p-3
        backdrop-blur-xl
        sm:gap-5
        sm:rounded-3xl
        sm:p-4
        md:p-5
        lg:flex-row
        lg:items-center
        lg:gap-5
        lg:rounded-[28px]
      "
    >
      {/* =========================
          IMAGE
      ========================= */}
      <div
        className="
          h-20
          w-20
          shrink-0
          overflow-hidden
          rounded-2xl
          bg-black/30
          sm:h-24
          sm:w-24
        "
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-black/20" />
        )}
      </div>

      {/* =========================
          NAME + TAGS
      ========================= */}
      <div
        className="
          flex
          min-w-0
          w-full
          flex-col
          items-start
          gap-2
          lg:w-[150px]
          lg:shrink-0
          xl:w-[170px]
        "
      >
        <span
          className="
            w-full
            break-words
            text-right
            text-sm
            font-semibold
            leading-6
            text-white
            sm:text-base
            md:text-lg
          "
        >
          {product.name}
        </span>

        <div
          className="
            flex
            w-full
            max-w-full
            flex-wrap
            justify-start
            gap-1.5
            sm:gap-2
          "
        >
          {product.tags.map((tag, i) => (
            <CategoryTag
              key={`${tag}-${i}`}
              text={tag}
            />
          ))}
        </div>
      </div>

      {/* =========================
          DESCRIPTION
      ========================= */}
      <p
        dir="rtl"
        className="
          min-w-0
          w-full
          break-words
          text-right
          text-xs
          leading-6
          text-white/85
          sm:text-sm
          sm:leading-7
          lg:flex-1
        "
      >
        {product.description}
      </p>

      {/* =========================
          ACTIONS
      ========================= */}
      <div
        className="
          flex
          w-full
          shrink-0
          items-center
          justify-start
          gap-2
          lg:w-auto
          lg:justify-center
        "
      >
        <ActionButton
          icon={<Trash2 size={18} />}
          variant="delete"
          label="حذف محصول"
          onClick={() => onDelete?.(product.id)}
        />

        <ActionButton
          icon={<Pencil size={18} />}
          variant="edit"
          label="ویرایش محصول"
          onClick={() => onEdit?.(product.id)}
        />
      </div>
    </article>
  );
}

const SAMPLE_DESCRIPTION =
  "ان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصا";

const SAMPLE_PRODUCTS: Product[] = Array.from(
  { length: 5 }
).map((_, i) => ({
  id: `product-${i + 1}`,
  name: "نام محصول",
  description: SAMPLE_DESCRIPTION,
  tags: ["مکانیک", "الکترونیک"],
  imageUrl: "",
}));

export default function MyProduct({
  products = SAMPLE_PRODUCTS,
  onEdit,
  onDelete,
}: {
  products?: Product[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <div
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-4xl
        px-2
        py-2
        sm:px-3
        sm:py-3
        md:px-4
        md:py-4
        lg:px-6
        lg:py-6
      "
    >
      <div className="flex w-full min-w-0 flex-col gap-3 sm:gap-4">
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}