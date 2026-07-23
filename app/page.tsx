import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function HomePage() {
  return <ThemeProvider><Navbar /><div className="lg:pl-72"><main><Hero /><About /><Projects /><Experience /><Skills /><Contact /></main><Footer /></div></ThemeProvider>;
}
