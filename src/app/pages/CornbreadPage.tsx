import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import CornbreadStrategy from "../components/CornbreadStrategy";

export default function CornbreadPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="fixed top-20 left-6 z-50">
        <button
          onClick={() => navigate("/partners")}
          className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={13} /> Partners
        </button>
      </div>
      <CornbreadStrategy />
    </div>
  );
}
