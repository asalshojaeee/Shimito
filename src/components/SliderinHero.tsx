import React, { useEffect, useState } from "react";
import { FaRobot, FaServer, FaDumbbell } from "react-icons/fa";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";


interface TeamMember {
  name: string;
  description: string;
  image: string;
  skills: React.ReactNode[];
}


const team: TeamMember[] = [
  {
    name: "علیرضا روحی",
    description: "علیرضا روحی مشاور رسمی کسب و کار و برندینگ با بیش از 15 سال تجربه در توسعه رشد وبهبود عملکرد شرکت ها و استارتاپ ها است",
    image: "/avatar/1.jpg",
    skills: [<FaRobot/> , <FaServer/>],
  },
  {
    name: "نسیم حمیدی پور",
    description: "کارشناس ارشد هوش مصنوعی، دانش آموخته مدیریت محصول، سابقه بیش از ۸ سال فعالیت در حوزه هوش مصنوعی و...",
    image: "/avatar/5.jpg",
    skills: [<FaServer/>, <FaRobot/> ],
  },
  {
    name: "امیر محمدی",
    description: "دیرعامل مرکز نوآوری فناوری‌های نوین ورزشی هماورد است و هم‌زمان مدیریت شرکت دانش‌بنیان آریا الکتریک خیام و...",
    image: "/avatar/3.jpg",
    skills: [<FaRobot/>,<FaDumbbell/>],
  },
];


const truncateDescription = (text: string, maxWords: number = 15): string => {
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
};

const SliderinHero: React.FC = () => {
  const [current, setCurrent] = useState(0);
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // اسلایدر خودکار هر ۵ ثانیه
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % team.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + team.length) % team.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % team.length);
  };

    const getDescription = () => {
    if (isMobile) {
      return truncateDescription(team[current].description, 8);
    }
    return team[current].description;
  };

  return (
   <div className="w-full h-48 md:h-auto mt-3 max-w-3xl mx-auto backdrop-blur-xl bg-white/10 relative p-4 rounded-3xl shadow-lg flex flex-col items-center gap-6">

  {/* کارت اصلی */}
  <div className="flex justify-between border w-full bg-gray-100 rounded-3xl overflow-hidden">
  <div className="md:w-2/3 flex flex-row items-center justify-between px-2 gap-2" dir="rtl">
    <div className="mb-4">
      <h2 className="text-base md:text-xl mb-2 font-bold text-black">{team[current].name}</h2>
      <p className="text-gray-600 text-xs md:text-sm">{getDescription()}</p>
    </div>

    <div className="flex gap-3 text-3xl text-black">
      {team[current].skills.map((icon) => icon)}
    </div>
  </div>

  <div className="flex justify-center items-center">
    <img
      src={team[current].image}
      alt={team[current].name}
      className="rounded-r-3xl w-32 h-32 md:w-52 md:h-52 object-cover"
    />
  </div>
</div>


   

    <div className="flex items-center gap-3">
      <button onClick={handlePrev} className="text-gray-500 hover:text-gray-200">
        <AiOutlineArrowLeft size={20} />
      </button>

      <div className="flex gap-1">
        {team.map((_, index) => (
          <div
            key={index}
            className={`h-[2px] w-6 rounded ${index === current ? "bg-white" : "bg-gray-500"} transition-all`}
          />
        ))}
      </div>

      <button onClick={handleNext} className="text-gray-500 hover:text-gray-200">
        <AiOutlineArrowRight size={20} />
      </button>
    </div>
    
</div>

   
  );
};

export default SliderinHero;
