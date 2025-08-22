import Gallery from "@/components/Gallery"
import Link from "next/link"

export default function Page() {
  const sidebarCategories = [
    {
      title: "Gaming Categories",
      links: [
        { text: "PC Gaming", href: "/blog" },
        { text: "Console Gaming", href: "/blog" },
        { text: "VR Gaming", href: "/blog" },
        { text: "Mobile Gaming", href: "/blog" },
        { text: "Esports", href: "/blog" }
      ]
    },
    {
      title: "Popular Articles",
      links: [
        { text: "Best Gaming Setup Guide", href: "/blog" },
        { text: "Top Gaming Peripherals 2024", href: "/blog" },
        { text: "Gaming Performance Optimization", href: "/blog" },
        { text: "Esports Training Methods", href: "/blog" },
        { text: "VR Gaming Basics", href: "/blog" }
      ]
    },
    {
      title: "Latest Content",
      links: [
        { text: "Gaming Trends 2024", href: "/blog" },
        { text: "New Gaming Hardware Reviews", href: "/blog" },
        { text: "Gaming Gear Buying Guide", href: "/blog" },
        { text: "Gaming Performance Tips", href: "/blog" },
        { text: "Summer Gaming Events", href: "/blog/" }
      ]
    }
  ];

  return(
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4 order-2 lg:order-1 md:-mt-8">
            <Gallery />
          </div>
          
          <div className="w-full lg:w-1/4 order-1 lg:order-2">
            <div className="flex flex-col gap-6 sticky top-4">
              {sidebarCategories.map((category, index) => (
                <div key={index} className="flex flex-col gap-5 p-5 border-2 border-cyan-400/30 rounded-lg shadow-2xl bg-gray-800/80 backdrop-blur-sm">
                  <div className="py-3 px-8 bg-cyan-400 rounded-full shadow-md">
                    <h3 className="text-black text-center font-bold">{category.title}</h3>
                  </div>
                  <div className="flex flex-col gap-3" >
                    {category.links.map((link, linkIndex) => (
                      <Link 
                        key={linkIndex} 
                        href={link.href}
                        className="text-gray-300 hover:text-cyan-400 transition-colors py-1 border-b border-gray-700 last:border-0"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex flex-col gap-5 p-5 border-2 border-cyan-400/30 rounded-lg shadow-2xl bg-gray-800/80 backdrop-blur-sm">
                <div className="py-3 px-8 bg-cyan-400 rounded-full shadow-md">
                  <h3 className="text-black text-center font-bold">Newsletter</h3>
                </div>
                <p className="text-gray-300 text-sm text-center">
                  Subscribe to get the latest gaming news and articles
                </p>
                <form className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="border border-gray-600 bg-gray-700 text-white rounded-md p-2 text-right focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                    
                  />
                  <button 
                    type="submit" 
                    className="bg-cyan-400 text-black py-2 rounded-md hover:bg-cyan-300 transition-colors font-medium"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}