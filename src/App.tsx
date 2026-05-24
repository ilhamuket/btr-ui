import { useState, useEffect } from 'react';
import { 
  Menu, X, Search, Play, MapPin, Calendar, Check, X as XIcon, 
  Download, Info, ChevronDown, User, Lock, Mail, Phone, FileText, Award, 
  AlertTriangle, ArrowRight, ArrowLeft, HeartPulse, Shirt, CreditCard, 
  Wallet, ShieldCheck, Box, Clock, Mountain
} from 'lucide-react';

// --- TYPES ---
type CategoryId = '100k' | '60k' | '30k' | '18k' | '7k';
type NavState = { category?: CategoryId };

interface Category {
  id: CategoryId;
  name: string;
  title: string;
  dist: string;
  elev: string;
  cot: string;
  priceLocal: string;
  priceForeign: string;
  utmb: string;
  mountain: string;
  itra: string;
  color: string;
  textColor: string;
  img: string;
}

type NavigateFn = (path: string, state?: NavState) => void;

// --- DATA DUMMY ---
const categoriesData: Record<CategoryId, Category> = {
  '100k': { id: '100k', name: '100K', title: 'BTR ULTRA 100KM', dist: '106.20 KM', elev: '7.244 m+', cot: '34 hrs', priceLocal: '2.040.000', priceForeign: '2.140.000', utmb: '100M M', mountain: '10', itra: '5', color: 'bg-[#e3000f]', textColor: 'text-[#e3000f]', img: 'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&q=80&w=600' },
  '60k': { id: '60k', name: '60K', title: 'BTR ULTRA 60KM', dist: '61.30 KM', elev: '3.819 m+', cot: '19 hrs', priceLocal: '1.740.000', priceForeign: '1.840.000', utmb: '100K M', mountain: '7', itra: '3', color: 'bg-[#7ac142]', textColor: 'text-[#7ac142]', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600' },
  '30k': { id: '30k', name: '30K', title: 'BTR ULTRA 30KM', dist: '28.91 KM', elev: '1.205 m+', cot: '8 hrs', priceLocal: '1.240.000', priceForeign: '1.340.000', utmb: '20K M', mountain: '6', itra: '1', color: 'bg-[#f39200]', textColor: 'text-[#f39200]', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600' },
  '18k': { id: '18k', name: '18K', title: 'BTR ULTRA 18KM', dist: '18.71 KM', elev: '880 m+', cot: '7 hrs', priceLocal: '940.000', priceForeign: '1.040.000', utmb: '20K M', mountain: '4', itra: '0', color: 'bg-[#00aeef]', textColor: 'text-[#00aeef]', img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=600' },
  '7k': { id: '7k', name: '7K', title: 'BTR ULTRA 7KM', dist: '6.53 KM', elev: '257 m+', cot: '4 hrs', priceLocal: '640.000', priceForeign: '740.000', utmb: '-', mountain: '-', itra: '0', color: 'bg-[#d70071]', textColor: 'text-[#d70071]', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600' },
};

const galleryImages: string[] = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  "https://images.unsplash.com/photo-1448375240586-882707db888b"
];

// ==========================================
// NAVBAR COMPONENT
// ==========================================
interface NavbarProps {
  currentPath: string;
  navigate: NavigateFn;
  isScrolled: boolean;
}

function Navbar({ currentPath, navigate, isScrolled }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const handleNav = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  const raceInfoLinks = [
    { label: 'Race Venue', path: 'info-venue' },
    { label: 'Event Schedule', path: 'info-schedule' },
    { label: 'Rules and Regulation', path: 'info-rules' },
    { label: 'Mandatory Gear', path: 'info-gear' },
    { label: 'Race Pack Collection', path: 'info-rpc' },
    { label: 'Merchandise', path: 'info-merch' },
    { label: 'Accommodation', path: 'info-accommodation' },
    { label: 'Download Race Guide', path: 'info-dl-guide' },
    { label: 'Download GPX', path: 'info-dl-gpx' },
    { label: 'Download Waiver Letter', path: 'info-dl-waiver' },
    { label: 'Download PARQ', path: 'info-dl-parq' },
    { label: 'Download Surat Kuasa', path: 'info-dl-kuasa' },
    { label: 'Download Logo', path: 'info-dl-logo' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || currentPath !== 'home' ? 'bg-black/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2 border-b border-white/10' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'}`}>
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO */}
          <div className="flex items-center space-x-6 z-50">
            <div className="hidden lg:flex flex-col items-center border-r border-white/20 pr-6">
              <span className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.3em] mb-1">Presented By</span>
              <div className="flex space-x-3 items-center">
                <span className="text-blue-500 font-black italic text-xl drop-shadow-md">my<span className="text-white">BCA</span></span>
                <span className="text-white font-black italic text-xl drop-shadow-md">asics</span>
              </div>
            </div>
            <div onClick={() => handleNav('home')} className="text-3xl lg:text-4xl font-black italic tracking-tighter leading-none cursor-pointer flex flex-col group">
              <span className="text-white group-hover:text-red-600 transition-colors duration-300">BTR</span>
              <span className="text-red-600 -mt-2 group-hover:text-white transition-colors duration-300">ULTRA</span>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden xl:flex items-center space-x-1 h-full">
            <button onClick={() => handleNav('home')} className={`px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors relative group ${currentPath === 'home' ? 'text-red-500' : 'text-white hover:text-red-500'}`}>HOME<span className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-600 transition-all ${currentPath === 'home' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span></button>
            
            {/* RACE INFO DROPDOWN */}
            <div className="relative group">
              <button className={`flex items-center px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors ${currentPath.startsWith('info-') ? 'text-red-500' : 'text-white group-hover:text-red-500'}`}>
                RACE INFO <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="w-64 bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col py-2">
                  {raceInfoLinks.map((link) => (
                    <button key={link.path} onClick={() => handleNav(link.path)} className={`text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${currentPath === link.path ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-red-500 hover:pl-8'}`}>
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CATEGORIES DROPDOWN */}
            <div className="relative group">
              <button className={`flex items-center px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors ${currentPath.startsWith('category-') ? 'text-red-500' : 'text-white group-hover:text-red-500'}`}>
                CATEGORIES <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="w-56 bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col py-2">
                  {Object.values(categoriesData).map((cat) => (
                    <button key={cat.id} onClick={() => handleNav(`category-${cat.id}`)} className={`text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${currentPath === `category-${cat.id}` ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-red-500 hover:pl-8'}`}>
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => handleNav('results')} className={`px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors relative group ${currentPath === 'results' ? 'text-red-500' : 'text-white hover:text-red-500'}`}>RESULTS<span className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-600 transition-all ${currentPath === 'results' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span></button>
            <button onClick={() => handleNav('gallery')} className={`px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors relative group ${currentPath === 'gallery' ? 'text-red-500' : 'text-white hover:text-red-500'}`}>GALLERY<span className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-600 transition-all ${currentPath === 'gallery' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span></button>
            <button onClick={() => handleNav('news')} className={`px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors relative group ${currentPath === 'news' || currentPath === 'news-detail' ? 'text-red-500' : 'text-white hover:text-red-500'}`}>NEWS<span className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-600 transition-all ${currentPath === 'news' || currentPath === 'news-detail' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span></button>
            <button onClick={() => handleNav('contact')} className={`px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors relative group ${currentPath === 'contact' ? 'text-red-500' : 'text-white hover:text-red-500'}`}>CONTACT<span className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-600 transition-all ${currentPath === 'contact' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span></button>
            
            <div className="pl-4">
              <button onClick={() => handleNav('login')} className="bg-transparent hover:bg-white text-white hover:text-black border border-white/30 hover:border-white px-6 py-2.5 rounded text-[11px] font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105">LOGIN</button>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="xl:hidden flex items-center z-50">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-red-500 transition-colors">
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div className={`xl:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl z-40 transition-all duration-500 overflow-y-auto ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="pt-24 px-6 pb-20 flex flex-col space-y-2">
          <button onClick={() => handleNav('home')} className="w-full text-left text-sm font-black uppercase tracking-widest text-white py-4 border-b border-white/10">HOME</button>
          
          <div>
            <button onClick={() => setMobileDropdown(mobileDropdown === 'info' ? null : 'info')} className="w-full flex justify-between items-center text-sm font-black uppercase tracking-widest text-white py-4 border-b border-white/10">
              RACE INFO <ChevronDown size={18} className={`transform transition-transform duration-300 ${mobileDropdown === 'info' ? 'rotate-180 text-red-500' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${mobileDropdown === 'info' ? 'max-h-[800px] py-2' : 'max-h-0'}`}>
              {raceInfoLinks.map(link => (
                <button key={link.path} onClick={() => handleNav(link.path)} className="block w-full text-left text-xs font-bold text-zinc-400 py-3 pl-4 hover:text-red-500 uppercase tracking-wider">{link.label}</button>
              ))}
            </div>
          </div>

          <div>
            <button onClick={() => setMobileDropdown(mobileDropdown === 'cat' ? null : 'cat')} className="w-full flex justify-between items-center text-sm font-black uppercase tracking-widest text-white py-4 border-b border-white/10">
              CATEGORIES <ChevronDown size={18} className={`transform transition-transform duration-300 ${mobileDropdown === 'cat' ? 'rotate-180 text-red-500' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${mobileDropdown === 'cat' ? 'max-h-[500px] py-2' : 'max-h-0'}`}>
              {Object.values(categoriesData).map(cat => (
                <button key={cat.id} onClick={() => handleNav(`category-${cat.id}`)} className="block w-full text-left text-xs font-bold text-zinc-400 py-3 pl-4 hover:text-red-500 uppercase tracking-wider">{cat.title}</button>
              ))}
            </div>
          </div>

          <button onClick={() => handleNav('results')} className="w-full text-left text-sm font-black uppercase tracking-widest text-white py-4 border-b border-white/10">RESULTS</button>
          <button onClick={() => handleNav('gallery')} className="w-full text-left text-sm font-black uppercase tracking-widest text-white py-4 border-b border-white/10">GALLERY</button>
          <button onClick={() => handleNav('news')} className="w-full text-left text-sm font-black uppercase tracking-widest text-white py-4 border-b border-white/10">NEWS</button>
          <button onClick={() => handleNav('contact')} className="w-full text-left text-sm font-black uppercase tracking-widest text-white py-4 border-b border-white/10">CONTACT</button>
          <button onClick={() => handleNav('login')} className="w-full text-left text-sm font-black uppercase tracking-widest text-red-500 py-4 mt-4">LOGIN TO PORTAL</button>
        </div>
      </div>
    </nav>
  );
}

// ==========================================
// FOOTER COMPONENT
// ==========================================
interface FooterProps {
  navigate: NavigateFn;
}

function Footer({ navigate }: FooterProps) {
  return (
    <div className="bg-black">
      <section className="bg-zinc-950 py-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-2xl font-black italic text-white">ITRA</div>
          <div className="text-center font-black leading-none text-white">
            <span className="block text-sm">UTMB</span>
            <span className="block text-xl text-blue-500">INDEX</span>
          </div>
          <div className="text-center font-black text-white">
            <span className="block text-xs uppercase tracking-widest">National</span>
            <span className="text-xl">ITRA LEAGUE 2026</span>
          </div>
          <div className="text-xl font-black tracking-widest uppercase border-2 border-white px-2 py-1 text-white">TRAILMASTER</div>
        </div>
      </section>
      <footer className="bg-black border-t border-zinc-900 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div onClick={() => navigate('home')} className="cursor-pointer text-4xl font-black italic tracking-tighter text-white mb-2 hover:text-red-500 transition-colors">
              BTR<span className="text-red-600">ULTRA</span>
            </div>
            <p className="text-zinc-600 text-xs font-semibold tracking-wider">© 2026 Bali Trail Running. All Rights Reserved.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
             <button onClick={() => navigate('info-rules')} className="hover:text-white transition-colors">Rules</button>
             <button onClick={() => navigate('contact')} className="hover:text-white transition-colors">Contact</button>
             <button onClick={() => navigate('login')} className="hover:text-red-500 transition-colors">Login</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// HOME VIEW
// ==========================================
interface HomeViewProps {
  navigate: NavigateFn;
}

function HomeView({ navigate }: HomeViewProps) {
  return (
    <div className="animate-fade-in -mt-24">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&q=80&w=2000" 
            alt="Runner in mountain" 
            className="w-full h-full object-cover opacity-80"
            style={{ animation: 'zoomInOut 20s ease-in-out infinite alternate' }}
          />
          <style>{`@keyframes zoomInOut { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }`}</style>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl px-4 mt-20">
          <div className="inline-block border border-red-600 bg-red-600/20 backdrop-blur-sm text-red-500 font-bold uppercase tracking-[0.3em] text-xs px-4 py-1.5 mb-6 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            Kintamani, Bangli, Bali
          </div>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-none mb-4">
            BTR <span className="text-red-600">ULTRA</span>
          </h1>
          <p className="text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-zinc-300 mb-10 drop-shadow-lg">
            Brutal Torture Race 2026
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button onClick={() => navigate('register')} className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-4 px-12 text-lg uppercase tracking-[0.15em] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] skew-x-[-10deg]">
              <span className="skew-x-[10deg] block">Register Now</span>
            </button>
            <button onClick={() => document.getElementById('categories')?.scrollIntoView({behavior: 'smooth'})} className="w-full sm:w-auto bg-black/50 backdrop-blur-md border-2 border-white/50 hover:bg-white hover:text-black hover:border-white text-white font-black py-4 px-12 text-lg uppercase tracking-[0.15em] transition-all duration-300 transform hover:scale-105 skew-x-[-10deg]">
              <span className="skew-x-[10deg] block">Categories</span>
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="bg-zinc-100 py-24 relative z-20 overflow-hidden" id="categories">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-0 shadow-2xl relative">
            {Object.values(categoriesData).map((cat, index) => (
              <div key={cat.id} className={`bg-white text-black relative flex flex-col group overflow-hidden border-zinc-200 ${index !== 0 ? 'border-l lg:border-l-0 lg:border-l border-t lg:border-t-0' : 'border-t lg:border-t-0'}`}>
                <div className="h-[250px] w-full overflow-hidden">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                </div>

                <div className="p-6 flex flex-col flex-grow z-10 relative bg-white">
                  <div className="text-center font-black mb-6 flex flex-col items-center">
                    <div className="text-lg tracking-tight uppercase">BTR ULTRA</div>
                    <div className={`mt-1 inline-block text-white px-5 py-0.5 italic transform -skew-x-12 shadow-md ${cat.color}`}>
                      <span className="skew-x-12 block text-4xl">{cat.name}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-b border-zinc-200 pb-3 mb-4">
                    <div className="text-center w-1/3">
                      <div className="text-[6px] text-zinc-400 font-bold uppercase tracking-widest mb-1">UTMB CATEGORY</div>
                      <div className={`font-black text-sm ${cat.utmb !== '-' ? cat.textColor : 'text-zinc-400'}`}>{cat.utmb}</div>
                    </div>
                    <div className="text-center w-1/3 border-x border-zinc-200">
                      <div className="text-[6px] text-zinc-400 font-bold uppercase tracking-widest mb-1">MOUNTAIN LEVEL</div>
                      <div className="font-black text-sm flex items-center justify-center">
                        {cat.mountain !== '-' ? <><Mountain size={14} className="mr-1"/> {cat.mountain}</> : '-'}
                      </div>
                    </div>
                    <div className="text-center w-1/3">
                      <div className="text-[6px] text-zinc-400 font-bold uppercase tracking-widest mb-1">ITRA POINT</div>
                      <div className={`inline-block text-white text-[10px] px-2 py-0.5 rounded font-black ${cat.itra !== '0' ? cat.color : 'bg-zinc-400'}`}>ITRA {cat.itra}</div>
                    </div>
                  </div>

                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">DISTANCE:</div>
                      <div className="font-black text-xs">{cat.dist}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">ELEVATION:</div>
                      <div className="font-black text-xs">{cat.elev}</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                     <div className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">CUT-OFF TIME:</div>
                     <div className="font-black text-xs">{cat.cot}</div>
                  </div>

                  <div className="flex justify-between mb-6">
                    <div>
                      <div className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">PRICE LOCAL:</div>
                      <div className="font-black text-xs">IDR {cat.priceLocal}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">FOREIGNER:</div>
                      <div className="font-black text-xs">IDR {cat.priceForeign}</div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 relative z-20">
                    <button onClick={() => navigate(`category-${cat.id}`)} className="bg-[#e3000f] hover:bg-red-700 text-white font-bold py-2.5 px-6 text-xs uppercase tracking-widest transition-colors shadow-md">
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-zinc-950 py-32 border-t border-white/5 relative overflow-hidden" id="about">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic text-white drop-shadow-xl">BTR ULTRA 2026</h2>
          <h3 className="text-xl md:text-2xl font-bold uppercase text-red-600 mb-10 tracking-[0.2em]">The Seventh Edition of Bali's Brutal Trail Race</h3>
          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-light">
            <p>Welcome to the 7th Edition of BTR Ultra 2026, where trail runners from around the world are challenged to conquer Bali's most beautiful landscapes in an unforgettable Ultra Volcano to Volcano journey.</p>
            <p>Designed as a Brutal Trail Race, BTR Ultra 2026 pushes your physical and mental limits while rewarding you with breathtaking scenery, cultural encounters, and the unmatched satisfaction of crossing from one volcano to another.</p>
            <p className="text-white font-bold italic pt-4">This is where nature meets culture. This is where endurance becomes legend.</p>
          </div>
        </div>
      </section>

      {/* SCENIC GALLERY */}
      <section className="bg-black pt-20 pb-0">
        <div className="max-w-[1400px] mx-auto px-4 mb-12 text-center">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Our Scenic <span className="text-red-600">Course</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-0 overflow-hidden">
          {['PASAR AGUNG', 'TRUNYAN HILL', 'SONGAN', 'PINE FOREST'].map((item, idx) => (
            <div key={idx} onClick={() => navigate('gallery')} className="relative aspect-square md:aspect-[4/3] group overflow-hidden bg-zinc-900 cursor-pointer">
             <img
                src={`${galleryImages[idx]}?auto=format&fit=crop&q=80&w=800`}
                alt={item}
                className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-125"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/10 transition-colors">
                <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-[0.2em] text-center opacity-0 transform translate-y-10 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 drop-shadow-2xl">{item}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="bg-zinc-950 py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 text-white">Relive the <span className="text-red-600">Adventure</span></h2>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] mb-12 text-sm">Highlights from BTR ULTRA 2025</p>
          <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] group cursor-pointer border border-white/10 aspect-video">
             <img src="https://images.unsplash.com/photo-1533202998083-d52ec1eb311b?auto=format&fit=crop&q=80&w=1600" alt="Video Highlight" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
             <div className="absolute top-0 left-0 w-full p-6 flex items-center bg-gradient-to-b from-black/90 to-transparent">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-xs mr-4 shadow-lg shadow-red-600/30">BTR</div>
                <div className="text-left">
                  <div className="text-white font-bold text-base sm:text-lg shadow-black drop-shadow-md">BCA Bali Trail Running Ultra 2025 presented by Asics</div>
                </div>
              </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                  <Play size={40} className="text-white ml-2" fill="currentColor" />
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// REGISTER VIEW
// ==========================================
interface RegisterViewProps {
  navigate: NavigateFn;
}

function RegisterView({ navigate }: RegisterViewProps) {
  const [formData, setFormData] = useState<{ category: CategoryId }>({ category: '100k' });

  const handleProceed = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('payment', { category: formData.category });
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white">Runner <span className="text-red-600">Registration</span></h1>
        <p className="text-zinc-400 mt-4 text-lg">Please fill in your details completely for the official race registry.</p>
      </div>
      
      <div className="bg-zinc-950 border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>
        
        <form className="space-y-10" onSubmit={handleProceed}>
          
          {/* Section 1: Race Category */}
          <div>
            <h3 className="text-xl font-black uppercase text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <Award className="text-red-600 mr-3" /> 1. Select Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.values(categoriesData).map(c => (
                <label key={c.id} className={`cursor-pointer border rounded-xl p-4 text-center transition-all ${formData.category === c.id ? 'bg-red-600/10 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'bg-black border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="category" value={c.id} checked={formData.category === c.id} onChange={(e) => setFormData({...formData, category: e.target.value as CategoryId})} className="hidden" />
                  <div className="font-black italic text-lg text-white">{c.name}</div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase mt-1">IDR {c.priceLocal}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Section 2: Personal Data */}
          <div>
            <h3 className="text-xl font-black uppercase text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <User className="text-red-600 mr-3" /> 2. Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">First Name *</label><input required type="text" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all" /></div>
              <div><label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Last Name *</label><input required type="text" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all" /></div>
              <div><label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Email Address *</label><input required type="email" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all" /></div>
              <div><label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Phone Number (WhatsApp) *</label><input required type="tel" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all" /></div>
              <div><label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">ID / Passport Number *</label><input required type="text" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all" /></div>
              <div><label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">City of Origin (Asal Kota) *</label><input required type="text" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all" /></div>
              <div><label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Community / Club Name</label><input type="text" placeholder="Optional" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all" /></div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">T-Shirt Size *</label>
                <select required className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all appearance-none">
                  <option value="">Select Size</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Medical & Emergency */}
          <div>
            <h3 className="text-xl font-black uppercase text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <HeartPulse className="text-red-600 mr-3" /> 3. Medical & Emergency
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Blood Type *</label>
                <select required className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all appearance-none">
                  <option value="">Select</option><option>A</option><option>B</option><option>AB</option><option>O</option>
                </select>
              </div>
              <div><label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Allergies / Medical Conditions</label><input type="text" placeholder="Leave blank if none" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all" /></div>
              <div className="md:col-span-2 border border-red-900/30 bg-red-950/10 p-6 rounded-xl mt-2">
                <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-4">Emergency Contact Person</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Contact Name *</label><input required type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none" /></div>
                  <div><label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Contact Phone *</label><input required type="tel" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none" /></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex justify-end">
            <button type="submit" className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-4 px-12 rounded-xl text-lg uppercase tracking-widest shadow-[0_10px_20px_rgba(220,38,38,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center">
              Proceed to Payment <ArrowRight size={20} className="ml-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// PAYMENT / CHECKOUT VIEW
// ==========================================
interface PaymentViewProps {
  navigate: NavigateFn;
  category: CategoryId;
}

function PaymentView({ navigate, category }: PaymentViewProps) {
  const cat = categoriesData[category] ?? categoriesData['100k'];
  const adminFee = 25000;
  const rawPrice = parseInt(cat.priceLocal.replace(/\./g, ''), 10);
  const total = rawPrice + adminFee;
  
  const [paymentMethod, setPaymentMethod] = useState('va');

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-4 py-16">
      <button onClick={() => navigate('register')} className="text-zinc-500 hover:text-white flex items-center mb-8 text-sm font-bold uppercase tracking-widest transition-colors"><ArrowLeft size={16} className="mr-2"/> Back to Details</button>
      
      <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-10">Checkout <span className="text-red-600">Payment</span></h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Order Summary */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 shadow-2xl sticky top-28">
            <h3 className="text-lg font-black uppercase text-white mb-6 border-b border-white/10 pb-4">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-white text-lg">{cat.title}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Local Runner Registration</div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-zinc-400">Registration Fee</span><span className="font-bold text-white">IDR {cat.priceLocal}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Platform & Admin Fee</span><span className="font-bold text-white">IDR 25.000</span></div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-center mb-8">
              <span className="font-bold uppercase tracking-widest text-zinc-400 text-sm">Total Due</span>
              <span className="font-black text-2xl text-red-500">IDR {total.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex items-center text-[10px] text-zinc-500 uppercase tracking-wider bg-black p-3 rounded-lg border border-white/5">
              <ShieldCheck size={16} className="text-green-500 mr-2 shrink-0"/> Secure SSL Encrypted Payment
            </div>
          </div>
        </div>

        {/* Right: Payment Method */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 shadow-2xl">
             <h3 className="text-xl font-black uppercase text-white mb-6 flex items-center"><CreditCard className="text-red-600 mr-3" /> Select Payment Method</h3>
             
             <div className="space-y-4 mb-10">
               <label className={`cursor-pointer border rounded-xl p-6 flex items-center transition-all ${paymentMethod === 'va' ? 'bg-red-600/10 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'bg-black border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'va'} onChange={() => setPaymentMethod('va')} className="hidden" />
                  <div className="w-6 h-6 rounded-full border-2 border-zinc-600 flex items-center justify-center mr-4">
                    {paymentMethod === 'va' && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-white text-lg flex items-center">BCA Virtual Account <span className="ml-3 bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded uppercase">Recommended</span></div>
                    <div className="text-xs text-zinc-500 mt-1">Instant confirmation, pay via myBCA or BCA Mobile.</div>
                  </div>
               </label>
               
               <label className={`cursor-pointer border rounded-xl p-6 flex items-center transition-all ${paymentMethod === 'cc' ? 'bg-red-600/10 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'bg-black border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'cc'} onChange={() => setPaymentMethod('cc')} className="hidden" />
                  <div className="w-6 h-6 rounded-full border-2 border-zinc-600 flex items-center justify-center mr-4">
                    {paymentMethod === 'cc' && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">Credit / Debit Card</div>
                    <div className="text-xs text-zinc-500 mt-1">Visa, Mastercard, JCB supported.</div>
                  </div>
               </label>

               <label className={`cursor-pointer border rounded-xl p-6 flex items-center transition-all ${paymentMethod === 'qris' ? 'bg-red-600/10 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'bg-black border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'qris'} onChange={() => setPaymentMethod('qris')} className="hidden" />
                  <div className="w-6 h-6 rounded-full border-2 border-zinc-600 flex items-center justify-center mr-4">
                    {paymentMethod === 'qris' && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">QRIS E-Wallet</div>
                    <div className="text-xs text-zinc-500 mt-1">Gopay, OVO, Dana, ShopeePay.</div>
                  </div>
               </label>
             </div>

             <button onClick={() => alert("Redirecting to Payment Gateway...")} className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-5 rounded-xl text-lg uppercase tracking-widest shadow-[0_10px_20px_rgba(220,38,38,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center">
                <Wallet size={24} className="mr-3" /> Pay Now (IDR {total.toLocaleString('id-ID')})
             </button>
             <p className="text-center text-[10px] text-zinc-500 mt-4 uppercase tracking-wider">By proceeding, you agree to our Terms & Conditions and Refund Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// RACE INFO VIEW
// ==========================================
interface RaceInfoViewProps {
  initialTab: string;
  navigate: NavigateFn;
}

function RaceInfoView({ initialTab, navigate }: RaceInfoViewProps) {
  const [activeTab, setActiveTab] = useState(initialTab || 'venue');

  const tabs = [
    { id: 'venue', label: 'Race Venue' },
    { id: 'schedule', label: 'Event Schedule' },
    { id: 'rules', label: 'Rules & Regs' },
    { id: 'gear', label: 'Mandatory Gear' },
    { id: 'rpc', label: 'Race Pack Collection' },
    { id: 'merch', label: 'Merchandise' },
    { id: 'accommodation', label: 'Accommodation' },
    { id: 'dl-guide', label: 'Download Race Guide' },
    { id: 'dl-gpx', label: 'Download GPX' },
    { id: 'dl-waiver', label: 'Download Waiver' },
    { id: 'dl-parq', label: 'Download PAR-Q' },
    { id: 'dl-kuasa', label: 'Download Surat Kuasa' },
    { id: 'dl-logo', label: 'Download Logo' },
  ];

  useEffect(() => { setActiveTab(initialTab || 'venue'); }, [initialTab]);

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white">Race <span className="text-red-600">Information</span></h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR MENU */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden sticky top-28 shadow-2xl">
            <div className="p-5 bg-black border-b border-white/10"><h3 className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">Directory Guide</h3></div>
            <div className="max-h-[70vh] overflow-y-auto py-2">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setActiveTab(t.id); navigate(`info-${t.id}`); }}
                  className={`w-full text-left px-6 py-4 font-bold uppercase text-[11px] tracking-widest border-b border-white/5 transition-all ${activeTab === t.id ? 'bg-red-600 text-white pl-8 shadow-[inset_4px_0_0_0_#fff]' : 'hover:bg-white/5 hover:text-white text-zinc-400'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-grow bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl min-h-[60vh]">
          
          {activeTab === 'venue' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black uppercase italic text-white mb-8 flex items-center"><MapPin className="text-red-600 mr-3" size={32}/> Race Venue</h2>
              <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden mb-8 relative border border-white/10 shadow-lg group">
                 <img src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Batur Hot Spring"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-start p-8">
                    <div>
                      <h3 className="text-3xl font-black text-white uppercase drop-shadow-xl mb-1">Batur Natural Hot Spring</h3>
                      <p className="text-red-400 font-bold tracking-widest text-sm uppercase">Toya Bungkah, Kintamani, Bali</p>
                    </div>
                 </div>
              </div>
              <div className="bg-black border border-white/10 p-6 rounded-xl">
                <p className="text-zinc-300 leading-relaxed text-lg font-light">Batur Natural Hot Spring is located in Toya Bungkah, Kintamani, Bali. It's a popular spot for tourists and locals alike who want to relax and unwind in the natural hot springs while enjoying the beautiful views of Lake Batur and Mount Batur.</p>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black uppercase italic text-white mb-8 flex items-center"><Calendar className="text-red-600 mr-3" size={32}/> Event Schedule</h2>
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden overflow-x-auto shadow-lg">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-zinc-900 border-b border-white/10">
                      <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Date</th>
                      <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Time</th>
                      <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Event Details</th>
                      <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Location</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-red-400">Thu, 14 May</td>
                      <td className="p-5 text-zinc-400">12:00 - 20:00</td>
                      <td className="p-5 font-bold text-white">Race Kit Collection Day 1</td>
                      <td className="p-5 text-zinc-500 text-xs">Batur Hot Spring</td>
                    </tr>
                    <tr className="border-b border-white/10 bg-zinc-900/30 hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-red-400">Thu, 14 May</td>
                      <td className="p-5 text-zinc-400">16:00 - 17:00</td>
                      <td className="p-5 font-bold text-white">Race Briefing BTRU 100K</td>
                      <td className="p-5 text-zinc-500 text-xs">Batur Hot Spring</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-red-400">Fri, 15 May</td>
                      <td className="p-5 text-zinc-400">12:00 - 20:00</td>
                      <td className="p-5 font-bold text-white">Race Kit Collection Day 2</td>
                      <td className="p-5 text-zinc-500 text-xs">Batur Hot Spring</td>
                    </tr>
                    <tr className="border-b border-white/10 bg-red-900/20 hover:bg-red-900/30 transition-colors">
                      <td className="p-5 font-black text-red-500">Fri, 15 May</td>
                      <td className="p-5 font-black text-white">18:00 WITA</td>
                      <td className="p-5 font-black text-white text-lg tracking-wider">FLAG OFF BTRU 100K</td>
                      <td className="p-5 text-zinc-400 text-xs font-bold">Start Line</td>
                    </tr>
                    <tr className="border-b border-white/5 bg-red-900/20 hover:bg-red-900/30 transition-colors">
                      <td className="p-5 font-black text-red-500">Sat, 16 May</td>
                      <td className="p-5 font-black text-white">04:00 WITA</td>
                      <td className="p-5 font-black text-white text-lg tracking-wider">FLAG OFF BTRU 60K</td>
                      <td className="p-5 text-zinc-400 text-xs font-bold">Start Line</td>
                    </tr>
                    <tr className="border-b border-white/10 bg-red-900/20 hover:bg-red-900/30 transition-colors">
                      <td className="p-5 font-black text-red-500">Sat, 16 May</td>
                      <td className="p-5 font-black text-white">06:00 WITA</td>
                      <td className="p-5 font-black text-white text-lg tracking-wider">FLAG OFF BTRU 30K</td>
                      <td className="p-5 text-zinc-400 text-xs font-bold">Start Line</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'gear' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black uppercase italic text-white mb-8 flex items-center"><ShieldCheck className="text-red-600 mr-3" size={32}/> Mandatory Gear</h2>
              <p className="text-zinc-400 mb-6 font-light">The following gears are strictly mandatory. Gear checks will be performed.</p>
              <div className="bg-black border border-white/10 rounded-2xl overflow-x-auto shadow-lg">
                <table className="w-full text-center border-collapse">
                  <thead><tr className="bg-zinc-900 border-b border-white/10"><th className="p-5 text-left text-[11px] font-black text-zinc-400 uppercase tracking-[0.1em]">Equipment Item</th><th className="p-5 text-[11px] font-black text-red-500 uppercase tracking-[0.1em]">7 KM</th><th className="p-5 text-[11px] font-black text-red-500 uppercase tracking-[0.1em]">18K / 30K</th><th className="p-5 text-[11px] font-black text-red-500 uppercase tracking-[0.1em]">60K / 100K</th></tr></thead>
                  <tbody className="text-sm">
                    {[
                      { name: 'BIB Number (Official)', k7: true, k18: true, k100: true },
                      { name: 'Water/Flask (min 500ml)', k7: 'Rec.', k18: true, k100: true },
                      { name: 'Mobile Phone (Active)', k7: true, k18: true, k100: true },
                      { name: 'Energy Food / Bars', k7: 'Rec.', k18: true, k100: true },
                      { name: 'Personal First Aid Kit', k7: false, k18: true, k100: true },
                      { name: 'Running Pack / Vest', k7: 'Rec.', k18: true, k100: true },
                      { name: 'Foldable Cup (No plastics)', k7: true, k18: true, k100: true },
                      { name: 'Waterproof Rain Jacket', k7: 'Rec.', k18: true, k100: true },
                      { name: 'Emergency Thermal Blanket', k7: false, k18: true, k100: true },
                      { name: 'Headlamp + Spare Battery', k7: false, k18: 'Rec.', k100: true },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-left font-bold text-white bg-black/50">{row.name}</td>
                        <td className="p-4">{row.k7 === true ? <Check className="mx-auto text-green-500" size={20}/> : row.k7 === false ? <XIcon className="mx-auto text-red-500/50" size={20}/> : <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-wider">{row.k7}</span>}</td>
                        <td className="p-4">{row.k18 === true ? <Check className="mx-auto text-green-500" size={20}/> : row.k18 === false ? <XIcon className="mx-auto text-red-500/50" size={20}/> : <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-wider">{row.k18}</span>}</td>
                        <td className="p-4 bg-zinc-900/30">{row.k100 === true ? <Check className="mx-auto text-green-500" size={20}/> : row.k100 === false ? <XIcon className="mx-auto text-red-500/50" size={20}/> : <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-wider">{row.k100}</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'rpc' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black uppercase italic text-white mb-8 flex items-center"><Box className="text-red-600 mr-3" size={32}/> Race Pack Collection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-black border border-white/10 p-8 rounded-2xl shadow-lg">
                  <h3 className="text-red-500 font-black uppercase tracking-widest text-sm mb-4 border-b border-white/10 pb-2">RPC Rules & Regulations</h3>
                  <ul className="space-y-4 text-sm text-zinc-300">
                    <li className="flex items-start"><AlertTriangle size={16} className="text-yellow-500 mr-3 mt-0.5 shrink-0"/> <span>You <strong>must</strong> collect your own RPC. It cannot be represented.</span></li>
                    <li className="flex items-start"><AlertTriangle size={16} className="text-yellow-500 mr-3 mt-0.5 shrink-0"/> <span>Outside collection hours, pickup available by reservation with additional fee of <strong>IDR 100,000</strong>.</span></li>
                    <li className="flex items-start"><Info size={16} className="text-blue-500 mr-3 mt-0.5 shrink-0"/> <span>For DNS, RPC can be shipped until 31 May 2026 with shipping costs paid by participant.</span></li>
                  </ul>
                </div>
                <div className="bg-red-950/20 border border-red-900/30 p-8 rounded-2xl shadow-lg">
                  <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4 border-b border-red-900/30 pb-2">What To Bring?</h3>
                  <ul className="space-y-3 text-sm font-bold text-white">
                    <li className="flex items-center"><Check size={18} className="text-red-500 mr-3"/> QR Kit Collection (from App)</li>
                    <li className="flex items-center"><Check size={18} className="text-red-500 mr-3"/> Valid ID Card / Passport</li>
                    <li className="flex items-center"><Check size={18} className="text-red-500 mr-3"/> Medical Health Certificate</li>
                    <li className="flex items-center"><Check size={18} className="text-red-500 mr-3"/> Signed Waiver & PAR-Q Form</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'merch' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black uppercase italic text-white mb-8 flex items-center"><Shirt className="text-red-600 mr-3" size={32}/> Official Merchandise</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'BTR Finisher Jacket', price: 'IDR 450.000', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400' },
                  { name: 'BTR Trail Running Tee', price: 'IDR 250.000', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400' },
                  { name: 'Volcano Cap', price: 'IDR 150.000', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=400' }
                ].map((m, i) => (
                  <div key={i} className="bg-black border border-white/10 rounded-xl overflow-hidden group">
                     <div className="aspect-square overflow-hidden bg-zinc-900 relative p-6">
                        <img src={m.img} alt={m.name} className="w-full h-full object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-500"/>
                     </div>
                     <div className="p-5 text-center border-t border-white/5">
                        <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">{m.name}</h4>
                        <div className="text-red-500 font-black">{m.price}</div>
                        <button className="w-full mt-4 bg-white/5 hover:bg-red-600 text-white py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors">Pre-Order Now</button>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'rules' || activeTab === 'accommodation' || activeTab.startsWith('dl-')) && (
            <div className="animate-fade-in flex flex-col items-center justify-center min-h-[40vh] text-center bg-black border border-white/10 rounded-2xl p-10">
              <FileText size={80} className="text-zinc-800 mb-6" />
              <h2 className="text-2xl font-black uppercase text-white mb-2">
                Section: {activeTab.replace('dl-', '').toUpperCase()}
              </h2>
              <p className="text-zinc-500 mb-8 max-w-md font-light">The detailed file or document for this section is available for download.</p>
              <button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-4 px-10 rounded-full flex items-center uppercase tracking-widest transition-transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                <Download size={20} className="mr-3" /> Download File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CATEGORY DETAIL VIEW
// ==========================================
interface CategoryDetailViewProps {
  categoryId: string;
  navigate: NavigateFn;
}

function CategoryDetailView({ categoryId, navigate }: CategoryDetailViewProps) {
  const cat = categoriesData[categoryId as CategoryId] ?? categoriesData['100k'];
  
  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 py-16">
      <div className="relative rounded-3xl overflow-hidden mb-12 h-[500px] flex flex-col justify-end p-8 md:p-16 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] group">
        <div className="absolute inset-0">
          <img src={cat.img} alt="Trail" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex space-x-4 mb-6">
            {cat.utmb !== '-' && <span className={`${cat.color} text-white text-xs font-bold px-4 py-1.5 rounded uppercase tracking-wider shadow-lg`}>{cat.utmb}</span>}
            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-4 py-1.5 rounded uppercase tracking-wider">ITRA {cat.itra}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">{cat.title}</h1>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('register', { category: cat.id })} className="bg-red-600 hover:bg-red-500 text-white font-black py-4 px-10 rounded-lg text-sm uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-colors">Register Now</button>
            <button onClick={() => navigate('info-schedule')} className="bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-black font-bold py-4 px-10 rounded-lg text-sm uppercase tracking-[0.2em] border border-white/20 transition-all">Race Schedule</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-black border border-white/10 p-8 rounded-2xl text-center shadow-lg"><Calendar className="mx-auto text-red-600 mb-4" size={40} /><div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Race Date</div><div className="font-black text-white text-xl">15-16 May 2026</div></div>
        <div className="bg-black border border-white/10 p-8 rounded-2xl text-center shadow-lg"><MapPin className="mx-auto text-red-600 mb-4" size={40} /><div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Elevation Gain</div><div className="font-black text-white text-xl">{cat.elev}</div></div>
        <div className="bg-black border border-white/10 p-8 rounded-2xl text-center shadow-lg"><Clock className="mx-auto text-red-600 mb-4" size={40} /><div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Cut Off Time</div><div className="font-black text-white text-xl">{cat.cot}</div></div>
        <div className="bg-black border border-white/10 p-8 rounded-2xl text-center shadow-lg"><Info className="mx-auto text-red-600 mb-4" size={40} /><div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Support</div><div className="font-black text-white text-xl">Full Stations</div></div>
      </div>
    </div>
  );
}

// ==========================================
// RESULTS VIEW
// ==========================================
function ResultsView() {
  const dummyResults = [
    { rank: 1, name: 'BUL SUGIARTO', bib: '2440', time: '14:33:00', cat: '100K Male', country: 'IDN' },
    { rank: 2, name: 'THETA WARDAN', bib: '2441', time: '16:43:31', cat: '100K Male', country: 'IDN' },
    { rank: 3, name: 'MENDRA WANT', bib: '2442', time: '18:30:25', cat: '100K Male', country: 'IDN' },
    { rank: 4, name: 'MOHD PARIVE BI', bib: '2443', time: '21:40:40', cat: '100K Male', country: 'MYS' },
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-4">Race <span className="text-red-600">Results</span></h1>
        <p className="text-zinc-400 font-light text-lg">Official Leaderboard BTR Ultra 2025</p>
      </div>

      <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 md:p-8 bg-black border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
           <select className="bg-zinc-900 border border-white/20 text-white p-3 rounded-lg text-sm font-bold outline-none focus:border-red-500 w-full md:w-auto uppercase tracking-wider">
             <option>100K Category</option><option>60K Category</option>
           </select>
           <div className="relative w-full md:w-96"><Search size={18} className="absolute left-4 top-3.5 text-zinc-500"/><input type="text" placeholder="Search runner name or BIB..." className="w-full bg-zinc-900 border border-white/20 text-white p-3 pl-12 rounded-lg text-sm outline-none focus:border-red-500 transition-colors"/></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-zinc-900 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/10">
                <th className="p-6 w-24 text-center">Rank</th>
                <th className="p-6">Runner Details</th>
                <th className="p-6">BIB</th>
                <th className="p-6">Category</th>
                <th className="p-6 text-right">Finish Time</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold">
              {dummyResults.map((r) => (
                <tr key={r.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-6 text-center text-zinc-400 font-black text-lg">#{r.rank}</td>
                  <td className="p-6 text-white text-base">
                    {r.name} <span className="ml-2 bg-white/10 text-[9px] px-2 py-0.5 rounded text-zinc-300">{r.country}</span>
                  </td>
                  <td className="p-6 text-zinc-500">{r.bib}</td>
                  <td className="p-6 text-zinc-400">{r.cat}</td>
                  <td className="p-6 text-right text-red-500 font-black tracking-wider">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// NEWS VIEW
// ==========================================
interface NewsViewProps {
  navigate: NavigateFn;
}

function NewsView({ navigate }: NewsViewProps) {
  const newsData = [
    { id: 1, date: '14 May 2026', title: 'Dani Chika Siap Taklukkan 60 Kilometer BTR Ultra 2026; Langkah Serius Menuju Trail Jepang', img: 'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&q=80&w=600' },
    { id: 2, date: '14 May 2026', title: 'Atlet Pelari Indonesia Kuasai Podium Kategori 30 Kilometer Bali Trail Running', img: 'https://images.unsplash.com/photo-1533202998083-d52ec1eb311b?auto=format&fit=crop&q=80&w=600' },
    { id: 3, date: '14 May 2026', title: 'Usia 55 Tahun, Daniel Roy Asal Malang Semangat Ikuti BTR Ultra', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600' },
    { id: 4, date: '8 May 2026', title: 'BTR Bali: spectacular racing expected around Mt Batur for 7th Edition', img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-center text-white mb-16">Latest <span className="text-red-600">News</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {newsData.map((news) => (
          <div key={news.id} onClick={() => navigate('news-detail')} className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden group hover:border-red-600 transition-all shadow-xl cursor-pointer flex flex-col md:flex-row h-full">
             <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden relative">
               <img src={news.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="News Thumbnail" />
               <div className="absolute top-4 left-4 bg-red-600 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">{news.date}</div>
             </div>
             <div className="p-8 w-full md:w-3/5 flex flex-col justify-center">
               <h3 className="font-black text-xl text-white group-hover:text-red-500 transition-colors leading-snug mb-6">{news.title}</h3>
               <button className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center group-hover:text-white transition-colors mt-auto">Read Full Article <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-2 transition-transform"/></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// NEWS DETAIL VIEW
// ==========================================
interface NewsDetailViewProps {
  navigate: NavigateFn;
}

function NewsDetailView({ navigate }: NewsDetailViewProps) {
  return (
    <div className="animate-fade-in bg-white text-black min-h-screen -mt-24 pt-24 pb-20">
       <div className="max-w-4xl mx-auto px-4">
         <button onClick={() => navigate('news')} className="text-zinc-500 hover:text-red-600 flex items-center mb-10 text-xs font-bold uppercase tracking-widest transition-colors"><ArrowLeft size={16} className="mr-2"/> Back to News</button>
         <div className="text-red-600 font-bold text-xs uppercase tracking-widest mb-4">BTR ULTRA 2026 • 14 May 2026</div>
         <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight mb-8">Dani Chika Siap Taklukkan 60 Kilometer BTR Ultra 2026</h1>
         <img src="https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&q=80&w=1200" className="w-full rounded-2xl mb-10 shadow-xl" alt="Dani Chika" />
         <article className="prose prose-lg max-w-none text-zinc-700 font-serif leading-relaxed space-y-6">
           <p className="text-xl font-medium">Menjelang start Bali Trail Run (BTR) Ultra 2026 di Kintamani, suasana basecamp sudah terasa menggeliat.</p>
           <p>Pelari trail berbakat ini menargetkan penyelesaian rute brutal 60 Kilometer yang mengelilingi Gunung Batur dan Gunung Abang. Persiapan intensif telah dilakukan selama enam bulan terakhir.</p>
           <p>Ajang BTR Ultra tahun ini juga menjadi batu loncatan baginya untuk mengumpulkan poin ITRA demi kualifikasi lomba trail bergengsi di Jepang tahun depan.</p>
         </article>
       </div>
    </div>
  );
}

// ==========================================
// GALLERY VIEW
// ==========================================
function GalleryPageView() {
  const images = [
    "photo-1501785888041-af3ef285b470",
    "photo-1500530855697-b586d89ba3ee",
    "photo-1493246507139-91e8fad9978e",
    "photo-1469474968028-56623f02e42e",
    "photo-1507525428034-b723cf961d3e",
    "photo-1441974231531-c6227db76b6e",
    "photo-1470770841072-f978cf4d019e",
    "photo-1500534623283-312aade485b7",
    "photo-1519681393784-d120267933ba",
    "photo-1491553895911-0055eca6402d",
    "photo-1500534314209-a25ddb2bd429",
    "photo-1501785888041-af3ef285b470",
  ];

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 py-16">
      <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-center text-white mb-16">
        Official <span className="text-red-600">Gallery</span>
      </h1>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((id, i) => (
          <div key={i} className="relative group overflow-hidden rounded-xl break-inside-avoid cursor-pointer shadow-lg">
            <img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`} className="w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Gallery" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white font-bold text-sm tracking-wider uppercase">View Photo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// CONTACT VIEW
// ==========================================
function ContactView() {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white">Contact <span className="text-red-600">Us</span></h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
         <div className="p-12 bg-black border-r border-white/5 flex flex-col justify-center">
            <h3 className="text-2xl font-black uppercase mb-8 tracking-wider text-white">Get in Touch</h3>
            <div className="space-y-8">
              <div className="flex items-start"><MapPin className="text-red-600 mr-5 mt-1 shrink-0" size={24}/><p className="text-zinc-400 font-light leading-relaxed">Jl. Gunung Andakasa No. 22, Kelurahan Padangsambian, Denpasar Barat 80118</p></div>
              <div className="flex items-center"><Mail className="text-red-600 mr-5 shrink-0" size={24}/><p className="text-zinc-300 font-bold">balitrailrunning@gmail.com</p></div>
              <div className="flex items-center"><Phone className="text-red-600 mr-5 shrink-0" size={24}/><p className="text-zinc-300 font-bold">+62 812 3003 5465</p></div>
            </div>
         </div>
         <div className="p-12 bg-zinc-950">
            <div className="space-y-6">
               <div><input type="text" placeholder="Full Name" className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none text-sm font-light transition-colors"/></div>
               <div><input type="email" placeholder="Email Address" className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none text-sm font-light transition-colors"/></div>
               <div><textarea placeholder="Your Message..." rows={5} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none text-sm font-light transition-colors resize-none"></textarea></div>
               <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] text-sm transition-transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(220,38,38,0.3)]">Send Message</button>
            </div>
         </div>
      </div>
    </div>
  );
}

// ==========================================
// LOGIN VIEW
// ==========================================
function LoginView({ navigate }: { navigate: NavigateFn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Demo: redirect to home after login
    alert(`Login berhasil! Selamat datang, ${email}`);
    navigate('home');
  };

  return (
    <div className="animate-fade-in flex items-center justify-center min-h-[75vh] px-4">
      <div className="bg-zinc-950 border border-white/10 p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>
        <div className="text-center mb-10">
          <div className="text-5xl font-black italic tracking-tighter text-white mb-3">BTR<span className="text-red-600">ULTRA</span></div>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Sign in to your runner account</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <User className="absolute left-4 top-4 text-zinc-500" size={20}/>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black border border-white/10 rounded-xl p-4 pl-14 text-white focus:border-red-500 outline-none text-sm font-light transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-zinc-500" size={20}/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black border border-white/10 rounded-xl p-4 pl-14 text-white focus:border-red-500 outline-none text-sm font-light transition-colors"
            />
          </div>
          <div className="flex justify-between items-center text-xs text-zinc-400 font-bold">
            <label className="flex items-center cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" className="mr-3 accent-red-600 w-4 h-4"/> Remember me
            </label>
            <button type="button" className="hover:text-red-500 transition-colors">Forgot password?</button>
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] text-sm transition-transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(220,38,38,0.3)] mt-6">
            Login to Portal
          </button>
        </form>
        <p className="text-center text-xs text-zinc-500 mt-8 font-bold uppercase tracking-widest">
          Don't have an account?{' '}
          <button onClick={() => navigate('register')} className="text-red-500 hover:text-white transition-colors ml-1">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

// ==========================================
// MAIN EXPORT
// ==========================================
export default function BtrUltraApp() {
  const [currentPath, setCurrentPath] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('100k');

  const navigate: NavigateFn = (path, state) => {
    if (state?.category) setSelectedCategory(state.category);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parse info tab from path like "info-venue" → tab = "venue"
  const getInfoTab = () => {
    if (!currentPath.startsWith('info-')) return 'venue';
    return currentPath.slice(5); // remove "info-"
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-red-600 selection:text-white">
      <Navbar currentPath={currentPath} navigate={navigate} isScrolled={isScrolled} />

      <main className="pt-20 lg:pt-24 min-h-screen">
        {currentPath === 'home' && <HomeView navigate={navigate} />}
        {currentPath === 'register' && <RegisterView navigate={navigate} />}
        {currentPath === 'payment' && <PaymentView navigate={navigate} category={selectedCategory} />}
        {currentPath.startsWith('category-') && (
          <CategoryDetailView categoryId={currentPath.replace('category-', '')} navigate={navigate} />
        )}
        {currentPath.startsWith('info-') && (
          <RaceInfoView initialTab={getInfoTab()} navigate={navigate} />
        )}
        {currentPath === 'results' && <ResultsView />}
        {currentPath === 'gallery' && <GalleryPageView />}
        {currentPath === 'news' && <NewsView navigate={navigate} />}
        {currentPath === 'news-detail' && <NewsDetailView navigate={navigate} />}
        {currentPath === 'contact' && <ContactView />}
        {currentPath === 'login' && <LoginView navigate={navigate} />}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}