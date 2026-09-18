
import React, { useState } from "react";
import { FileText, X, Facebook } from "lucide-react";
import { Link } from "react-router";

interface FormData {
  lastName: string;
  contactPhone: string;
  nationalId: string;
  address: string;
}

export default function CompanySignupForm() {
  const [form, setForm] = useState<FormData>({
    lastName: "",
    contactPhone: "",
    nationalId: "",
    address: "",
  });

  const [tags, setTags] = useState<string[]>([
    "مکانیک",
    "الکترونیک",
    "هوش مصنوعی",
  ]);

  const [tagInput, setTagInput] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleChange =
    (key: keyof FormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
          ...prev,
          [key]: e.target.value,
        }));
      };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();

      const newTag = tagInput.trim();

      if (!tags.includes(newTag)) {
        setTags((prev) => [...prev, newTag]);
      }

      setTagInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert("لطفا قوانین و مقررات را بپذیرید.");
      return;
    }

    console.log({
      form,
      tags,
      avatarFile,
      resumeFile,
    });

    alert("فرم ثبت شد");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full flex justify-center px-4 md:px-10 pt-32 pb-10"
      style={{
        backgroundImage: "url('/image 3.png')",
        backgroundPosition: "right center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
      }}
    >
      <div className="w-full max-w-6xl mt-8 md:mt-10 bg-[#FFFFFF00] ">
        <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#2a1157]/70  to-[#0d0818]/80 backdrop-blur-2xl shadow-[0_0_80px_rgba(139,92,246,0.2)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr]">

            <div className="relative flex flex-col items-center justify-center gap-6 px-10 py-12  order-1 md:order-none">
              <img src="register-company-logo.png" />

              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  ثبت نام شرکت
                </h2>

                <p className="text-sm text-white leading-7 max-w-[220px] mx-auto">
                  لطفا اطلاعات دقیق شرکت خود را در مقابل فرم وارد کنید و
                  اطلاعات تمام بخش ها را کامل کنید
                </p>
              </div>

              <Link
                to="/profileeditor"
                className="mt-auto flex items-center gap-2 text-fuchsia-400 text-sm underline"
              >
                <UserIcon />
                ثبت نام افراد
              </Link>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-12 text-white space-y-8 order-2 md:order-none bg-[#FFFFFF0A] rounded-3xl"
            >
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 ">
                <Field
                  label="نام و نام خانوادگی"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                />

                <Field
                  label="شماره تماس نماینده / مدیرعامل"
                  value={form.contactPhone}
                  onChange={handleChange("contactPhone")}
                />

                <Field
                  label="شماره ملی"
                  value={form.nationalId}
                  onChange={handleChange("nationalId")}
                />

                <Field
                  label="آدرس"
                  value={form.address}
                  onChange={handleChange("address")}
                />
              </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">

  <div className="order-1 flex flex-col gap-5">
    <UploadRow
      label="عکس کاربری خود را با پسوند jpg آپلود کنید"
      icon={
        <img
          src="/Image Add.png"
          alt="افزودن تصویر"
          className="h-5 w-5"
        />
      }
      accept="image/jpeg"
      file={avatarFile}
      onFile={setAvatarFile}
    />

    <UploadRow
      icon={<FileText size={18} />}
      label="فایل رزومه خود را با پسوند pdf آپلود کنید"
      accept="application/pdf"
      file={resumeFile}
      onFile={setResumeFile}
    />
  </div>

 
  <div className="order-2">
    <label className="mb-3 block text-sm text-white/70">
      <span className="text-white">*</span>
      {" "}
      حوزه تخصصی
    </label>

    <input
      type="text"
      value={tagInput}
      onChange={(e) => setTagInput(e.target.value)}
      onKeyDown={addTag}
      className="
        w-full
        border-b
        border-white/25
        bg-transparent
        pb-2
        text-sm
        text-white
        outline-none
        transition-colors
        focus:border-fuchsia-400
      "
    />
  </div>
</div>

        

 {/* قوانین و مقررات */}
<div
  className="
    flex
    w-full
    flex-wrap
    items-center
    justify-center
    gap-2
    text-center
    text-sm
    text-white/70
  "
>
  <label className="flex cursor-pointer select-none items-center gap-2">
    <input
      type="checkbox"
      checked={agreed}
      onChange={(e) => setAgreed(e.target.checked)}
      className="
        h-4
        w-4
        rounded
        border-white/30
        bg-transparent
        accent-fuchsia-500
      "
    />

    <span>
      قوانین و مقررات را خوانده‌ام و با آن موافقت می‌کنم
    </span>
  </label>

  <a
    href="#"
    className="text-[#4AD7FF] underline"
  >
    قوانین و مقررات
  </a>
</div>

{/* دکمه ثبت‌نام */}
<button
  type="submit"
  className="
    mx-auto
    block
    w-full
    max-w-[513px]
    rounded-xl
    bg-gradient-to-l
    from-white
    to-purple-100
    py-3.5
    text-sm
    font-semibold
    text-[#6155F5]
    shadow-[0_0_30px_rgba(255,255,255,0.15)]
    transition-opacity
    hover:opacity-90
  "
>
  ثبت نام شرکت
</button>

{/* ثبت‌نام با شبکه‌های اجتماعی */}
<div
  className="
    flex
    w-full
    flex-wrap
    items-center
    justify-center
    gap-x-8
    gap-y-4
    text-sm
    text-white/70
  "
>
  <button
    type="button"
    className="flex items-center gap-2 text-white"
  >
    <GoogleIcon />
    ثبت نام با گوگل
  </button>

  <button
    type="button"
    className="flex items-center gap-2 text-white"
  >
    <Facebook
      size={16}
      className="text-[#1877F2]"
    />
    ثبت نام با فیسبوک
  </button>
</div>

{/* ورود */}
<p className="text-center text-sm text-white">
  قبلا ثبت نام کرده‌اید؟{" "}
  <a
    href="#"
    className="text-[#4AD7FF] hover:underline"
  >
    ورود
  </a>
</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-white/70 text-sm mb-3">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-white/25 pb-2 text-white text-sm outline-none focus:border-fuchsia-400 transition-colors"
      />
    </div>
  );
}

