import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
interface PayCompleteSampleModalProps {
    title?: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    // onContinue?: () => void;
}

const PayCompleteSampleModal: React.FC<PayCompleteSampleModalProps> = ({

    title = "شرایط خرید نمونه محصول",

    description = `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی موردنیاز است، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد از گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری برای طراحان رایانه ای علی الخصوص طراحان`,

    isOpen,
    onClose,
    // onContinue,
}) => {
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();
    if (!isOpen) return null;

    return createPortal(

        <div
            className="fixed  inset-0 z-[9999] flex items-center justify-center bg-[#A855F71A] backdrop-blur-md px-4"
        >
            <div
                className="border border-[#A855F7]
                bg-[#A855F71A] backdrop-blur-sm
                "
                dir="rtl"
                style={{


                    fontFamily: "'Vazirmatn', 'IRANSans', Tahoma, sans-serif",
                    width: "100%",
                    maxWidth: 650,
                    borderRadius: 40,
                    overflow: "hidden",
                    background:
                        "#A855F71A",
                    color: "#fff",
                    boxShadow:
                        "0 20px 60px rgba(20, 0, 40, 0.5)",
                }}
            >

                <div
                    className="h-30 bg-[#A855F71A] relative"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        padding: "20px",
                    }}
                >
                    <button
                        onClick={onClose}
                        aria-label="بستن"
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "#e6dcf5",
                            padding: 4,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M18 6L6 18M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    <div
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 8,
                            whiteSpace: "nowrap",
                        }}
                    >
                        <span
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                border: "1.5px solid #d8c7ec",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 12,
                                flexShrink: 0,
                            }}
                        >
                            i
                        </span>

                        <h2
                            style={{
                                margin: 0,
                                fontSize: 17,
                                fontWeight: 700,
                                color: "#fff",
                            }}
                        >
                            {title}
                        </h2>
                    </div>
                </div>

                <div
                    style={{
                        padding: "0 24px 24px 24px",
                    }}
                >

                    <p
                        style={{
                            margin: 0,
                            fontSize: 14,
                            lineHeight: 2,
                            color: "#d9cdec",
                            textAlign: "justify",
                        }}
                    >
                        {description}
                    </p>

                    <label
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                            marginTop: 28,
                            marginBottom: 20,
                            cursor: "pointer",
                            fontSize: 14,
                            color: "#e6dcf5",
                            userSelect: "none",
                        }}
                    >



                        <span
                            onClick={() =>
                                setAgreed((v) => !v)
                            }
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 5,
                                border: "1.5px solid #cbb8e8",
                                background: agreed
                                    ? "#A855F71A"
                                    : "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >

                            {agreed && (
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M5 13l4 4L19 7"
                                        stroke="#fff"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}

                        </span>
                        <span>
                            قوانین و شرایط را خوانده ام و با آن موافقت میکنم
                        </span>
                    </label>

                    <button
                        onClick={() => navigate("/continue-payment")
                        }
                        disabled={!agreed}
                        style={{
                            width: "100%",
                            padding: "14px 0",
                            borderRadius: 12,
                            border:
                                "1px solid rgba(255,255,255,0.15)",
                            background: agreed
                                ? "#FF00E533"
                                : "rgba(255,255,255,0.06)",
                            color: agreed
                                ? "#FFFFFF"
                                : "rgba(255,255,255,0.45)",
                            fontSize: 15,
                            fontWeight: 600,
                            cursor: agreed
                                ? "pointer"
                                : "not-allowed",
                            transition: "all 0.2s ease",
                        }}
                    >
                        ادامه خرید
                    </button>

                </div>
            </div>
        </div >,
        document.body
    );
};

export default PayCompleteSampleModal;