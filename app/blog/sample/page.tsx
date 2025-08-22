import { MessageSquare, Eye, UserCog, Calendar } from "lucide-react";
import Image from "next/image";

export default function Sample() {
  return (
    <div
      className="flex flex-col gap-6 sm:gap-8 md:gap-10 justify-center max-w-7xl mx-auto mt-6 sm:mt-10 md:mt-20 border border-pink-400 p-4 sm:p-6 md:p-8 rounded-lg mb-6 sm:mb-8 md:mb-10 overflow-hidden"
      
    >
            <div
        className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 justify-between bg-pink-100 rounded-lg p-3 sm:p-4"
        
      >
        <div>
          <h3 className="text-pink-600 text-xl sm:text-2xl md:text-4xl">تاثیر اپیلاسیون بر پوست</h3>
        </div>
        <div className="flex flex-row flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-0">
          <div className="flex items-center">
            <span className="flex items-center text-gray-500 text-xs sm:text-sm">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-pink-500 ml-1" />
              1404/01/19
            </span>
            <span className="mx-2 text-gray-400 hidden sm:block">|</span>
          </div>
          <div className="flex items-center">
            <span className="flex items-center text-gray-500 text-xs sm:text-sm">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-pink-500 ml-1" />
              1250
            </span>
            <span className="mx-2 text-gray-400 hidden sm:block">|</span>
          </div>
          <div className="flex items-center">
            <span className="flex items-center text-gray-500 text-xs sm:text-sm">
              <UserCog className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-pink-500 ml-1" />
              دکتر محمدی
            </span>
            <span className="mx-2 text-gray-400 hidden sm:block">|</span>
          </div>
          <div className="flex items-center">
            <span className="flex items-center text-gray-500 text-xs sm:text-sm">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-pink-500 ml-1" />
              12 نظر
            </span>
          </div>
        </div>
      </div>


      {/* Content */}
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
        {/* image */}
        <div className="w-full">
          <Image
            src="/image1.jpg"
            width={1000}
            height={600}
            alt="تصویر اپیلاسیون"
            className="w-full h-auto object-cover rounded-lg"
            priority
          />
        </div>

        {/* first paragraph */}
        <div className="flex justify-center items-center mt-2 sm:mt-4 md:mt-10">
          <p className="text-gray-500 text-sm sm:text-base md:text-lg text-right leading-loose tracking-wide">
            اپیلاسیون یکی از روش‌های رایج برای از بین بردن موهای زائده که
            معمولاً به دلیل اثرات طولانی‌مدت‌تر و نتایج صاف‌تر از روش‌های دیگه
            مثل تراشیدن یا کرم‌های موبر محبوب شده. در اپیلاسیون، موها از ریشه
            برداشته می‌شن و برای همین به مرور زمان رشد مجدد موها کندتر و نازک‌تر
            می‌شه. این یعنی با گذشت زمان، شما نیاز به تکرار کمتر خواهید داشت و
            پوست مدت طولانی‌تری صاف و بدون مو باقی می‌مونه. به همین دلیل خیلی‌ها
            اپیلاسیون رو به سایر روش‌ها ترجیح می‌دن چون نتایجش بیشتر و
            ماندگارتره.
          </p>
        </div>
        
        {/* quote section */}
        <div className="bg-pink-50 text-pink-700 p-4 sm:p-5 md:p-6 rounded-xl shadow-sm max-w-6xl mx-auto text-right leading-loose font-medium">
          {/* <div className="flex justify-end text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 text-pink-600">
            <span>"</span>
          </div> */}
          <p className="text-sm sm:text-base md:text-lg">
            یکی دیگه از نکات مهم اینه که اپیلاسیون برای افرادی که از داروهای خاص
            استفاده می‌کنن یا شرایط پوستی خاصی دارن (مثل پسوریازیس یا اگزما)
            ممکنه مناسب نباشه. این افراد باید قبل از تصمیم‌گیری درباره‌ی
            اپیلاسیون با پزشک مشورت کنن.
          </p>
          {/* <div className="flex justify-start text-2xl sm:text-3xl md:text-3xl mt-2 sm:mt-3 md:mt-4 text-pink-600">
            <span>"</span>
          </div> */}
        </div>

        {/* third part - checklist and image */}
        <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 md:gap-10 p-3 sm:p-4 md:p-6">
          {/* Text and checklist section */}
          <div className="w-full lg:w-1/2 space-y-3 sm:space-y-4">
            {/* Selected items */}
            <div className="flex items-start bg-pink-100 p-3 sm:p-4 rounded-lg">
              <div className="text-white bg-pink-500 rounded-full p-1 w-5 h-5 sm:w-6 sm:h-6 ml-1 flex items-center justify-center text-xs sm:text-sm">
                ✓
              </div>
              <p className="text-xs sm:text-sm md:text-base font-medium">
                تأثیرات اپیلاسیون روی بدن؛ خوب و بدش رو بشناس!
              </p>
            </div>
            <div className="flex items-start bg-pink-100 p-3 sm:p-4 rounded-lg">
              <div className="text-white bg-pink-500 rounded-full p-1 w-5 h-5 sm:w-6 sm:h-6 ml-1 flex items-center justify-center text-xs sm:text-sm">
                ✓
              </div>
              <p className="text-xs sm:text-sm md:text-base font-medium">
                چطور اپیلاسیون می‌تونه پوستتو تغییر بده؟ همه چیز درباره اثراتش
              </p>
            </div>
            <div className="flex items-start bg-pink-100 p-3 sm:p-4 rounded-lg">
              <div className="text-white bg-pink-500 rounded-full p-1 w-5 h-5 sm:w-6 sm:h-6 ml-1 flex items-center justify-center text-xs sm:text-sm">
                ✓
              </div>
              <p className="text-xs sm:text-sm md:text-base font-medium">
                از اپیلاسیون چه انتظاری داشته باشیم؟ تاثیرات بلندمدت این روش
              </p>
            </div>

            {/* Unselected items (numbered) */}
            <div className="flex items-start border border-gray-300 p-3 sm:p-4 rounded-lg">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-pink-500 text-pink-500 text-xs flex items-center justify-center font-bold ml-1">
                ۱
              </div>
              <p className="text-xs sm:text-sm md:text-base font-medium">
                آیا اپیلاسیون به پوست آسیب می‌زنه؟ تاثیرات منفی و مثبتش رو بدون
              </p>
            </div>
            <div className="flex items-start border border-gray-300 p-3 sm:p-4 rounded-lg">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-pink-500 text-pink-500 text-xs flex items-center justify-center font-bold ml-1">
                ۲
              </div>
              <p className="text-xs sm:text-sm md:text-base font-medium">
                تاثیر اپیلاسیون روی پوست: مزایا و معایب این روش محبوب
              </p>
            </div>
          </div>

          {/* Image section */}
          <div className="w-full lg:w-1/2 overflow-hidden rounded-xl shadow-lg mt-4 lg:mt-0">
            <Image
              src="/image1.jpg"
              width={2000}
              height={1500}
              alt="تصویر اپیلاسیون"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>

        {/* final paragraph */}
        <div className="flex justify-center items-center my-4 sm:my-6 md:my-10">
          <p className="text-gray-500 text-sm sm:text-base md:text-lg text-right leading-loose tracking-wide">
            همچنین اپیلاسیون ممکنه به مرور زمان باعث تیرگی پوست در بعضی نواحی
            بشه، مخصوصاً اگر اپیلاسیون در مناطق حساس بدن مثل زیر بغل یا بیکینی
            انجام بشه. این تغییر رنگ معمولاً موقته، اما اگر پوست به شدت تحت فشار
            یا کشش قرار بگیره، ممکنه آثارش طولانی‌تر بمونه. برای جلوگیری از این
            مشکل، باید از محصولات مراقبتی مناسب برای روشن‌کردن و تغذیه پوست
            استفاده کرد.
          </p>
        </div>
      </div>

      {/* tags */}
      <div className="flex flex-wrap gap-2 sm:gap-3 md:space-x-4 items-center">
        <p className="text-base sm:text-lg w-full sm:w-auto mb-2 sm:mb-0">برچسب ها:</p>
        <p className="py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-full bg-pink-200 text-xs sm:text-sm">اپیلاسیون</p>
        <p className="py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-full bg-pink-200 text-xs sm:text-sm">مراقبت پوست</p>
        <p className="py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-full bg-pink-200 text-xs sm:text-sm">زیبایی</p>
        <p className="py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-full bg-pink-200 text-xs sm:text-sm">سلامت</p>
      </div>
    </div>
  );
}