function UploadRow({
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
  const inputId = React.useId();

  return (
    <div
      className="
        flex
        w-full
        flex-row-reverse
        items-center
        justify-center
        gap-2
      "
    >
      {/* متن سمت چپ */}
      <span
        className="
          min-w-0
          flex-1
       
          text-sm
          leading-6
          text-white/70
        "
      >
        {file ? file.name : label}
      </span>

      {/* آیکن سمت راست */}
      <label
        htmlFor={inputId}
        className="
          flex
          h-11
          w-11
          shrink-0
          cursor-pointer
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-white/10
          text-white
          transition-colors
          hover:bg-white/20
        "
      >
        {icon}

        <input
          id={inputId}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) =>
            onFile(e.target.files?.[0] ?? null)
          }
        />
      </label>
    </div>
  );
}

// function Logo({ large = false }: { large?: boolean }) {
//   const size = large ? "gap-1.5" : "gap-1";
//   const dot = large ? "w-4 h-9" : "w-3 h-7";

//   return (
//     <div className="flex flex-col items-center">
//       <div className={`flex items-end ${size}`}>
//         <span className={`${dot} rounded-full bg-white`} />
//         <span className={`${dot} rounded-full bg-white`} />
//         <span
//           className={`${large ? "w-4 h-4" : "w-3 h-3"} rounded-full bg-fuchsia-300 self-end`}
//         />
//       </div>

//       {large && (
//         <span className="mt-3 text-2xl font-bold text-white tracking-wide">
//           Co Name
//         </span>
//       )}
//     </div>
//   );
// }

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
      />

      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />

      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2C29.2 35.6 26.7 36.5 24 36.5c-5.3 0-9.8-3.5-11.4-8.3l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />

      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.2 5.2C40.8 35.4 44 30.2 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M4 20c0-4 3.6-6 8-6s8 2 8 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

