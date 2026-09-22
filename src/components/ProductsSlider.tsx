import SectionTitle2 from './SectionTitle'

import MoleculeCardSlider from './MoleculeCardSlider'

const products = [
    {
        id: "1",
        name: "پودر شیمیایی منیزیم سولفات",
        descriptionFa: "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
        image: "/image 4.png",
    },
    {
        id: "2",
        name: "پودر شیمیایی منیزیم سولفات",
        descriptionFa: "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
        image: "/image 4.png",
    },
    {
        id: "3",
        name: "پودر شیمیایی منیزیم سولفات",
        descriptionFa: "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
        image: "/image 4.png",
    },
    {
        id: "4",
        name: "پودر شیمیایی منیزیم سولفات",
        descriptionFa: "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
        image: "/image 4.png",
    },
        {
        id: "5",
        name: "پودر شیمیایی منیزیم سولفات",
        descriptionFa: "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
        image: "/image 4.png",
    },
        {
        id: "6",
        name: "پودر شیمیایی منیزیم سولفات",
        descriptionFa: "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
        image: "/image 4.png",
    },
     {
        id: "6",
        name: "پودر شیمیایی منیزیم سولفات",
        descriptionFa: "گیرنده امواج الکترومغناطیسی ذهن برای ناوبری کاملاً بی‌سیم و بدون نیاز به دست در تست.",
        image: "/image 4.png",
    }
];
const Products = () => {
  return (
    <div className="w-full">
      <SectionTitle2>
        محصولات
      </SectionTitle2>

      <MoleculeCardSlider
        items={products}
        interval={3000}
      />
    </div>
  );
};

export default Products