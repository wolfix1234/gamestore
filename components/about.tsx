import Image from "next/image";
import Personal from '@/components/Personal';

export default function AboutPage() {
  return (
    <>
      {/* Parent Container */}
      <div
        className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16 justify-center items-center shadow-md rounded-lg max-w-7xl mx-auto mt-10 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-8 py-6 sm:py-8"
        
      >
        {/* Image + Labels */}
        <div className="relative flex flex-col gap-6 sm:gap-8 my-4 sm:my-5 w-full md:w-auto">
          {/* Circles behind image, only outer parts visible */}
          <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 z-0 hidden sm:block">
            <div className="w-60 h-60 sm:w-70 sm:h-70 bg-pink-100 rounded-full"></div>
          </div>
          <div className="absolute top-1/2 right-[-20px] sm:right-[-30px] transform -translate-y-1/2 z-0 hidden sm:block">
            <div className="w-60 h-60 sm:w-70 sm:h-70 bg-pink-100 rounded-full"></div>
          </div>
          <div className="absolute top-1/2 left-[-20px] sm:left-[-30px] transform -translate-y-1/2 z-0 hidden sm:block">
            <div className="w-60 h-60 sm:w-70 sm:h-70 bg-pink-100 rounded-full"></div>
          </div>

          {/* Image container with overflow-hidden to mask overlapping parts of circles */}
          <div className="relative z-10 overflow-hidden rounded-lg w-full max-w-[320px] sm:max-w-[368px] h-[280px] sm:h-[320px] md:h-[368px] mx-auto md:mx-0">
            <Image
              src="/image1.jpg"
              width={500}
              height={500}
              alt="Picture of the author"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {/* Floating Labels - Hidden on smallest screens, visible from sm up */}
          <div className="absolute top-10 sm:top-20 right-0 translate-x-1/4 sm:translate-x-1/2 -translate-y-1/2 bg-white py-1.5 sm:py-2 px-3 sm:px-5 shadow-lg rounded-lg z-20 hidden sm:block">
            <h1 className="text-pink-700 text-center text-sm sm:text-base">رضایت از محصولات</h1>
            <p className="text-gray-600 text-center text-xs sm:text-sm">99% درصد</p>
          </div>
          <div className="absolute bottom-10 sm:bottom-20 right-2 sm:right-5 translate-x-1/4 sm:translate-x-1/2 -translate-y-1/2 bg-white py-1.5 sm:py-2 px-3 sm:px-5 shadow-lg rounded-lg z-20 hidden sm:block">
            <h1 className="text-pink-700 text-center text-sm sm:text-base">تعداد شعبه ها</h1>
            <p className="text-gray-600 text-center text-xs sm:text-sm">12 شهر</p>
          </div>
          <div className="absolute top-10 sm:top-20 left-0 -translate-x-1/4 sm:-translate-x-1/2 -translate-y-1/2 bg-white py-1.5 sm:py-2 px-3 sm:px-5 shadow-lg rounded-lg z-20 hidden sm:block">
            <h1 className="text-pink-700 text-center text-sm sm:text-base">تعداد مشتریان</h1>
            <p className="text-gray-700 text-center text-xs sm:text-sm">25000 کاربر</p>
          </div>
          
          {/* Mobile Stats - Visible only on smallest screens */}
          <div className="grid grid-cols-3 gap-2 sm:hidden w-full mt-4">
            <div className="bg-white py-2 px-3 shadow-md rounded-lg">
              <h1 className="text-pink-700 text-center text-sm">رضایت</h1>
              <p className="text-gray-600 text-center text-xs">99%</p>
            </div>
            <div className="bg-white py-2 px-3 shadow-md rounded-lg">
              <h1 className="text-pink-700 text-center text-sm">شعبه ها</h1>
              <p className="text-gray-600 text-center text-xs">12</p>
            </div>
            <div className="bg-white py-2 px-3 shadow-md rounded-lg">
              <h1 className="text-pink-700 text-center text-sm">مشتریان</h1>
              <p className="text-gray-700 text-center text-xs">25000</p>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 text-right mt-4 md:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-pink-300 text-center md:text-right">درباره ما</h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-full md:max-w-md px-4 md:px-0 text-center md:text-right">
            سالن جادویی صورتی با تیمی مجرب و متخصص در زمینه خدمات زیبایی، به شما
            تجربه‌ای متفاوت از زیبایی و آرامش را ارائه می‌دهد. با استفاده از
            بهترین متریال و تکنیک‌های روز دنیا، هدف ما ایجاد فضایی آرام و مدرن
            است که در آن شما می‌توانید از خدمات میکاپ، کراتینه، طراحی ناخن و
            دیگر خدمات زیبایی بهره‌مند شوید.
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="py-1.5 sm:py-2 px-6 sm:px-8 bg-pink-400 text-white rounded-full w-fit text-base sm:text-xl hover:bg-pink-500 transition-colors">
              رزرو نوبت
            </button>
          </div>
        </div>
      </div>

      {/* personal components */}
      <Personal />
    </>
  );
}
