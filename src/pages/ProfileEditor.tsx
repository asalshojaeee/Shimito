// import { useState } from "react";
// import { Pencil, Check, X, ImagePlus, FileText, Plus } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";


// type EditableFieldProps = {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   align?: "right" | "left";
// };

// function EditableField({ label, value, onChange, align = "right" }: EditableFieldProps) {
//   const [editing, setEditing] = useState(false);

//   return (
//     <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-2">
//       <button
//         type="button"
//         onClick={() => setEditing((e) => !e)}
//         className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
//         aria-label={`ویرایش ${label}`}
//       >
//         <Pencil size={14} />
//       </button>
//       {editing ? (
//         <input
//           autoFocus
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           onBlur={() => setEditing(false)}
//           className={`flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40 ${align === "right" ? "text-right" : "text-right"
//             }`}
//         />
//       ) : (
//         <span className="flex-1 text-right text-sm text-white/90">
//           {value || <span className="text-white/40">{label}</span>}
//         </span>
//       )}
//     </div>
//   );
// }

// function VerifiedField({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-2">
//       <div className="flex shrink-0 items-center gap-1.5">
//         <span className="flex h-5 w-5 items-center justify-center rounded-md bg-rose-500/80 text-white">
//           <X size={12} strokeWidth={3} />
//         </span>
//         <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/90 text-indigo-700">
//           <Check size={12} strokeWidth={3} />
//         </span>
//       </div>
//       <span className="flex-1 text-right text-sm text-white/90">{value || label}</span>
//     </div>
//   );
// }

// function UploadRow({
//   label,
//   hint,
//   icon,
// }: {
//   label: string;
//   hint: string;
//   icon: React.ReactNode;
// }) {
//   const [fileName, setFileName] = useState<string | null>(null);
//   const inputId = `upload-${label}`;

//   return (
//     <div className="flex items-center justify-between gap-3">
//       <label htmlFor={inputId} className="cursor-pointer">
//         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white/80 backdrop-blur transition hover:bg-white/20">
//           {icon}
//         </div>
//         <input
//           id={inputId}
//           type="file"
//           className="hidden"
//           onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
//         />
//       </label>
//       <span className="flex-1 text-right text-sm leading-6 text-white/90">
//         {fileName ?? label}
//         <span className="block text-xs text-white/50">{hint}</span>
//       </span>
//     </div>
//   );
// }

// function Chip({ text, onRemove }: { text: string; onRemove: () => void }) {
//   return (
//     <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-sm text-indigo-900 shadow-sm">
//       {text}
//       <button
//         type="button"
//         onClick={onRemove}
//         className="text-indigo-400 transition hover:text-rose-500"
//         aria-label={`حذف ${text}`}
//       >
//         <X size={13} strokeWidth={2.5} />
//       </button>
//     </span>
//   );
// }

const SIDEBAR_ITEMS = [
  {
    title: "حساب کاربری",
    path: "account",
  },
  {
    title: "اضافه کردن محصول",
    path: "addproduct",
  },
  {
    title: "محصول های من",
    path: "myproduct",
  },
];

export default function ProfileEditor() {
  // const [fullName, setFullName] = useState("");
  // const [repPhone, setRepPhone] = useState("");
  // const [nationalId, setNationalId] = useState("");
  // const [address, setAddress] = useState("");
  // const [tags, setTags] = useState(["اسید ها", "سولفات ها", "مواد معدنی"]);
  // const [description, setDescription] = useState("");
  // const [descriptionLocked, setDescriptionLocked] = useState(false);
  // const [activeTab, setActiveTab] = useState(SIDEBAR_ITEMS[0]);

  // const removeTag = (tag: string) => setTags((t) => t.filter((x) => x !== tag));

  // const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;

return (
  <div
    dir="rtl"
    className="
      relative
      min-h-screen
      w-full
      overflow-hidden
      bg-[#0d0818]
      font-sans
      text-white
    "
  >
    {/* =========================
        BACKGROUND IMAGE
        ========================= */}
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        bg-cover
        bg-left-top
        bg-no-repeat
      "
      style={{
        backgroundImage: "url('/image 3.png')",
      }}
    />


    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
   
      <div
        className="
          absolute
          left-[-160px]
          top-0
          h-[600px]
          w-[600px]
          rounded-full
          bg-fuchsia-600/30
          blur-[140px]
        "
      />

      {/* Glow 2 - ثابت */}
      <div
        className="
          absolute
          left-[500px]
          top-[220px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-indigo-600/30
          blur-[140px]
        "
      />

      {/* Glow 3 - ثابت */}
      <div
        className="
          absolute
          right-[-160px]
          bottom-[-100px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet-700/25
          blur-[140px]
        "
      />
    </div>

    {/* =========================
        CONTENT
        ========================= */}
    <div
      className="
        relative
        z-10
        mx-auto
        w-full
        max-w-7xl
        px-6
        pb-10
        pt-28
      "
    >
      <div
        className="
          mt-8
          flex
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.06]
          backdrop-blur-xl

          lg:flex-row
        "
      >
        {/* =========================
            SIDEBAR
            ========================= */}
        <aside
          className="
            w-full
            shrink-0
            p-8

            lg:w-72
          "
        >
          <h2
            className="
              mb-6
              text-right
              text-xl
              font-bold
              text-white
            "
          >
            مدیریت محصول
          </h2>

          <nav className="flex flex-col gap-2">
            {SIDEBAR_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-right text-sm transition ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* =========================
            CONTENT
            ========================= */}
        <section
          className="
            min-w-0
            flex-1
            border-t
            border-white/10
            p-10

            lg:border-t-0
            lg:border-r
            lg:border-white/10
          "
        >
          <Outlet />
        </section>
      </div>
    </div>
  </div>
);
}