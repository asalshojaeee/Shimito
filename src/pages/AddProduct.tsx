import { useState, useRef } from "react";
import {
  Pencil,
  X,
  Check,
  ImagePlus,
  FileText,
  Trash2,
  Plus,
} from "lucide-react";



interface ProductFormData {
  price: string;
  purity: string;
  purityVerified: boolean;
  originCountry: string;
  websiteUrl: string;
  specialties: string[];
  productSheet: File | null;
  description: string;
  images: (File | null)[];
}

type TextFieldKey =
  | "price"
  | "originCountry"
  | "websiteUrl";



function EditableField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      dir="rtl"
      className="flex w-full items-center border-b border-white/15 pb-3"
    >
   
      <div className="min-w-0 flex-1 text-right">
        <span className="mb-0.5 block text-right text-xs text-white/50">
          {label}
        </span>

        <input
          ref={inputRef}
          dir="rtl"
          value={value}
          readOnly={!editing}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          className="w-full bg-transparent text-right text-sm text-white placeholder-white/30 outline-none"
        />
      </div>

{/* 
      <button
        type="button"
        onClick={() => {
          setEditing(true);
          requestAnimationFrame(() =>
            inputRef.current?.focus()
          );
        }}
        className="mr-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
        aria-label={`ویرایش ${label}`}
      >
        <Pencil size={15} />
      </button> */}
    </div>
  );
}



function VerifiableField({
  label,
  value,
  onChange,
  verified,
  onToggleVerified,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  verified: boolean;
  onToggleVerified: () => void;
}) {
  return (
    <div
      dir="rtl"
      className="flex w-full items-center border-b border-white/15 pb-3"
    >

      <div className="min-w-0 flex-1 text-right">
        <span className="mb-0.5 block text-right text-xs text-white/50">
          {label}
        </span>

        <input
          dir="rtl"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-right text-sm text-white outline-none"
        />
      </div>


      {/* <div className="mr-4 flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={() =>
            verified && onToggleVerified()
          }
          className={`flex h-6 w-6 items-center justify-center rounded-md transition ${
            !verified
              ? "bg-orange-400 text-white"
              : "bg-transparent text-white/30 hover:text-white/60"
          }`}
          aria-label="رد کردن"
        >
          <X
            size={14}
            strokeWidth={3}
          />
        </button>

        <button
          type="button"
          onClick={() =>
            !verified && onToggleVerified()
          }
          className={`flex h-6 w-6 items-center justify-center rounded-md transition ${
            verified
              ? "bg-white text-indigo-600"
              : "bg-transparent text-white/30 hover:text-white/60"
          }`}
          aria-label="تایید"
        >
          <Check
            size={14}
            strokeWidth={3}
          />
        </button>
      </div> */}
    </div>
  );
}



// function Tag({
//   text,
//   onRemove,
// }: {
//   text: string;
//   onRemove: () => void;
// }) {
//   return (
//     <span
//       dir="rtl"
//       className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-indigo-600"
//     >
//       <button
//         type="button"
//         onClick={onRemove}
//         aria-label={`حذف ${text}`}
//         className="flex items-center justify-center text-indigo-400 transition hover:text-indigo-600"
//       >
//         <X
//           size={14}
//           strokeWidth={2.5}
//         />
//       </button>

//       {text}
//     </span>
//   );
// }


function DocUploadTile({

  
  label,
  file,
  onFile,
}: {
  label: string;
  file: File | null;
  onFile: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      dir="rtl"
      className="flex items-center gap-4 flex-row-reverse"
    >
     
      <span
        dir="rtl"
        className="min-w-0 flex-1 text-right text-sm text-white/80"
      >
        {file ? file.name : label}
      </span>

    
      <button
        type="button"
        onClick={() =>
          inputRef.current?.click()
        }
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
        aria-label={label}
      >
        <FileText size={24} />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) =>
          onFile(
            e.target.files?.[0] ?? null
          )
        }
      />
    </div>
  );
}




