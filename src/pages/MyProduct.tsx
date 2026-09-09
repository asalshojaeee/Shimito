
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
      className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white"
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
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition ${
        variant === "edit"
          ? "bg-white text-indigo-600 hover:bg-white/90"
          : "bg-rose-500 text-white hover:bg-rose-600"
      }`}
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
    <div
      dir="rtl"
      className="flex w-full items-center gap-4 rounded-[28px] px-6 py-5"
    >
    

      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-black/30">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

     

      <div className="flex min-w-[150px] shrink-0 flex-col items-start gap-2">
        <span className="text-right text-lg font-semibold text-white">
          {product.name}
        </span>

        <div className="flex flex-wrap justify-start gap-2">
          {product.tags.map((tag, i) => (
            <CategoryTag
              key={`${tag}-${i}`}
              text={tag}
            />
          ))}
        </div>
      </div>



      <p
        dir="rtl"
        className="min-w-0 flex-1 text-right text-sm leading-7 text-white/85"
      >
        {product.description}
      </p>

     

      <div className="flex shrink-0 items-center gap-2">

     <ActionButton
          icon={<Trash2 size={18} />}
          variant="delete"
          label="حذف محصول"
          onClick={() =>
            onDelete?.(product.id)
          }
        />

        <ActionButton
          icon={<Pencil size={18} />}
          variant="edit"
          label="ویرایش محصول"
          onClick={() =>
            onEdit?.(product.id)
          }
        />

   
      </div>
    </div>
  );
}


const SAMPLE_DESCRIPTION =
  "ان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصا";

const SAMPLE_PRODUCTS: Product[] =
  Array.from({ length: 5 }).map((_, i) => ({
    id: `product-${i + 1}`,
    name: "نام محصول",
    description: SAMPLE_DESCRIPTION,
    tags: ["مکانیک", "الکترونیک"],
    imageUrl:
      "",
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
      className="mx-auto w-full max-w-4xl rounded-[32px] bg-[#FFFFFF0A] p-6"
    >
      <div className="flex flex-col gap-4">
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

