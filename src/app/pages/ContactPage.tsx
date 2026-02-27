import { useEffect } from "react";
import { Contact } from "../components/Contact";

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <div className="pt-14 md:pt-14" /> {/* spacer for fixed navbar */}
      <Contact />
    </>
  );
}