function ImageSlot({
  file,
  onChange,
  large,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
  large?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const handlePick = (f: File | null) => {
    onChange(f);

    if (f) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  };

  const sizeClass = large
    ? "h-full w-full"
    : `
        aspect-square
        w-full
        sm:h-[5.5rem]
        sm:w-[5.5rem]
      `;

  return (
    <div
      className={`
        relative
        min-w-0
        shrink-0
        overflow-hidden
        rounded-2xl
        bg-white/10
        ${sizeClass}
      `}
    >
      {preview && (
        <img
          src={preview}
          alt="پیش‌نمایش محصول"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />
      )}

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          gap-2
        "
      >
        {file && (
          <button
            type="button"
            onClick={() => handlePick(null)}
            aria-label="حذف تصویر"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              bg-rose-500
              text-white
              shadow-lg
              transition
              hover:bg-rose-600
              sm:h-9
              sm:w-9
            "
          >
            <Trash2 size={15} />
          </button>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label={file ? "تغییر تصویر" : "افزودن تصویر"}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-xl
            bg-indigo-500
            text-white
            shadow-lg
            transition
            hover:bg-indigo-600
            sm:h-9
            sm:w-9
          "
        >
          {file ? (
            <Plus size={15} />
          ) : (
            <ImagePlus size={15} />
          )}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) =>
          handlePick(e.target.files?.[0] ?? null)
        }
      />
    </div>
  );
}




export default function ProductForm() {
  const [data, setData] =
    useState<ProductFormData>({
      price: "",
      purity: "",
      purityVerified: true,
      originCountry: "",
      websiteUrl: "",
      specialties: [
        "سولفات ها",
        "سولفات ها",
        "اسید ها",
        "مواد معدنی",
      ],
      productSheet: null,
      description: "",
      images: [
        null,
        null,
        null,
        null,
        null,
      ],
    });

  // const [tagInput, setTagInput] =
  //   useState("");

  const setField = (
    key: TextFieldKey,
    value: string
  ) =>
    setData((d) => ({
      ...d,
      [key]: value,
    }));

  // const removeTagAt = (
  //   index: number
  // ) =>
  //   setData((d) => ({
  //     ...d,
  //     specialties:
  //       d.specialties.filter(
  //         (_, i) => i !== index
  //       ),
  //   }));

  // const addTag = (
  //   e: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if (e.key !== "Enter")
  //     return;

  //   e.preventDefault();

  //   const value =
  //     tagInput.trim();

  //   if (value) {
  //     setData((d) => ({
  //       ...d,
  //       specialties: [
  //         ...d.specialties,
  //         value,
  //       ],
  //     }));
  //   }

  //   setTagInput("");
  // };

  const setImageAt = (
    index: number,
    file: File | null
  ) =>
    setData((d) => ({
      ...d,
      images: d.images.map(
        (img, i) =>
          i === index
            ? file
            : img
      ),
    }));

  // const wordCount =
  //   data.description.trim()
  //     ? data.description
  //         .trim()
  //         .split(/\s+/).length
  //     : 0;


return (
<div
  dir="rtl"
  className="
    mx-auto
    w-full
    max-w-4xl
    rounded-2xl
    p-4
    shadow-2xl
    sm:rounded-[32px]
    sm:p-6
    lg:p-8
  "
>
  {/* فرم اصلی */}
  <div
    className="
      grid
      grid-cols-1
      gap-8
      lg:grid-cols-2
      lg:gap-x-10
      lg:gap-y-6
    "
  >

    {/* ستون سمت راست → تصاویر + توضیحات */}
    <div
      dir="rtl"
      className="
        order-1
        flex
        min-w-0
        flex-col
        gap-6
        lg:order-1
      "
    >

      {/* تصاویر */}
      <div className="min-w-0">

        <div className="mb-3 text-right text-sm text-white/80">
          تصاویر محصول{" "}
          <span className="text-white">*</span>
        </div>

        <div
          dir="rtl"
          className="
            flex
            w-full
            min-w-0
            flex-col
            gap-3
            sm:flex-row
          "
        >

          {/* چهار تصویر کوچک */}
          <div
            className="
              grid
              w-full
              grid-cols-2
              gap-3
              sm:w-auto
              sm:shrink-0
            "
          >
            <ImageSlot
              file={data.images[0]}
              onChange={(f) => setImageAt(0, f)}
            />

            <ImageSlot
              file={data.images[1]}
              onChange={(f) => setImageAt(1, f)}
            />

            <ImageSlot
              file={data.images[2]}
              onChange={(f) => setImageAt(2, f)}
            />

            <ImageSlot
              file={data.images[3]}
              onChange={(f) => setImageAt(3, f)}
            />
          </div>

          {/* تصویر بزرگ */}
          <div
            className="
              aspect-square
              w-full
              sm:w-[calc(2*5.5rem+0.75rem)]
              sm:shrink-0
            "
          >
            <ImageSlot
              file={data.images[4]}
              onChange={(f) => setImageAt(4, f)}
              large
            />
          </div>

        </div>
      </div>

      {/* توضیحات */}
      <div
        dir="rtl"
        className="
          flex
          min-h-[18rem]
          flex-1
          flex-col
          rounded-2xl
          border
          border-white/20
          p-4
          sm:rounded-3xl
          sm:p-5
        "
      >

        <div
          className="
            mb-3
            text-right
            text-sm
            leading-6
            text-white/80
          "
        >
          توضیحات{" "}
          <span className="text-white">*</span>{" "}
          <span className="text-xs text-white/40">
            (۱۰۰ کلمه تا ۱۰۰۰ کلمه)
          </span>
        </div>

        <textarea
          dir="rtl"
          value={data.description}
          onChange={(e) =>
            setData((d) => ({
              ...d,
              description: e.target.value,
            }))
          }
          placeholder="ویژگی‌ها، کاربرد و مشخصات محصول را بنویسید..."
          className="
            min-h-32
            flex-1
            resize-none
            overflow-y-auto
            bg-transparent
            text-right
            text-sm
            leading-7
            text-white
            placeholder-white/30
            outline-none
          "
        />

      </div>
    </div>


    {/* ستون سمت چپ → فیلدها */}
    <div
      dir="rtl"
      className="
        order-2
        flex
        min-w-0
        flex-col
        gap-6
        lg:order-2
      "
    >

      <EditableField
        label="قیمت محصول"
        value={data.price}
        onChange={(v) => setField("price", v)}
      />

      <VerifiableField
        label="درصد خلوص"
        value={data.purity}
        onChange={(v) =>
          setData((d) => ({
            ...d,
            purity: v,
          }))
        }
        verified={data.purityVerified}
        onToggleVerified={() =>
          setData((d) => ({
            ...d,
            purityVerified: !d.purityVerified,
          }))
        }
      />

      <EditableField
        label="کشور سازنده"
        value={data.originCountry}
        onChange={(v) =>
          setField("originCountry", v)
        }
      />

      <EditableField
        label="آدرس وبسایت"
        value={data.websiteUrl}
        onChange={(v) =>
          setField("websiteUrl", v)
        }
      />

   
      <div
        dir="rtl"
        className="
          flex
          min-w-0
          flex-col
          items-end
          gap-3
          border-b
          border-white/15
          pb-4
        "
      >
        <select
          name="specialty"
          dir="rtl"
          className="
            w-full
            min-w-0
            bg-transparent
            text-right
            text-sm
            text-white
            outline-none
          "
        >
          <option
            value=""
            className="text-black"
          >
            *حوزه تخصصی
          </option>

          <option
            value="کربن"
            className="text-black"
          >
            کربن
          </option>

          <option
            value="اسید"
            className="text-black"
          >
            اسید
          </option>

          <option
            value="سولفات"
            className="text-black"
          >
            سولفات
          </option>
        </select>
      </div>

    
      <DocUploadTile
        label="فایل جدول محصول را با پسوند pdf آپلود کنید"
        file={data.productSheet}
        
        onFile={(f) =>
          setData((d) => ({
            ...d,
            productSheet: f,
          }))
        }
      />

    </div>
  </div>



  <div
    dir="rtl"
    className="
      mt-8
      grid
      grid-cols-1
      gap-3
      sm:grid-cols-2
      sm:gap-4
    "
  >

    {/* ثبت محصول → راست */}
    <button
      type="button"
      className="
        order-1
        w-full
        rounded-2xl
        bg-white
        py-3.5
        text-sm
        font-medium
        text-indigo-700
        transition
        hover:bg-white/90
        sm:order-1
        sm:py-4
      "
    >
      ثبت محصول
    </button>

    <button
      type="button"
      className="
        order-2
        w-full
        rounded-2xl
        bg-white/10
        py-3.5
        text-sm
        font-medium
        text-white
        transition
        hover:bg-white/15
        sm:order-2
        sm:py-4
      "
    >
      انصراف
    </button>

  </div>
</div>
);


}