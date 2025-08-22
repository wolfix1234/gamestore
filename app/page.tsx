import Hero from "../components/Hero";
import Intro from "../components/Intro";
import ServiceSlider from "../components/ServiceSlider";
import ServiceTable from "../components/ServiceTable";
import Skills from "../components/Skills";
import Gallery from "@/components/Gallery";
import Personals from "@/components/Personal";
import Brands from "@/components/Brands";
import Comments from "@/components/CommentSlider";
import PriceList from "@/components/PriceList";
import News from "@/components/News";
import Store from "@/components/Store";


export default function Home() {
  return (
    <div>
      {/* <AnnouncementBar
        message="🎮 MEGA SALE: Up to 70% OFF on AAA Games & Gaming Gear - Limited Time!"
        link="/products"
        linkText="Shop Now"
      /> */}
      {/* <Navbar /> */}
      <Hero />
      <Intro />
      <ServiceSlider />
      <ServiceTable />
      <Skills />
      <Gallery />
      <Personals />
      <Brands />
      <Comments />
      {/* <ContactForm /> */}
      {/* <Rezervation /> */}
      <PriceList />
      <News />
      <Store />
      {/* <Footer /> */}
    </div>
  );
}

