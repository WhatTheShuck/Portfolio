import { personalInfo } from "@/lib/data";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {personalInfo.name}. Built with Next.js
          and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
