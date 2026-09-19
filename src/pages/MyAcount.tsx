import { useState, useRef } from "react";
import {
  Pencil,
  X,
  Check,
  ImagePlus,
  FileText,
} from "lucide-react";



interface FormData {
  fullName: string;
  fullNameVerified: boolean;
  repPhone: string;
  nationalId: string;
  address: string;
  specialties: string[];
  description: string;
  descriptionVerified: boolean;
  photo: File | null;
  resume: File | null;
}

type TextFieldKey =
  | "fullName"
  | "repPhone"
  | "nationalId"
  | "address";


function EditableField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
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
          placeholder={placeholder}
          readOnly={!editing}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          className="w-full bg-transparent text-right text-sm text-white placeholder-white/30 outline-none"
        />
      </div>


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
      </button>
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
        <span className="mb-0.5 block w-full text-right text-xs text-white/50">
          {label}
        </span>

        <input
          dir="rtl"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-right text-sm text-white outline-none"
        />
      </div>

     
      <div className="mr-4 flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={() =>
            verified && onToggleVerified()
          }
          className={`flex  items-center justify-center rounded-md transition ${
            !verified
              ? "bg-rose-400 text-white"
              : "bg-transparent text-white/30 hover:text-white/60"
          }`}
          aria-label="رد کردن"
        >
          <X
            size={17}
            strokeWidth={3}
            className="bg-red-400 text-black"
          />
        </button>

        <button
          type="button"
          onClick={() =>
            !verified && onToggleVerified()
          }
          className={`flex   items-center justify-center  transition rounded-md text-black ${
            verified
              ? "bg-white text-indigo-600"
              : "bg-transparent text-white/30 hover:text-white/60"
          }`}
          aria-label="تایید"
        >
          <Check
          className="bg-white rounded-xl"
            size={17}
            strokeWidth={3}
          />
        </button>
      </div>
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



function UploadTile({
  label,
  icon,
  accept,
  file,
  onFile,
}: {
  label: string;
  icon: React.ReactNode;
  accept: string;
  file: File | null;
  onFile: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      dir="rtl"
      className="flex items-center gap-4"
    >
      {/* Icon - Right */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="
          flex
          h-16
          w-16
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-white/10
          text-white
          transition
          hover:bg-white/15
        "
        aria-label={label}
      >
        {icon}
      </button>

  
      <span
        className="
          min-w-0
          flex-1
          text-right
          text-sm
          text-white/80
        "
      >
        {file ? file.name : label}
      </span>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) =>
          onFile(e.target.files?.[0] ?? null)
        }
      />
    </div>
  );
}


export default function ExpertProfileForm() {
  const [data, setData] =
    useState<FormData>({
      fullName: "",
      fullNameVerified: true,
      repPhone: "",
      nationalId: "",
      address: "",
      specialties: [
        "سولفات ها",
        "اسید ها",
        "مواد معدنی",
      ],
      description: "",
      descriptionVerified: false,
      photo: null,
      resume: null,
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

  // const removeTag = (tag: string) =>
  //   setData((d) => ({
  //     ...d,
  //     specialties:
  //       d.specialties.filter(
  //         (t) => t !== tag
  //       ),
  //   }));

  // const addTag = (
  //   e: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if (e.key !== "Enter") return;

  //   e.preventDefault();

  //   const value =
  //     tagInput.trim();

  //   if (
  //     value &&
  //     !data.specialties.includes(
  //       value
  //     )
  //   ) {
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
    max-w-3xl
    px-3
    py-6
    sm:px-5
    sm:py-8
  "
>
  {/* Fields */}
  <div
    className="
      grid
      grid-cols-1
      gap-x-6
      gap-y-5
      sm:grid-cols-2
      sm:gap-x-8
      sm:gap-y-6
      lg:gap-x-10
    "
  >
    <VerifiableField
      label="نام و نام خانوادگی"
      value={data.fullName}
      onChange={(v) => setField("fullName", v)}
      verified={data.fullNameVerified}
      onToggleVerified={() =>
        setData((d) => ({
          ...d,
          fullNameVerified: !d.fullNameVerified,
        }))
      }
    />

    <EditableField
      label="شماره تماس نماینده / مدیرعامل"
      value={data.repPhone}
      onChange={(v) => setField("repPhone", v)}
    />

    <EditableField
      label="شماره ملی"
      value={data.nationalId}
      onChange={(v) => setField("nationalId", v)}
    />

    <EditableField
      label="آدرس"
      value={data.address}
      onChange={(v) => setField("address", v)}
    />

    {/* Upload - سمت راست */}
    <div
      dir="rtl"
      className="
        flex
        min-w-0
        flex-col
        gap-4
        sm:gap-6
      "
    >
      <UploadTile
        icon={<ImagePlus size={24} />}
        label="عکس کاربری خود را با پسوند jpg آپلود کنید"
        accept="image/jpeg"
        file={data.photo}
        onFile={(f) =>
          setData((d) => ({
            ...d,
            photo: f,
          }))
        }
      />

      <UploadTile
        label="فایل رزومه خود را با پسوند pdf آپلود کنید"
        icon={<FileText size={24} />}
        accept="application/pdf"
        file={data.resume}
        onFile={(f) =>
          setData((d) => ({
            ...d,
            resume: f,
          }))
        }
      />
    </div>

   
    <div
      dir="rtl"
      className="
        flex
        min-w-0
        flex-col
        items-end
        gap-3
    
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
  </div>

<div
  dir="rtl"
  className="
    mt-6
    w-full
    rounded-2xl
    border
    border-white/20
    p-3
    sm:mt-8
    sm:rounded-3xl
    sm:p-5
  "
>
  {/* Description Header */}
  <div
    className="
      mb-3
      flex
      w-full
      items-center
    "
  >
    <span
      className="
        min-w-0
        text-right
        text-xs
        leading-6
        text-white/80
        sm:text-sm
      "
    >
      *
      <span className="mr-1 text-white">
        توضیحات
      </span>

      <span className="mr-1 text-white/40">
        (۱۰۰ کلمه تا ۱۰۰۰ کلمه)
      </span>
    </span>
  </div>

  {/* Textarea */}
  <textarea
    dir="rtl"
    rows={5}
    value={data.description}
    onChange={(e) =>
      setData((d) => ({
        ...d,
        description: e.target.value,
      }))
    }
    className="
      min-h-32
      w-full
      resize-none
      overflow-y-auto
      bg-transparent
      text-right
      text-sm
      leading-7
      text-white
      placeholder:text-white/30
      outline-none
    "
  />

  {/* Buttons - Bottom Left */}
  <div
    dir="ltr"
    className="
      mt-4
      flex
      w-full
      items-center
      justify-start
      gap-2
    "
  >
    {/* Verify */}
    <button
      type="button"
      onClick={() =>
        setData((d) => ({
          ...d,
          descriptionVerified:
            !d.descriptionVerified,
        }))
      }
      className={`
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-xl
        transition
        sm:h-9
        sm:w-9
        ${
          data.descriptionVerified
            ? "bg-white/25 text-white"
            : "bg-white/10 text-white/50 hover:bg-white/15"
        }
      `}
      aria-label="تایید توضیحات"
    >
      <Check
        size={16}
        strokeWidth={2.5}
      />
    </button>

    {/* Edit */}
    <button
      type="button"
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-white
        text-indigo-600
        transition
        hover:bg-white/90
        sm:h-9
        sm:w-9
      "
      aria-label="ویرایش توضیحات"
    >
      <Pencil size={16} />
    </button>
  </div>
</div>
</div>
);
}