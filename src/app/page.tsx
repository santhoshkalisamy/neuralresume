import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="flex flex-col justify-between h-screen bg-slate-50">
            <header className="py-10">
                <Header/>
            </header>
            <main>
                <HeroSection/>
            </main>
            <footer className="bg-slate-100/50">
                <Footer />
            </footer>
        </div>
    );
}
