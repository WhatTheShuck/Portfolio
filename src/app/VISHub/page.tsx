import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Video() {
  return (
    <div className={`min-h-screen bg-background ${inter.className}`}>
      <Header />
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-16">
        <div className="space-y-6">
          <video width="1024" height="576" controls preload="none">
            <source src="/VISHub-Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>

      <Footer />
    </div>
  );
}
