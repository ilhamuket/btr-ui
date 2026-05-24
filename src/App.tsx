import { useState, useEffect } from 'react';
import { 
  Menu, X, Search, Play, MapPin, Calendar, Check, X as XIcon, 
  Download, Info, ChevronDown, User, Lock, Mail, Phone, FileText, Award, 
  AlertTriangle, ArrowRight, ArrowLeft, Shirt, CreditCard, 
  Wallet, ShieldCheck, Box, Clock, Mountain, Droplets, Trophy, Users, 
  Flag, MapPinned, Route, List, Tent, Star, CircleAlert, Ban, 
  Stethoscope, Milestone, Scale, Gavel, HandHelping, Flame, Footprints
} from 'lucide-react';

import { type LucideIcon } from 'lucide-react';

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
  colorHex: string;
  textColor: string;
  img: string;
  startDay: string;
  startTime: string;
  waterStations: string;
  ageRange: string;
  awardCategories: string[];
  qualifications: string[];
  raceInclusions: string[];
}

type NavigateFn = (path: string, state?: NavState) => void;

interface RuleItem {
  id: string;
  title: string;
  icon: LucideIcon;
  defaultOpen?: boolean;
  content: string;
}

interface NavbarProps {
  currentPath: string;
  navigate: NavigateFn;
  isScrolled: boolean;
}

interface FooterProps {
  navigate: NavigateFn;
}

interface HomeViewProps {
  navigate: NavigateFn;
}

interface CategoryDetailViewProps {
  categoryId: string;
  navigate: NavigateFn;
}

interface AccordionItemProps {
  item: RuleItem;
  isOpen: boolean;
  toggle: () => void;
}

interface RaceInfoViewProps {
  initialTab: string;
  navigate: NavigateFn;
}

interface RegisterViewProps {
  navigate: NavigateFn;
}

interface PaymentViewProps {
  navigate: NavigateFn;
  category: CategoryId;
}

interface NewsViewProps {
  navigate: NavigateFn;
}

interface NewsDetailViewProps {
  navigate: NavigateFn;
}

interface LoginViewProps {
  navigate: NavigateFn;
}

// --- DATA ---
const categoriesData: Record<CategoryId, Category> = {
  '100k': { 
    id: '100k', name: '100K', title: 'BTR ULTRA 100KM', dist: '106.20 KM', elev: '7.244 m+', cot: '34 hrs', 
    priceLocal: '2.040.000', priceForeign: '2.140.000', utmb: '100M M', mountain: '10', itra: '5', 
    color: 'bg-[#e3000f]', colorHex: '#e3000f', textColor: 'text-[#e3000f]', 
    img: 'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&q=80&w=600',
    startDay: 'Friday, 15 May 2026', startTime: '18:00 PM', waterStations: '12 WS',
    ageRange: '18 - 50+',
    awardCategories: ['Open Category', '18–39 Years', '40–49 Years', '50–59 Years', '60-69 Years', '70+ Years'],
    qualifications: ['100K ultra road race', 'BTRU 55K/60K ultra trail', '60K-80K ultra trail race', 'Ironman-distance triathlon'],
    raceInclusions: ['Race Entry', 'Hot Spring Ticket', 'Park Entrance Ticket', 'RFID Chip BIB Number', 'Event Jersey', 'Finisher Jersey', 'Finisher Medal', 'Buffet Aid Stations', 'On-off Course Medical Support and Assistance', 'Race Photos', 'Finish Refreshment']
  },
  '60k': { 
    id: '60k', name: '60K', title: 'BTR ULTRA 60KM', dist: '61.30 KM', elev: '3.819 m+', cot: '19 hrs', 
    priceLocal: '1.740.000', priceForeign: '1.840.000', utmb: '100K M', mountain: '7', itra: '3', 
    color: 'bg-[#7ac142]', colorHex: '#7ac142', textColor: 'text-[#7ac142]', 
    img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600',
    startDay: 'Saturday, 16 May 2026', startTime: '04:00 AM', waterStations: '8 WS',
    ageRange: '18 - 50+',
    awardCategories: ['Open Category', '18–39 Years', '40–49 Years', '50–59 Years', '60-69 Years', '70+ Years'],
    qualifications: ['Full marathon (FM) road', 'BTRU 30K or another minimum 30K trail race within the past two years'],
    raceInclusions: ['Race Entry', 'Hot Spring Ticket', 'Park Entrance Ticket', 'RFID Chip BIB Number', 'Event Jersey', 'Finisher Jersey', 'Finisher Medal', 'Buffet Aid Stations', 'On-off Course Medical Support and Assistance', 'Race Photos', 'Finish Refreshment']
  },
  '30k': { 
    id: '30k', name: '30K', title: 'BTR ULTRA 30KM', dist: '28.91 KM', elev: '1.205 m+', cot: '8 hrs', 
    priceLocal: '1.240.000', priceForeign: '1.340.000', utmb: '20K M', mountain: '6', itra: '1', 
    color: 'bg-[#f39200]', colorHex: '#f39200', textColor: 'text-[#f39200]', 
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    startDay: 'Saturday, 16 May 2026', startTime: '06:00 AM', waterStations: '4 WS',
    ageRange: '18 - 50+',
    awardCategories: ['Open Category', '18–39 Years', '40–49 Years', '50–59 Years', '60-69 Years', '70+ Years'],
    qualifications: ['Finished official Half Marathon 21KM', 'BTRU 18K or another 18K trail running race past two years'],
    raceInclusions: ['Race Entry', 'Hot Spring Ticket', 'Park Entrance Ticket', 'RFID Chip BIB Number', 'Event Jersey', 'Finisher Jersey', 'Finisher Medal', 'Buffet Aid Stations', 'On-off Course Medical Support and Assistance', 'Race Photos', 'Finish Refreshment']
  },
  '18k': { 
    id: '18k', name: '18K', title: 'BTR ULTRA 18KM', dist: '18.71 KM', elev: '880 m+', cot: '7 hrs', 
    priceLocal: '940.000', priceForeign: '1.040.000', utmb: '20K M', mountain: '4', itra: '0', 
    color: 'bg-[#00aeef]', colorHex: '#00aeef', textColor: 'text-[#00aeef]', 
    img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=600',
    startDay: 'Saturday, 16 May 2026', startTime: '06:30 AM', waterStations: '3 WS',
    ageRange: '18 - 50+',
    awardCategories: ['Open Category', '18–39 Years', '40–49 Years', '50–59 Years', '60-69 Years', '70+ Years'],
    qualifications: ['Finished official Half Marathon 21KM or', 'BTRU 7K, or', 'Another minimum 10K trail race in the past two years'],
    raceInclusions: ['Race Entry', 'Hot Spring Ticket', 'Park Entrance Ticket', 'RFID Chip BIB Number', 'Event Jersey', 'Finisher Jersey', 'Finisher Medal', 'Buffet Aid Stations', 'On-off Course Medical Support and Assistance', 'Race Photos', 'Finish Refreshment']
  },
  '7k': { 
    id: '7k', name: '7K', title: 'BTR ULTRA 7KM', dist: '6.53 KM', elev: '257 m+', cot: '4 hrs', 
    priceLocal: '640.000', priceForeign: '740.000', utmb: '-', mountain: '-', itra: '0', 
    color: 'bg-[#d70071]', colorHex: '#d70071', textColor: 'text-[#d70071]', 
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600',
    startDay: 'Saturday, 16 May 2026', startTime: '07:00 AM', waterStations: '2 WS',
    ageRange: '18 - 50+',
    awardCategories: ['Open Category', '18–39 Years', '40–49 Years'],
    qualifications: ['10 km road running, gym person, active person or mountain hiking past two years'],
    raceInclusions: ['Race Entry', 'Hot Spring Ticket', 'Park Entrance Ticket', 'RFID Chip BIB Number', 'Event Jersey', 'Finisher Medal', 'Buffet Aid Stations', 'Race Photos', 'Finish Refreshment']
  },
};

const galleryImages: string[] = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  "https://images.unsplash.com/photo-1448375240586-882707db888b"
];

// Rules & Regulations FAQ data
const rulesData: RuleItem[] = [
  {
    id: 'qualifications',
    title: 'Qualifications',
    icon: Award,
    defaultOpen: true,
    content: `The race is open to individuals 18 years of age or older as of race day who are in good health and can complete the race without getting lost. Runners under 18 must provide parental/guardian permission. Registration will require participants to provide details of their qualifying event name and time result record.

**For 100 KM category:** 100K ultra road race, BTRU 55K/60K ultra trail, 60K-80K ultra trail race, or Ironman-distance triathlon.

**For 60 KM category:** Full marathon (FM) road, or BTRU 30K or another minimum 30K trail race within the past two years.

**For 30 KM category:** Finished official Half Marathon 21KM, or BTRU 18K or another 18K trail running race past two years.

**For 18 KM category:** Finished official Half Marathon 21KM, BTRU 7K, or another minimum 10K trail race in the past two years.

**For 7 KM category:** 10 km road running, gym person, active person or mountain hiking past two years.

Organizers reserve the exclusive right to approve or deny registration, including the right to award dispensation (with careful consideration) for those who do not meet the qualification criteria.`
  },
  {
    id: 'park-fee',
    title: 'Park Entrance Fee',
    icon: Tent,
    content: `All participants are required to pay the park entrance fee which is already included in the registration fee. The park entrance covers access to the Batur Natural Hot Spring area and surrounding trail course areas. No additional park fees will be charged on race day.`
  },
  {
    id: 'terms',
    title: 'Terms and Conditions',
    icon: Gavel,
    content: `By registering, participants agree to all terms and conditions set by the organizer. The Participant hereby waives, releases, and declares that they will not sue the Organizer and will release the Organizer and all parties related to the Organizer from all responsibilities, claims, actions, or losses that may arise or be related to their registration or participation in the BTR Ultra 2026 event.

Participants must be in good physical and mental health. A medical health certificate may be required during Race Pack Collection. The organizer reserves the right to refuse entry to any participant deemed unfit to race.`
  },
  {
    id: 'gear',
    title: 'Gear & Equipment',
    icon: ShieldCheck,
    content: `All mandatory gear must be carried at all times during the race. Gear checks will be performed at random checkpoints and at Race Pack Collection. Failure to carry mandatory gear will result in time penalties or disqualification.

Mandatory items vary by category. For 60K/100K: BIB Number, Water Flask (min 500ml), Mobile Phone, Energy Food, Personal First Aid Kit, Running Pack/Vest, Foldable Cup, Waterproof Rain Jacket, Emergency Thermal Blanket, and Headlamp with spare battery.

For 18K/30K: All of the above except Headlamp is recommended but not mandatory.

For 7K: BIB Number, Mobile Phone, and Foldable Cup are mandatory. Other items are recommended.`
  },
  {
    id: 'refund',
    title: 'Ticket Refund & Transfer Policy',
    icon: CreditCard,
    content: `Registration fees are non-refundable once payment is confirmed. However, slot transfers to another participant are allowed up to 30 days before race day with a transfer fee of IDR 150,000. Transfer requests must be submitted via email to balitrailrunning@gmail.com.

In case of event cancellation due to force majeure (natural disasters, government regulations, pandemic), the organizer will offer either a full credit transfer to the next edition or a partial refund (minus administrative costs).

DNS (Did Not Start) participants may request their Race Pack to be shipped after the event with shipping costs borne by the participant. Request must be made before May 31, 2026.`
  },
  {
    id: 'emergency',
    title: 'Emergency Assistance & Consideration for Others',
    icon: HandHelping,
    content: `All participants are expected to assist fellow runners in case of emergency. If you encounter a runner in distress, you must stop and provide assistance or alert the nearest marshal/aid station.

Failure to assist a fellow runner in a life-threatening situation may result in disqualification. Time spent assisting other runners will be taken into consideration by race officials and may result in time credits.

Emergency contact numbers will be printed on your BIB number. All aid stations are equipped with basic first aid supplies and communication equipment.`
  },
  {
    id: 'aid-stations',
    title: 'Aid Stations & Outside Support',
    icon: Droplets,
    content: `Aid stations are positioned along the course at regular intervals. Each aid station provides water, isotonic drinks, fruits, snacks, and basic first aid. Hot food may be available at select major aid stations for longer categories.

Outside support (personal crew assistance) is ONLY allowed at designated Support Points (SP). Receiving assistance outside of aid stations or designated SPs will result in time penalties or disqualification.

Participants must use their own foldable cup at aid stations. Single-use plastic cups are NOT provided in line with our environmental commitment.`
  },
  {
    id: 'support-point',
    title: 'Support Point (SP)',
    icon: Users,
    content: `Support Points are designated locations where personal crew/supporters can meet runners and provide assistance. Crew members must register at Race Pack Collection and receive a crew pass.

Support crew may provide food, drinks, gear changes, and encouragement at designated SPs only. Crew vehicles must be parked in designated areas and must not obstruct the race course or other traffic.`
  },
  {
    id: 'medical',
    title: 'Medical Assistance During the Race',
    icon: Stethoscope,
    content: `Medical teams are stationed at all major aid stations and mobile medical units patrol the course. Race medical staff have the authority to withdraw any runner deemed medically unfit to continue.

If a medical team advises withdrawal, their decision is final and must be respected. Runners who refuse medical advice and continue racing do so at their own risk and may be disqualified.

Participants with known medical conditions must declare them during registration. Carrying personal medication is the responsibility of each participant.`
  },
  {
    id: 'course-markers',
    title: 'Race Course Markers',
    icon: Milestone,
    content: `The race course is marked with reflective tape, directional arrows, and flag markers. Course marshals are positioned at key junctions. It is the runner's responsibility to follow the marked course.

GPS tracks (GPX files) are available for download and runners are strongly encouraged to load these onto their GPS devices. If you believe you have gone off course, retrace your steps to the last marker before continuing.

Intentionally cutting the course or deviating from the marked route will result in immediate disqualification.`
  },
  {
    id: 'dropping-out',
    title: 'Dropping Out of the Race',
    icon: Flag,
    content: `If you need to drop out of the race (DNF), you MUST notify the nearest aid station or race marshal immediately. Do not leave the course without informing race officials.

DNF runners will be transported back to the finish area from the nearest accessible aid station. Runners who drop out without notification will be subject to search and rescue operations, and may be required to cover associated costs.

Your BIB must be surrendered when you officially drop out of the race.`
  },
  {
    id: 'prohibited',
    title: 'Prohibited Actions',
    icon: Ban,
    content: `The following actions are strictly prohibited and will result in disqualification:

• Using any form of motorized or non-motorized vehicle during the race
• Littering on the course (all waste must be carried to aid stations)
• Using trekking poles on restricted sections (if applicable)
• Receiving outside assistance at non-designated locations
• Aggressive or unsportsmanlike behavior towards other runners, volunteers, or locals
• Use of performance-enhancing substances
• Headphones/earbuds that completely block ambient sound (bone-conduction headphones are allowed)
• Cutting or deviating from the marked course`
  },
  {
    id: 'responsibilities',
    title: 'Racer & Race Organization Responsibilities',
    icon: Scale,
    content: `**Racer Responsibilities:** Each participant is responsible for their own safety, nutrition, hydration, and navigation. Runners must carry all mandatory gear at all times and follow all race rules and marshal instructions. Runners must respect the environment, local communities, and cultural sites along the course.

**Organization Responsibilities:** The organizer is responsible for course marking, aid station setup, medical support, timing, and overall event safety management. The organizer will provide course maps, GPX files, and race briefings to ensure runners are prepared.

The organizer reserves the right to modify the course, schedule, or rules at any time for safety reasons.`
  },
  {
    id: 'cancellation',
    title: 'Race Cancellation',
    icon: CircleAlert,
    content: `The organizer reserves the right to cancel, postpone, or modify the event due to force majeure circumstances including but not limited to: volcanic activity, extreme weather, earthquake, pandemic, or government directives.

In case of cancellation, the organizer will communicate the decision as early as possible through official channels (website, email, social media). Refund or credit policies as stated in the Ticket Refund & Transfer Policy section will apply.`
  },
  {
    id: 'etiquette',
    title: 'Etiquette & Conduct',
    icon: Star,
    content: `BTR Ultra is committed to environmental sustainability and cultural respect. All runners must:

• Leave no trace — carry all waste to aid stations or the finish line
• Respect local communities, temples, and sacred sites along the route
• Yield to local traffic and pedestrians when crossing roads
• Be courteous to fellow runners, volunteers, and spectators
• Follow marshal instructions promptly and respectfully
• Maintain appropriate conduct at all times during the event weekend`
  },
  {
    id: 'penalties',
    title: 'Penalties',
    icon: AlertTriangle,
    content: `**Time Penalties:**
• Missing one mandatory gear item: +15 minutes
• Missing two mandatory gear items: +30 minutes
• Receiving outside support at non-designated areas: +30 minutes
• Littering (first offense): +15 minutes

**Disqualification:**
• Missing three or more mandatory gear items
• Course cutting or intentional deviation
• Refusing to assist a runner in medical emergency
• Littering (second offense)
• Using any vehicle assistance
• BIB tampering or transfer during the race
• Failure to stop at mandatory checkpoints

All penalty decisions by race officials are final.`
  },
  {
    id: 'crew-resp',
    title: 'Crew Responsibilities',
    icon: Users,
    content: `Support crew must register during Race Pack Collection and obtain a crew pass. Crew members must follow all rules and regulations set by the organizer.

Crew members must only assist runners at designated Support Points. Crew vehicles must be parked in designated areas. Crew members must not enter the race course or aid stations unless specifically permitted.

Crew members are responsible for their own safety and must follow all traffic rules and local regulations. Unsportsmanlike behavior by crew members may result in the associated runner's disqualification.`
  }
];

// ==========================================
// NAVBAR COMPONENT
// ==========================================
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

          <div className="hidden xl:flex items-center space-x-1 h-full">
            <button onClick={() => handleNav('home')} className={`px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors relative group ${currentPath === 'home' ? 'text-red-500' : 'text-white hover:text-red-500'}`}>HOME<span className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-600 transition-all ${currentPath === 'home' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span></button>
            
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

            <button onClick={() => handleNav('results')} className={`px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors relative group ${currentPath === 'results' ? 'text-red-500' : 'text-white hover:text-red-500'}`}>RESULTS</button>
            <button onClick={() => handleNav('gallery')} className={`px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors relative group ${currentPath === 'gallery' ? 'text-red-500' : 'text-white hover:text-red-500'}`}>GALLERY</button>
            <button onClick={() => handleNav('news')} className={`px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors relative group ${currentPath === 'news' || currentPath === 'news-detail' ? 'text-red-500' : 'text-white hover:text-red-500'}`}>NEWS</button>
            <button onClick={() => handleNav('contact')} className={`px-4 py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-colors relative group ${currentPath === 'contact' ? 'text-red-500' : 'text-white hover:text-red-500'}`}>CONTACT</button>
            
            <div className="pl-4">
              <button onClick={() => handleNav('login')} className="bg-transparent hover:bg-white text-white hover:text-black border border-white/30 hover:border-white px-6 py-2.5 rounded text-[11px] font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105">LOGIN</button>
            </div>
          </div>

          <div className="xl:hidden flex items-center z-50">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-red-500 transition-colors">
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

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
// HOME VIEW (unchanged)
// ==========================================
function HomeView({ navigate }: HomeViewProps) {
  return (
    <div className="animate-fade-in -mt-24">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&q=80&w=2000" alt="Runner" className="w-full h-full object-cover opacity-80" style={{ animation: 'zoomInOut 20s ease-in-out infinite alternate' }} />
          <style>{`@keyframes zoomInOut { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }`}</style>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl px-4 mt-20">
          <div className="inline-block border border-red-600 bg-red-600/20 backdrop-blur-sm text-red-500 font-bold uppercase tracking-[0.3em] text-xs px-4 py-1.5 mb-6 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.3)]">Kintamani, Bangli, Bali</div>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-none mb-4">BTR <span className="text-red-600">ULTRA</span></h1>
          <p className="text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-zinc-300 mb-10 drop-shadow-lg">Brutal Torture Race 2026</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button onClick={() => navigate('register')} className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-4 px-12 text-lg uppercase tracking-[0.15em] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] skew-x-[-10deg]"><span className="skew-x-[10deg] block">Register Now</span></button>
            <button onClick={() => document.getElementById('categories')?.scrollIntoView({behavior: 'smooth'})} className="w-full sm:w-auto bg-black/50 backdrop-blur-md border-2 border-white/50 hover:bg-white hover:text-black hover:border-white text-white font-black py-4 px-12 text-lg uppercase tracking-[0.15em] transition-all duration-300 transform hover:scale-105 skew-x-[-10deg]"><span className="skew-x-[10deg] block">Categories</span></button>
          </div>
        </div>
      </section>

      <section className="bg-zinc-100 py-24 relative z-20 overflow-hidden" id="categories">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-0 shadow-2xl relative">
            {Object.values(categoriesData).map((cat, index) => (
              <div key={cat.id} className={`bg-white text-black relative flex flex-col group overflow-hidden border-zinc-200 ${index !== 0 ? 'border-l lg:border-l border-t lg:border-t-0' : 'border-t lg:border-t-0'}`}>
                <div className="h-[250px] w-full overflow-hidden"><img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" /></div>
                <div className="p-6 flex flex-col flex-grow z-10 relative bg-white">
                  <div className="text-center font-black mb-6 flex flex-col items-center">
                    <div className="text-lg tracking-tight uppercase">BTR ULTRA</div>
                    <div className={`mt-1 inline-block text-white px-5 py-0.5 italic transform -skew-x-12 shadow-md ${cat.color}`}><span className="skew-x-12 block text-4xl">{cat.name}</span></div>
                  </div>
                  <div className="flex justify-between items-end border-b border-zinc-200 pb-3 mb-4">
                    <div className="text-center w-1/3"><div className="text-[6px] text-zinc-400 font-bold uppercase tracking-widest mb-1">UTMB CATEGORY</div><div className={`font-black text-sm ${cat.utmb !== '-' ? cat.textColor : 'text-zinc-400'}`}>{cat.utmb}</div></div>
                    <div className="text-center w-1/3 border-x border-zinc-200"><div className="text-[6px] text-zinc-400 font-bold uppercase tracking-widest mb-1">MOUNTAIN LEVEL</div><div className="font-black text-sm flex items-center justify-center">{cat.mountain !== '-' ? <><Mountain size={14} className="mr-1"/> {cat.mountain}</> : '-'}</div></div>
                    <div className="text-center w-1/3"><div className="text-[6px] text-zinc-400 font-bold uppercase tracking-widest mb-1">ITRA POINT</div><div className={`inline-block text-white text-[10px] px-2 py-0.5 rounded font-black ${cat.itra !== '0' ? cat.color : 'bg-zinc-400'}`}>ITRA {cat.itra}</div></div>
                  </div>
                  <div className="flex justify-between mb-4"><div><div className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">DISTANCE:</div><div className="font-black text-xs">{cat.dist}</div></div><div className="text-right"><div className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">ELEVATION:</div><div className="font-black text-xs">{cat.elev}</div></div></div>
                  <div className="mb-6"><div className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">CUT-OFF TIME:</div><div className="font-black text-xs">{cat.cot}</div></div>
                  <div className="flex justify-between mb-6"><div><div className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">PRICE LOCAL:</div><div className="font-black text-xs">IDR {cat.priceLocal}</div></div><div className="text-right"><div className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">FOREIGNER:</div><div className="font-black text-xs">IDR {cat.priceForeign}</div></div></div>
                  <div className="mt-auto pt-4 relative z-20"><button onClick={() => navigate(`category-${cat.id}`)} className="bg-[#e3000f] hover:bg-red-700 text-white font-bold py-2.5 px-6 text-xs uppercase tracking-widest transition-colors shadow-md">More Info</button></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="bg-black pt-20 pb-0">
        <div className="max-w-[1400px] mx-auto px-4 mb-12 text-center"><h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Our Scenic <span className="text-red-600">Course</span></h2></div>
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-0 overflow-hidden">
          {['PASAR AGUNG', 'TRUNYAN HILL', 'SONGAN', 'PINE FOREST'].map((item, idx) => (
            <div key={idx} onClick={() => navigate('gallery')} className="relative aspect-square md:aspect-[4/3] group overflow-hidden bg-zinc-900 cursor-pointer">
              <img src={`${galleryImages[idx]}?auto=format&fit=crop&q=80&w=800`} alt={item} className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-125" />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/10 transition-colors"><h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-[0.2em] text-center opacity-0 transform translate-y-10 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 drop-shadow-2xl">{item}</h3></div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 text-white">Relive the <span className="text-red-600">Adventure</span></h2>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] mb-12 text-sm">Highlights from BTR ULTRA 2025</p>
          <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] group cursor-pointer border border-white/10 aspect-video">
            <img src="https://images.unsplash.com/photo-1533202998083-d52ec1eb311b?auto=format&fit=crop&q=80&w=1600" alt="Video" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute top-0 left-0 w-full p-6 flex items-center bg-gradient-to-b from-black/90 to-transparent">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-xs mr-4 shadow-lg shadow-red-600/30">BTR</div>
              <div className="text-left"><div className="text-white font-bold text-base sm:text-lg shadow-black drop-shadow-md">BCA Bali Trail Running Ultra 2025 presented by Asics</div></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center"><div className="w-24 h-24 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.5)]"><Play size={40} className="text-white ml-2" fill="currentColor" /></div></div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// CATEGORY DETAIL VIEW (IMPROVED)
// ==========================================
function CategoryDetailView({ categoryId, navigate }: CategoryDetailViewProps) {
  const cat = categoriesData[categoryId as CategoryId] ?? categoriesData['100k'];
  const [activeTab, setActiveTab] = useState('course');

  const tabItems = [
    { id: 'course', label: 'Course Map Details', icon: MapPinned },
    { id: 'rundown', label: 'Event Rundown', icon: List },
    { id: 'gear', label: 'Mandatory Gears', icon: ShieldCheck },
    { id: 'gpx', label: 'GPX Files', icon: Route },
  ];

  const gearTable = [
    { name: 'BIB Number (Official)', k7: true, k1830: true, k60100: true },
    { name: 'Water/Flask (min 500ml)', k7: 'Rec.', k1830: true, k60100: true },
    { name: 'Mobile Phone (Active)', k7: true, k1830: true, k60100: true },
    { name: 'Energy Food / Bars', k7: 'Rec.', k1830: true, k60100: true },
    { name: 'Personal First Aid Kit', k7: false, k1830: true, k60100: true },
    { name: 'Running Pack / Vest', k7: 'Rec.', k1830: true, k60100: true },
    { name: 'Foldable Cup (No plastics)', k7: true, k1830: true, k60100: true },
    { name: 'Waterproof Rain Jacket', k7: 'Rec.', k1830: true, k60100: true },
    { name: 'Emergency Thermal Blanket', k7: false, k1830: true, k60100: true },
    { name: 'Headlamp + Spare Battery', k7: false, k1830: 'Rec.', k60100: true },
  ];

  return (
    <div className="animate-fade-in">
      {/* HERO BANNER */}
      <div className="relative h-[550px] md:h-[600px] flex flex-col justify-end overflow-hidden -mt-24">
        <div className="absolute inset-0">
          <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 pb-12 pt-32">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex space-x-1 items-center">
              <span className="text-blue-500 font-black italic text-lg">my<span className="text-white">BCA</span></span>
              <span className="text-white/30 mx-2">|</span>
              <span className="text-white font-black italic text-lg">BTR<span className="text-red-600">ULTRA</span></span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter text-white mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">{cat.title}</h1>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('register', { category: cat.id })} className="bg-red-600 hover:bg-red-500 text-white font-black py-3 px-8 text-sm uppercase tracking-[0.15em] shadow-lg transition-colors">Entry List</button>
            <button onClick={() => navigate('info-schedule')} className="bg-white/10 backdrop-blur-md hover:bg-white hover:text-black text-white font-bold py-3 px-8 text-sm uppercase tracking-[0.15em] border border-white/20 transition-all">Race Schedule</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-12">
        {/* INFO CARDS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {[
            { icon: FileText, label: 'REG FEE', value: `IDR ${cat.priceLocal}`, sub: `Foreigner: IDR ${cat.priceForeign}` },
            { icon: Calendar, label: 'START', value: cat.startDay.split(', ')[1] || cat.startDay, sub: cat.startTime },
            { icon: Mountain, label: 'ELEVATION GAIN', value: cat.elev, sub: null },
            { icon: Clock, label: 'CUT OFF TIME', value: cat.cot, sub: null },
            { icon: Droplets, label: 'WATER STATIONS', value: cat.waterStations, sub: null },
            { icon: Trophy, label: 'AWARD & PRIZE', value: 'Open Category', sub: cat.awardCategories.slice(1).join(', ') },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-zinc-950 border border-white/10 p-6 rounded-xl text-center hover:border-white/20 transition-colors">
                <Icon className="mx-auto mb-3 text-zinc-400" size={28} />
                <div className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-2">{item.label}</div>
                <div className="font-black text-white text-sm leading-tight">{item.value}</div>
                {item.sub && <div className="text-[10px] text-zinc-500 mt-1 leading-tight">{item.sub}</div>}
              </div>
            );
          })}
        </div>

        {/* ROUTE HIGHLIGHT + DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left: Route Highlight Image */}
          <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={cat.img} alt="Route Highlight" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`${cat.color} text-white text-[9px] font-bold px-2 py-0.5 rounded`}>ITRA {cat.itra}</span>
                  {cat.utmb !== '-' && <span className="bg-zinc-800 text-white text-[9px] font-bold px-2 py-0.5 rounded">{cat.utmb}</span>}
                  {cat.mountain !== '-' && <span className="bg-zinc-800 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center"><Mountain size={10} className="mr-1"/>{cat.mountain}</span>}
                </div>
                <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">{cat.name} Route Highlight</h3>
              </div>
            </div>
          </div>

          {/* Right: Race Details */}
          <div className="flex flex-col space-y-6">
            {/* Key Stats */}
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center"><Footprints size={20} className="text-red-500"/></div>
                  <div><div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Distance</div><div className="font-black text-white text-lg">{cat.dist}</div></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center"><Mountain size={20} className="text-red-500"/></div>
                  <div><div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Elevation Gain</div><div className="font-black text-white text-lg">{cat.elev}</div></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center"><Clock size={20} className="text-red-500"/></div>
                  <div><div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Cut-Off Time</div><div className="font-black text-white text-lg">{cat.cot}</div></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center"><Users size={20} className="text-red-500"/></div>
                  <div><div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Age Range</div><div className="font-black text-white text-lg">{cat.ageRange}</div></div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h4 className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-3">Award & Prize Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.awardCategories.map((a, i) => (
                    <span key={i} className="bg-zinc-900 border border-white/5 text-zinc-300 text-[11px] font-bold px-3 py-1.5 rounded-lg">{a}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Qualification */}
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
              <h4 className="text-sm font-black uppercase text-white mb-4 flex items-center">
                <Award size={18} className="text-red-500 mr-2"/> Qualification
              </h4>
              <p className="text-zinc-400 text-sm mb-3">Participants must have finished at least one of the following races within the past two years:</p>
              <ul className="space-y-2">
                {cat.qualifications.map((q, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <Check size={16} className="text-red-500 mr-2 mt-0.5 shrink-0"/>
                    <span className="text-zinc-300">{q}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('info-rules')} className="mt-4 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center">
                Read full rules and regulations <ArrowRight size={12} className="ml-1"/>
              </button>
            </div>

            {/* Race Inclusions */}
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
              <h4 className="text-sm font-black uppercase text-white mb-4 flex items-center">
                <Box size={18} className="text-red-500 mr-2"/> Race Inclusions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cat.raceInclusions.map((inc, i) => (
                  <div key={i} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2.5 shrink-0"></div>
                    <span className="text-zinc-300">{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mb-16">
          <div className="flex border-b border-white/10 mb-0 overflow-x-auto">
            {tabItems.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id ? 'border-red-600 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}>
                  <Icon size={16} className="mr-2"/> {tab.label}
                </button>
              );
            })}
          </div>

          <div className="bg-zinc-950 border border-white/10 border-t-0 rounded-b-2xl p-6 md:p-10 min-h-[400px]">
            {activeTab === 'course' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-black uppercase italic text-white mb-6 flex items-center">
                  <MapPinned size={24} className="text-red-500 mr-3"/> Course Map — {cat.name}
                </h3>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] mb-6 bg-zinc-900">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1400" alt="Course Map" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPinned size={48} className="text-red-500 mx-auto mb-4"/>
                      <p className="text-white font-bold text-lg uppercase tracking-widest">Interactive Course Map</p>
                      <p className="text-zinc-400 text-sm mt-2">Elevation profile • Aid stations • Key waypoints</p>
                    </div>
                  </div>
                </div>
                <div className="bg-black border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/10">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR" className="w-12 h-12 invert opacity-60"/>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Scan the QR code</p>
                      <p className="text-zinc-400 text-xs">Take the route on your smartphone</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Powered by</span>
                    <div className="text-white font-black text-lg tracking-wide">trail<span className="text-orange-500">CONNECT</span></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rundown' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-black uppercase italic text-white mb-6 flex items-center">
                  <List size={24} className="text-red-500 mr-3"/> Event Rundown — {cat.name}
                </h3>
                <div className="bg-black border border-white/10 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-900 border-b border-white/10">
                        <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em]">Date</th>
                        <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em]">Time</th>
                        <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em]">Event</th>
                        <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em] hidden sm:table-cell">Location</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-5 font-bold text-zinc-300">Thu, 14 May</td>
                        <td className="p-5 text-zinc-400">12:00 - 20:00</td>
                        <td className="p-5 font-bold text-white">Race Kit Collection Day 1</td>
                        <td className="p-5 text-zinc-500 text-xs hidden sm:table-cell">Batur Hot Spring</td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-5 font-bold text-zinc-300">Fri, 15 May</td>
                        <td className="p-5 text-zinc-400">12:00 - 20:00</td>
                        <td className="p-5 font-bold text-white">Race Kit Collection Day 2</td>
                        <td className="p-5 text-zinc-500 text-xs hidden sm:table-cell">Batur Hot Spring</td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-5 font-bold text-zinc-300">Fri, 15 May</td>
                        <td className="p-5 text-zinc-400">16:00 - 17:00</td>
                        <td className="p-5 font-bold text-white">Race Briefing {cat.name}</td>
                        <td className="p-5 text-zinc-500 text-xs hidden sm:table-cell">Batur Hot Spring</td>
                      </tr>
                      <tr className="bg-red-900/20 border-b border-red-900/30 hover:bg-red-900/30 transition-colors">
                        <td className="p-5 font-black text-red-500">{cat.startDay.split(', ')[0]}, {cat.startDay.split(' ').slice(1, 3).join(' ')}</td>
                        <td className="p-5 font-black text-white">{cat.startTime} WITA</td>
                        <td className="p-5 font-black text-white text-lg tracking-wider flex items-center"><Flame size={18} className="text-red-500 mr-2"/> FLAG OFF {cat.name}</td>
                        <td className="p-5 text-zinc-400 text-xs font-bold hidden sm:table-cell">Start Line</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'gear' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-black uppercase italic text-white mb-2 flex items-center">
                  <ShieldCheck size={24} className="text-red-500 mr-3"/> Mandatory Gears
                </h3>
                <p className="text-zinc-400 mb-6 text-sm">Gear checks will be performed at random checkpoints. Failure to carry mandatory gear results in time penalties.</p>
                <div className="bg-black border border-white/10 rounded-2xl overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-zinc-900 border-b border-white/10">
                        <th className="p-5 text-left text-[11px] font-black text-zinc-400 uppercase tracking-[0.1em]">Equipment Item</th>
                        <th className="p-5 text-[11px] font-black text-pink-500 uppercase tracking-[0.1em]">7K</th>
                        <th className="p-5 text-[11px] font-black text-orange-500 uppercase tracking-[0.1em]">18K / 30K</th>
                        <th className="p-5 text-[11px] font-black text-red-500 uppercase tracking-[0.1em]">60K / 100K</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {gearTable.map((row, idx) => (
                        <tr key={idx} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${(cat.id === '100k' || cat.id === '60k') ? '' : ''}`}>
                          <td className="p-4 text-left font-bold text-white bg-black/50">{row.name}</td>
                          <td className={`p-4 ${cat.id === '7k' ? 'bg-pink-950/10' : ''}`}>{row.k7 === true ? <Check className="mx-auto text-green-500" size={20}/> : row.k7 === false ? <XIcon className="mx-auto text-red-500/50" size={20}/> : <span className="text-yellow-500 text-[10px] font-bold uppercase">{row.k7}</span>}</td>
                          <td className={`p-4 ${(cat.id === '18k' || cat.id === '30k') ? 'bg-orange-950/10' : ''}`}>{row.k1830 === true ? <Check className="mx-auto text-green-500" size={20}/> : row.k1830 === false ? <XIcon className="mx-auto text-red-500/50" size={20}/> : <span className="text-yellow-500 text-[10px] font-bold uppercase">{row.k1830}</span>}</td>
                          <td className={`p-4 ${(cat.id === '100k' || cat.id === '60k') ? 'bg-red-950/10' : ''}`}>{row.k60100 === true ? <Check className="mx-auto text-green-500" size={20}/> : row.k60100 === false ? <XIcon className="mx-auto text-red-500/50" size={20}/> : <span className="text-yellow-500 text-[10px] font-bold uppercase">{row.k60100}</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'gpx' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-black uppercase italic text-white mb-6 flex items-center">
                  <Route size={24} className="text-red-500 mr-3"/> GPX Files — {cat.name}
                </h3>
                <div className="bg-black border border-white/10 rounded-2xl p-8 text-center">
                  <Route size={64} className="text-zinc-700 mx-auto mb-6"/>
                  <h4 className="text-white font-black uppercase text-lg mb-2">Download GPX Track</h4>
                  <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">Load the official GPX track onto your GPS watch or smartphone for navigation during the race.</p>
                  <button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-4 px-10 rounded-xl flex items-center mx-auto uppercase tracking-widest text-sm transition-transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                    <Download size={20} className="mr-3"/> Download {cat.name} GPX
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-8">
          <button onClick={() => navigate('register', { category: cat.id })} className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-5 px-16 text-lg uppercase tracking-[0.15em] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] skew-x-[-10deg]">
            <span className="skew-x-[10deg] flex items-center">Register for {cat.name} <ArrowRight size={20} className="ml-3"/></span>
          </button>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// ACCORDION COMPONENT for Rules
// ==========================================
function AccordionItem({ item, isOpen, toggle }: AccordionItemProps) {
  const Icon = item.icon;
  return (
    <div className={`border border-white/10 rounded-xl overflow-hidden transition-all mb-3 ${isOpen ? 'bg-zinc-900/50 border-red-600/30 shadow-[0_0_20px_rgba(220,38,38,0.1)]' : 'bg-zinc-950 hover:border-white/20'}`}>
      <button onClick={toggle} className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 shrink-0 transition-colors ${isOpen ? 'bg-red-600/20' : 'bg-zinc-900'}`}>
            <Icon size={20} className={isOpen ? 'text-red-500' : 'text-zinc-500'} />
          </div>
          <span className={`font-black uppercase text-sm tracking-wider transition-colors ${isOpen ? 'text-white' : 'text-zinc-300'}`}>{item.title}</span>
        </div>
        <div className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} className={isOpen ? 'text-red-500' : 'text-zinc-500'} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 md:px-6 pb-6 pt-0 ml-14">
          <div className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
            {item.content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="text-white font-bold mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
              }
              if (line.startsWith('**') && line.includes(':**')) {
                const parts = line.split(':**');
                return <p key={i} className="mt-3 mb-1"><span className="text-white font-bold">{parts[0].replace(/\*\*/g, '')}:</span>{parts[1]}</p>;
              }
              if (line.startsWith('• ')) {
                return <div key={i} className="flex items-start mt-1.5"><span className="text-red-500 mr-2 mt-1">•</span><span>{line.slice(2)}</span></div>;
              }
              if (line.trim() === '') return <div key={i} className="h-2"></div>;
              return <p key={i} className="mt-1">{line}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// RACE INFO VIEW (IMPROVED)
// ==========================================
function RaceInfoView({ initialTab, navigate }: RaceInfoViewProps) {
  const [activeTab, setActiveTab] = useState(initialTab || 'venue');
  const [openRules, setOpenRules] = useState(['qualifications']);

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

  const toggleRule = (id: string) => {
    setOpenRules(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white">Race <span className="text-red-600">Information</span></h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden sticky top-28 shadow-2xl">
            <div className="p-5 bg-black border-b border-white/10"><h3 className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">Directory Guide</h3></div>
            <div className="max-h-[70vh] overflow-y-auto py-2">
              {tabs.map((t) => (
                <button key={t.id} onClick={() => { setActiveTab(t.id); navigate(`info-${t.id}`); }}
                  className={`w-full text-left px-6 py-4 font-bold uppercase text-[11px] tracking-widest border-b border-white/5 transition-all ${activeTab === t.id ? 'bg-red-600 text-white pl-8 shadow-[inset_4px_0_0_0_#fff]' : 'hover:bg-white/5 hover:text-white text-zinc-400'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-grow min-h-[60vh]">
          
          {/* ===== RACE VENUE ===== */}
          {activeTab === 'venue' && (
            <div className="animate-fade-in space-y-8">
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl">
                <h2 className="text-3xl font-black uppercase italic text-white mb-8 flex items-center"><MapPin className="text-red-600 mr-3" size={32}/> Race Venue</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-zinc-300 leading-relaxed text-lg font-light mb-6">
                      Batur Natural Hot Spring is located in Toya Bungkah, Kintamani, Bali. It's a popular spot for tourists and locals alike who want to relax and unwind in the natural hot springs while enjoying the beautiful views of Lake Batur and Mount Batur.
                    </p>
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      The hot springs are believed to have healing properties and are rich in minerals that can help soothe sore muscles and joints — perfect for post-race recovery!
                    </p>
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start"><MapPin size={16} className="text-red-500 mr-2 mt-0.5 shrink-0"/><span className="text-zinc-300 text-sm">Toya Bungkah Kintamani Desa, Pekraman Batur, Songan B, Kec. Kintamani, Kabupaten Bangli, Bali 80652</span></div>
                      <div className="flex items-center"><Star size={16} className="text-yellow-500 mr-2"/><span className="text-zinc-300 text-sm">4.2 ★ (5,373 reviews)</span></div>
                    </div>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg relative group bg-zinc-900">
                    <img src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" alt="Batur Hot Spring" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-red-600 transition-colors"><Play size={28} className="text-white ml-1" fill="currentColor"/></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-bold text-sm">Wisata Batur Natural Hot Spring</p>
                      <p className="text-zinc-400 text-xs">Watch on YouTube</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl">
                <h3 className="text-2xl font-black uppercase italic text-white mb-6 flex items-center"><MapPinned className="text-red-600 mr-3" size={28}/> How to Get There</h3>
                <div className="aspect-[16/9] bg-zinc-900 rounded-xl overflow-hidden border border-white/10 relative">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" alt="Map Area" className="w-full h-full object-cover opacity-40"/>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <MapPin size={48} className="text-red-500 mb-4"/>
                    <p className="text-white font-bold text-lg">Batur Natural Hot Spring</p>
                    <p className="text-zinc-400 text-sm mt-1">Toya Bungkah, Kintamani, Bali</p>
                    <a href="https://maps.google.com/?q=Batur+Natural+Hot+Spring+Kintamani+Bali" target="_blank" rel="noopener noreferrer" className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-6 rounded-lg text-sm uppercase tracking-widest transition-colors flex items-center">
                      <MapPin size={16} className="mr-2"/> Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== EVENT SCHEDULE ===== */}
          {activeTab === 'schedule' && (
            <div className="animate-fade-in bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-black uppercase italic text-white mb-8 flex items-center"><Calendar className="text-red-600 mr-3" size={32}/> Event Schedule</h2>
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden overflow-x-auto shadow-lg">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead><tr className="bg-zinc-900 border-b border-white/10"><th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Date</th><th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Time</th><th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Event Details</th><th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Location</th></tr></thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/5 hover:bg-white/5"><td className="p-5 font-bold text-red-400">Thu, 14 May</td><td className="p-5 text-zinc-400">12:00 - 20:00</td><td className="p-5 font-bold text-white">Race Kit Collection Day 1</td><td className="p-5 text-zinc-500 text-xs">Batur Hot Spring</td></tr>
                    <tr className="border-b border-white/10 bg-zinc-900/30 hover:bg-white/5"><td className="p-5 font-bold text-red-400">Thu, 14 May</td><td className="p-5 text-zinc-400">16:00 - 17:00</td><td className="p-5 font-bold text-white">Race Briefing BTRU 100K</td><td className="p-5 text-zinc-500 text-xs">Batur Hot Spring</td></tr>
                    <tr className="border-b border-white/5 hover:bg-white/5"><td className="p-5 font-bold text-red-400">Fri, 15 May</td><td className="p-5 text-zinc-400">12:00 - 20:00</td><td className="p-5 font-bold text-white">Race Kit Collection Day 2</td><td className="p-5 text-zinc-500 text-xs">Batur Hot Spring</td></tr>
                    <tr className="border-b border-white/10 bg-zinc-900/30 hover:bg-white/5"><td className="p-5 font-bold text-red-400">Fri, 15 May</td><td className="p-5 text-zinc-400">16:00 - 17:00</td><td className="p-5 font-bold text-white">Race Briefing BTRU 60K / 30K / 18K</td><td className="p-5 text-zinc-500 text-xs">Batur Hot Spring</td></tr>
                    <tr className="border-b border-white/10 bg-red-900/20 hover:bg-red-900/30"><td className="p-5 font-black text-red-500">Fri, 15 May</td><td className="p-5 font-black text-white">18:00 WITA</td><td className="p-5 font-black text-white text-lg tracking-wider">FLAG OFF BTRU 100K</td><td className="p-5 text-zinc-400 text-xs font-bold">Start Line</td></tr>
                    <tr className="border-b border-white/5 bg-red-900/20 hover:bg-red-900/30"><td className="p-5 font-black text-red-500">Sat, 16 May</td><td className="p-5 font-black text-white">04:00 WITA</td><td className="p-5 font-black text-white text-lg tracking-wider">FLAG OFF BTRU 60K</td><td className="p-5 text-zinc-400 text-xs font-bold">Start Line</td></tr>
                    <tr className="border-b border-white/10 bg-red-900/20 hover:bg-red-900/30"><td className="p-5 font-black text-red-500">Sat, 16 May</td><td className="p-5 font-black text-white">06:00 WITA</td><td className="p-5 font-black text-white text-lg tracking-wider">FLAG OFF BTRU 30K</td><td className="p-5 text-zinc-400 text-xs font-bold">Start Line</td></tr>
                    <tr className="border-b border-white/5 bg-red-900/20 hover:bg-red-900/30"><td className="p-5 font-black text-red-500">Sat, 16 May</td><td className="p-5 font-black text-white">06:30 WITA</td><td className="p-5 font-black text-white text-lg tracking-wider">FLAG OFF BTRU 18K</td><td className="p-5 text-zinc-400 text-xs font-bold">Start Line</td></tr>
                    <tr className="bg-red-900/20 hover:bg-red-900/30"><td className="p-5 font-black text-red-500">Sat, 16 May</td><td className="p-5 font-black text-white">07:00 WITA</td><td className="p-5 font-black text-white text-lg tracking-wider">FLAG OFF BTRU 7K</td><td className="p-5 text-zinc-400 text-xs font-bold">Start Line</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== RULES & REGULATIONS (FAQ ACCORDION) ===== */}
          {activeTab === 'rules' && (
            <div className="animate-fade-in">
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl mb-6">
                <h2 className="text-3xl font-black uppercase italic text-white mb-4 flex items-center"><Gavel className="text-red-600 mr-3" size={32}/> Rules and Regulations</h2>
                <p className="text-zinc-400 mb-6">The organizer reserves the right to amend the Rules and Regulations without giving prior notification or any reasons thereof.</p>
                
                <div className="bg-yellow-950/20 border border-yellow-800/30 rounded-xl p-5 mb-4">
                  <div className="flex items-start">
                    <AlertTriangle size={20} className="text-yellow-500 mr-3 mt-0.5 shrink-0"/>
                    <div>
                      <h4 className="text-yellow-400 font-bold text-sm mb-1">Disclaimer</h4>
                      <p className="text-yellow-200/60 text-xs">The Participant hereby waives, releases, and declares that they will not sue the Organizer and will release the Organizer and all parties related to the Organizer from all responsibilities, claims, actions, or losses that may arise or be related to their registration or participation in the BTR Ultra 2026 event.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-5 mb-8">
                  <div className="flex items-start">
                    <CircleAlert size={20} className="text-red-500 mr-3 mt-0.5 shrink-0"/>
                    <div>
                      <h4 className="text-red-400 font-bold text-sm mb-1">Please read this section very carefully.</h4>
                      <p className="text-red-200/60 text-xs">Any runner not adhering to any of the following rules is subject to disqualification or penalty.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-0">
                {rulesData.map(item => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openRules.includes(item.id)}
                    toggle={() => toggleRule(item.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ===== MANDATORY GEAR ===== */}
          {activeTab === 'gear' && (
            <div className="animate-fade-in bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-black uppercase italic text-white mb-2 flex items-center"><ShieldCheck className="text-red-600 mr-3" size={32}/> Mandatory Gear</h2>
              <p className="text-zinc-400 mb-6 font-light">The following gears are strictly mandatory. Gear checks will be performed at random checkpoints.</p>
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
                        <td className="p-4">{row.k7 === true ? <Check className="mx-auto text-green-500" size={20}/> : row.k7 === false ? <XIcon className="mx-auto text-red-500/50" size={20}/> : <span className="text-yellow-500 text-[10px] font-bold uppercase">{row.k7}</span>}</td>
                        <td className="p-4">{row.k18 === true ? <Check className="mx-auto text-green-500" size={20}/> : row.k18 === false ? <XIcon className="mx-auto text-red-500/50" size={20}/> : <span className="text-yellow-500 text-[10px] font-bold uppercase">{row.k18}</span>}</td>
                        <td className="p-4 bg-zinc-900/30">{row.k100 === true ? <Check className="mx-auto text-green-500" size={20}/> : row.k100 === false ? <XIcon className="mx-auto text-red-500/50" size={20}/> : <span className="text-yellow-500 text-[10px] font-bold uppercase">{row.k100}</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== RACE PACK COLLECTION ===== */}
          {activeTab === 'rpc' && (
            <div className="animate-fade-in bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-black uppercase italic text-white mb-8 flex items-center"><Box className="text-red-600 mr-3" size={32}/> Race Pack Collection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-black border border-white/10 p-8 rounded-2xl shadow-lg">
                  <h3 className="text-red-500 font-black uppercase tracking-widest text-sm mb-4 border-b border-white/10 pb-2">RPC Rules & Regulations</h3>
                  <ul className="space-y-4 text-sm text-zinc-300">
                    <li className="flex items-start"><AlertTriangle size={16} className="text-yellow-500 mr-3 mt-0.5 shrink-0"/> <span>You <strong className="text-white">must</strong> collect your own RPC. It cannot be represented.</span></li>
                    <li className="flex items-start"><AlertTriangle size={16} className="text-yellow-500 mr-3 mt-0.5 shrink-0"/> <span>Outside collection hours, pickup available by reservation with additional fee of <strong className="text-white">IDR 100,000</strong>.</span></li>
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
              <div className="bg-black border border-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold text-sm mb-3 flex items-center"><Calendar size={16} className="text-red-500 mr-2"/> Collection Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-white/10 rounded-lg p-4"><div className="text-red-400 font-bold text-sm">Day 1 — Thu, 14 May 2026</div><div className="text-zinc-400 text-xs mt-1">12:00 – 20:00 WITA</div></div>
                  <div className="border border-white/10 rounded-lg p-4"><div className="text-red-400 font-bold text-sm">Day 2 — Fri, 15 May 2026</div><div className="text-zinc-400 text-xs mt-1">12:00 – 20:00 WITA</div></div>
                </div>
              </div>
            </div>
          )}

          {/* ===== MERCHANDISE ===== */}
          {activeTab === 'merch' && (
            <div className="animate-fade-in bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-black uppercase italic text-white mb-8 flex items-center"><Shirt className="text-red-600 mr-3" size={32}/> Official Merchandise</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'BTR Finisher Jacket', price: 'IDR 450.000', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400' },
                  { name: 'BTR Trail Running Tee', price: 'IDR 250.000', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400' },
                  { name: 'Volcano Cap', price: 'IDR 150.000', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=400' }
                ].map((m, i) => (
                  <div key={i} className="bg-black border border-white/10 rounded-xl overflow-hidden group">
                    <div className="aspect-square overflow-hidden bg-zinc-900 relative p-6"><img src={m.img} alt={m.name} className="w-full h-full object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-500"/></div>
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

          {/* ===== ACCOMMODATION ===== */}
          {activeTab === 'accommodation' && (
            <div className="animate-fade-in bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-black uppercase italic text-white mb-6 flex items-center"><Tent className="text-red-600 mr-3" size={32}/> Accommodation</h2>
              <p className="text-zinc-400 mb-8 text-lg font-light">Stay close to the race venue for convenience. Here are our recommended accommodations near Kintamani and the Batur Hot Spring area.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Lakeside Cottages Batur', type: 'Budget Friendly', price: 'from IDR 350.000/night', desc: 'Simple, clean cottages with lake views. Walking distance to the start line.' },
                  { name: 'Kintamani Highland Resort', type: 'Mid-Range', price: 'from IDR 800.000/night', desc: 'Comfortable rooms with panoramic views of Mount Batur and Lake Batur.' },
                  { name: 'Batur Caldera Glamping', type: 'Unique Experience', price: 'from IDR 1.200.000/night', desc: 'Glamping tents on the caldera rim. Unforgettable sunrise views.' },
                  { name: 'Hotel Segara Kintamani', type: 'Premium', price: 'from IDR 1.500.000/night', desc: 'Full-service hotel with restaurant, spa, and hot spring pool access.' },
                ].map((h, i) => (
                  <div key={i} className="bg-black border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-white font-bold text-lg">{h.name}</h4>
                      <span className="bg-red-600/20 text-red-400 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider shrink-0 ml-2">{h.type}</span>
                    </div>
                    <p className="text-zinc-400 text-sm mb-3">{h.desc}</p>
                    <p className="text-red-500 font-bold text-sm">{h.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== DOWNLOAD PAGES ===== */}
          {activeTab.startsWith('dl-') && (
            <div className="animate-fade-in bg-zinc-950 border border-white/10 rounded-2xl p-10 shadow-2xl flex flex-col items-center justify-center min-h-[50vh] text-center">
              <div className="w-20 h-20 rounded-2xl bg-red-600/10 flex items-center justify-center mb-6">
                <Download size={40} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-black uppercase text-white mb-2">
                Download {activeTab.replace('dl-', '').replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </h2>
              <p className="text-zinc-500 mb-8 max-w-md font-light">The official document for this section is available for download. Please review it carefully before race day.</p>
              <button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-4 px-10 rounded-xl flex items-center uppercase tracking-widest transition-transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
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
// REGISTER VIEW
// ==========================================
function RegisterView({ navigate }: RegisterViewProps) {
  const [formData, setFormData] = useState<{ category: CategoryId }>({ category: '30k' });
  const [step, setStep] = useState(1);
  const cat = categoriesData[formData.category];

  const handleProceed = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 
    navigate('payment', { category: formData.category }); 
  };

  const inputClass = "w-full bg-black/80 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-zinc-600 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 focus:bg-black outline-none transition-all";
  const labelClass = "block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] mb-2";

  return (
    <div className="animate-fade-in">
      {/* HERO HEADER */}
      <div className="relative overflow-hidden -mt-24 pt-24">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2000" alt="Trail" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-6 text-center">
          <div className="inline-flex items-center bg-red-600/10 border border-red-600/30 rounded-full px-4 py-1.5 mb-6">
            <Flame size={14} className="text-red-500 mr-2"/>
            <span className="text-red-400 text-[10px] font-bold uppercase tracking-[0.2em]">Registration Open — Limited Slots</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-3">
            Runner <span className="text-red-600">Registration</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Fill in your details to secure your spot at BTR Ultra 2026
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20 relative z-10">
        {/* PROGRESS STEPS */}
        <div className="flex items-center justify-center mb-12">
          {[
            { num: 1, label: 'Category' },
            { num: 2, label: 'Personal Info' },
            { num: 3, label: 'Emergency' },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <button 
                onClick={() => setStep(s.num)} 
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${step === s.num ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : step > s.num ? 'bg-red-600/20 text-red-400' : 'bg-zinc-900 text-zinc-500'}`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step === s.num ? 'bg-white text-red-600' : step > s.num ? 'bg-red-600/30 text-red-400' : 'bg-zinc-800 text-zinc-500'}`}>{step > s.num ? '✓' : s.num}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:block">{s.label}</span>
              </button>
              {idx < 2 && <div className={`w-12 md:w-20 h-[2px] mx-2 ${step > s.num ? 'bg-red-600/50' : 'bg-zinc-800'}`}></div>}
            </div>
          ))}
        </div>

        <form onSubmit={handleProceed}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT SIDEBAR — SELECTED CATEGORY SUMMARY */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden sticky top-28 shadow-2xl">
                <div className="relative h-40 overflow-hidden">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover opacity-60"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className={`inline-block text-white px-4 py-0.5 italic transform -skew-x-12 shadow-md text-2xl font-black ${cat.color}`}>
                      <span className="skew-x-12 block">{cat.name}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Distance</span>
                    <span className="font-bold text-white">{cat.dist}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Elevation</span>
                    <span className="font-bold text-white">{cat.elev}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Cut-Off</span>
                    <span className="font-bold text-white">{cat.cot}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Start</span>
                    <span className="font-bold text-white">{cat.startTime} WITA</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Fee (Local)</span>
                    <span className="font-black text-red-500 text-xl">IDR {cat.priceLocal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Fee (Foreign)</span>
                    <span className="font-bold text-zinc-300">IDR {cat.priceForeign}</span>
                  </div>
                </div>
                <div className="p-5 bg-black/50 border-t border-white/5">
                  <div className="flex items-center text-[10px] text-zinc-500 uppercase tracking-wider">
                    <ShieldCheck size={14} className="text-green-500 mr-2 shrink-0"/> Secure Registration
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — FORM SECTIONS */}
            <div className="lg:col-span-2 order-1 lg:order-2 space-y-8">

              {/* ===== STEP 1: CATEGORY ===== */}
              <div className={`bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl transition-all ${step === 1 ? '' : 'opacity-60'}`}>
                <h3 className="text-lg font-black uppercase text-white mb-6 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white text-xs font-black mr-3">1</div>
                  Select Your Category
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.values(categoriesData).map(c => (
                    <label 
                      key={c.id} 
                      className={`cursor-pointer border rounded-xl p-5 transition-all relative overflow-hidden group ${formData.category === c.id ? 'border-red-500 bg-red-600/10 shadow-[0_0_20px_rgba(220,38,38,0.15)]' : 'bg-black border-white/10 hover:border-white/20'}`}
                    >
                      <input type="radio" name="category" value={c.id} checked={formData.category === c.id} onChange={(e) => setFormData({...formData, category: e.target.value as CategoryId})} className="hidden" />
                      {formData.category === c.id && <div className="absolute top-3 right-3 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center"><Check size={12} className="text-white"/></div>}
                      <div className={`inline-block text-white px-3 py-0.5 italic transform -skew-x-12 shadow-md text-lg font-black mb-2 ${c.color}`}>
                        <span className="skew-x-12 block">{c.name}</span>
                      </div>
                      <div className="text-zinc-400 text-xs mt-1">{c.dist} • {c.elev}</div>
                      <div className="text-white font-bold text-sm mt-2">IDR {c.priceLocal}</div>
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="button" onClick={() => setStep(2)} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-xl text-sm uppercase tracking-widest transition-all flex items-center">
                    Continue <ArrowRight size={16} className="ml-2"/>
                  </button>
                </div>
              </div>

              {/* ===== STEP 2: PERSONAL INFORMATION ===== */}
              <div className={`bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl transition-all ${step === 2 ? '' : step > 2 ? 'opacity-60' : 'opacity-40 pointer-events-none'}`}>
                <h3 className="text-lg font-black uppercase text-white mb-6 flex items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black mr-3 ${step >= 2 ? 'bg-red-600' : 'bg-zinc-800'}`}>2</div>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>Full Name (Nama Lengkap) *</label>
                    <input required type="text" placeholder="Enter your full name as on ID" className={inputClass} />
                  </div>
                  {/* BIB Name */}
                  <div>
                    <label className={labelClass}>BIB Name (Nama di BIB) *</label>
                    <input required type="text" placeholder="Name displayed on your BIB" maxLength={15} className={inputClass} />
                    <p className="text-zinc-600 text-[9px] mt-1.5 uppercase tracking-wider">Max 15 characters</p>
                  </div>
                  {/* NIK */}
                  <div>
                    <label className={labelClass}>NIK (No. KTP / Passport) *</label>
                    <input required type="text" placeholder="ID number" className={inputClass} />
                  </div>
                  {/* Birth Date */}
                  <div>
                    <label className={labelClass}>Date of Birth *</label>
                    <input required type="date" className={`${inputClass} [color-scheme:dark]`} />
                  </div>
                  {/* Gender */}
                  <div>
                    <label className={labelClass}>Gender *</label>
                    <div className="flex gap-3">
                      <label className="flex-1 cursor-pointer">
                        <input type="radio" name="gender" value="male" className="hidden peer" required />
                        <div className="peer-checked:border-red-500 peer-checked:bg-red-600/10 border border-white/10 bg-black/80 rounded-xl p-4 text-center transition-all hover:border-white/20">
                          <span className="text-white text-sm font-bold">Male</span>
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input type="radio" name="gender" value="female" className="hidden peer" />
                        <div className="peer-checked:border-red-500 peer-checked:bg-red-600/10 border border-white/10 bg-black/80 rounded-xl p-4 text-center transition-all hover:border-white/20">
                          <span className="text-white text-sm font-bold">Female</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  {/* Age */}
                  <div>
                    <label className={labelClass}>Age *</label>
                    <input required type="number" min={18} max={99} placeholder="Your age on race day" className={inputClass} />
                  </div>
                  {/* Email */}
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input required type="email" placeholder="your@email.com" className={inputClass} />
                  </div>
                  {/* Phone */}
                  <div>
                    <label className={labelClass}>Phone / WhatsApp *</label>
                    <input required type="tel" placeholder="+62 8xx xxxx xxxx" className={inputClass} />
                  </div>
                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>Address (Alamat Lengkap) *</label>
                    <input required type="text" placeholder="Street address" className={inputClass} />
                  </div>
                  {/* City */}
                  <div>
                    <label className={labelClass}>City (Kota) *</label>
                    <input required type="text" placeholder="Your city" className={inputClass} />
                  </div>
                  {/* Jersey Size */}
                  <div>
                    <label className={labelClass}>Jersey Size *</label>
                    <div className="grid grid-cols-6 gap-2">
                      {['XS','S','M','L','XL','XXL'].map(sz => (
                        <label key={sz} className="cursor-pointer">
                          <input type="radio" name="jersey" value={sz} className="hidden peer" required />
                          <div className="peer-checked:border-red-500 peer-checked:bg-red-600/10 peer-checked:text-white border border-white/10 bg-black/80 rounded-lg py-3 text-center text-sm font-bold text-zinc-400 transition-all hover:border-white/20">
                            {sz}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="text-zinc-500 hover:text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-widest transition-all flex items-center">
                    <ArrowLeft size={16} className="mr-2"/> Back
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-xl text-sm uppercase tracking-widest transition-all flex items-center">
                    Continue <ArrowRight size={16} className="ml-2"/>
                  </button>
                </div>
              </div>

              {/* ===== STEP 3: EMERGENCY CONTACT ===== */}
              <div className={`bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl transition-all ${step === 3 ? '' : 'opacity-40 pointer-events-none'}`}>
                <h3 className="text-lg font-black uppercase text-white mb-6 flex items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black mr-3 ${step >= 3 ? 'bg-red-600' : 'bg-zinc-800'}`}>3</div>
                  Emergency Contact
                </h3>

                <div className="bg-yellow-950/20 border border-yellow-800/30 rounded-xl p-4 mb-6 flex items-start">
                  <AlertTriangle size={18} className="text-yellow-500 mr-3 mt-0.5 shrink-0"/>
                  <p className="text-yellow-200/70 text-xs">Please provide a contact person who is NOT participating in the race and can be reached in case of emergency.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Emergency Contact Name *</label>
                    <input required type="text" placeholder="Full name of contact person" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Emergency Contact Phone *</label>
                    <input required type="tel" placeholder="+62 8xx xxxx xxxx" className={inputClass} />
                  </div>
                </div>

                {/* AGREEMENT */}
                <div className="mt-8 bg-black/50 border border-white/5 rounded-xl p-5 space-y-4">
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" required className="mt-1 mr-3 accent-red-600 w-4 h-4 shrink-0"/>
                    <span className="text-zinc-400 text-xs group-hover:text-zinc-300 transition-colors">I confirm that all information provided is accurate. I have read and agree to the <span className="text-red-500">Rules & Regulations</span>, <span className="text-red-500">Terms & Conditions</span>, and <span className="text-red-500">Waiver of Liability</span>.</span>
                  </label>
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" required className="mt-1 mr-3 accent-red-600 w-4 h-4 shrink-0"/>
                    <span className="text-zinc-400 text-xs group-hover:text-zinc-300 transition-colors">I declare that I am physically fit to participate in this trail running event and accept all risks involved.</span>
                  </label>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button type="button" onClick={() => setStep(2)} className="text-zinc-500 hover:text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-widest transition-all flex items-center">
                    <ArrowLeft size={16} className="mr-2"/> Back
                  </button>
                  <button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-4 px-12 rounded-xl text-lg uppercase tracking-[0.15em] shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center">
                    <Wallet size={20} className="mr-3"/> Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// PAYMENT VIEW
// ==========================================
function PaymentView({ navigate, category }: PaymentViewProps) {
  const cat = categoriesData[category] ?? categoriesData['100k'];
  const adminFee = 25000;
  const rawPrice = parseInt(cat.priceLocal.replace(/\./g, ''), 10);
  const total = rawPrice + adminFee;
  const [paymentMethod, setPaymentMethod] = useState('va');

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-4 py-16">
      <button onClick={() => navigate('register')} className="text-zinc-500 hover:text-white flex items-center mb-8 text-sm font-bold uppercase tracking-widest transition-colors"><ArrowLeft size={16} className="mr-2"/> Back</button>
      <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-10">Checkout <span className="text-red-600">Payment</span></h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 shadow-2xl sticky top-28">
            <h3 className="text-lg font-black uppercase text-white mb-6 border-b border-white/10 pb-4">Order Summary</h3>
            <div className="space-y-4 mb-6"><div className="flex justify-between items-start"><div><div className="font-bold text-white text-lg">{cat.title}</div><div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Local Runner Registration</div></div></div><div className="pt-4 border-t border-white/5 space-y-3 text-sm"><div className="flex justify-between"><span className="text-zinc-400">Registration Fee</span><span className="font-bold text-white">IDR {cat.priceLocal}</span></div><div className="flex justify-between"><span className="text-zinc-400">Platform & Admin Fee</span><span className="font-bold text-white">IDR 25.000</span></div></div></div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-center mb-8"><span className="font-bold uppercase tracking-widest text-zinc-400 text-sm">Total</span><span className="font-black text-2xl text-red-500">IDR {total.toLocaleString('id-ID')}</span></div>
            <div className="flex items-center text-[10px] text-zinc-500 uppercase tracking-wider bg-black p-3 rounded-lg border border-white/5"><ShieldCheck size={16} className="text-green-500 mr-2 shrink-0"/> Secure SSL Encrypted</div>
          </div>
        </div>
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-xl font-black uppercase text-white mb-6 flex items-center"><CreditCard className="text-red-600 mr-3" /> Payment Method</h3>
            <div className="space-y-4 mb-10">
              {[{id:'va', name:'BCA Virtual Account', desc:'Instant confirmation, myBCA or BCA Mobile.', badge:'Recommended'},{id:'cc',name:'Credit / Debit Card',desc:'Visa, Mastercard, JCB.'},{id:'qris',name:'QRIS E-Wallet',desc:'Gopay, OVO, Dana, ShopeePay.'}].map(pm => (
                <label key={pm.id} className={`cursor-pointer border rounded-xl p-6 flex items-center transition-all ${paymentMethod === pm.id ? 'bg-red-600/10 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'bg-black border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === pm.id} onChange={() => setPaymentMethod(pm.id)} className="hidden" />
                  <div className="w-6 h-6 rounded-full border-2 border-zinc-600 flex items-center justify-center mr-4">{paymentMethod === pm.id && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}</div>
                  <div><div className="font-bold text-white text-lg flex items-center">{pm.name} {pm.badge && <span className="ml-3 bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded uppercase">{pm.badge}</span>}</div><div className="text-xs text-zinc-500 mt-1">{pm.desc}</div></div>
                </label>
              ))}
            </div>
            <button onClick={() => alert("Redirecting to Payment Gateway...")} className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-5 rounded-xl text-lg uppercase tracking-widest shadow-[0_10px_20px_rgba(220,38,38,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center"><Wallet size={24} className="mr-3" /> Pay Now (IDR {total.toLocaleString('id-ID')})</button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// RESULTS VIEW
// ==========================================
function ResultsView() {
  const [activeCategory, setActiveCategory] = useState('100k');
  const [searchTerm, setSearchTerm] = useState('');

  interface ResultEntry {
    rank: number;
    name: string;
    bib: string;
    time: string;
    cat: string;
    country: string;
    age: number;
    gender: string;
    pace: string;
  }

  const allResults: Record<string, ResultEntry[]> = {
    '100k': [
      { rank: 1, name: 'BUL SUGIARTO', bib: '2440', time: '14:33:00', cat: '100K Male', country: 'IDN', age: 32, gender: 'M', pace: '8:13/km' },
      { rank: 2, name: 'THETA WARDAN', bib: '2441', time: '16:43:31', cat: '100K Male', country: 'IDN', age: 28, gender: 'M', pace: '9:27/km' },
      { rank: 3, name: 'MENDRA WANT', bib: '2442', time: '18:30:25', cat: '100K Male', country: 'IDN', age: 35, gender: 'M', pace: '10:27/km' },
      { rank: 4, name: 'MOHD PARIVE BI', bib: '2443', time: '21:40:40', cat: '100K Male', country: 'MYS', age: 41, gender: 'M', pace: '12:15/km' },
      { rank: 5, name: 'HENDRA KUSUMA', bib: '2444', time: '22:15:12', cat: '100K Male', country: 'IDN', age: 38, gender: 'M', pace: '12:34/km' },
      { rank: 6, name: 'SARAH TANAKA', bib: '2501', time: '23:10:45', cat: '100K Female', country: 'JPN', age: 29, gender: 'F', pace: '13:05/km' },
      { rank: 7, name: 'DEWI LESTARI', bib: '2502', time: '24:45:30', cat: '100K Female', country: 'IDN', age: 33, gender: 'F', pace: '13:59/km' },
      { rank: 8, name: 'RICKY PRATAMA', bib: '2445', time: '25:30:00', cat: '100K Male', country: 'IDN', age: 45, gender: 'M', pace: '14:24/km' },
    ],
    '60k': [
      { rank: 1, name: 'AGUS SETIAWAN', bib: '3201', time: '07:22:15', cat: '60K Male', country: 'IDN', age: 30, gender: 'M', pace: '7:12/km' },
      { rank: 2, name: 'YUKI NAKAMURA', bib: '3202', time: '08:05:40', cat: '60K Male', country: 'JPN', age: 27, gender: 'M', pace: '7:55/km' },
      { rank: 3, name: 'DANI CHIKA', bib: '3203', time: '08:44:10', cat: '60K Female', country: 'IDN', age: 26, gender: 'F', pace: '8:33/km' },
      { rank: 4, name: 'WAYAN SURYA', bib: '3204', time: '09:15:00', cat: '60K Male', country: 'IDN', age: 34, gender: 'M', pace: '9:03/km' },
      { rank: 5, name: 'LEE MIN HO', bib: '3205', time: '10:30:22', cat: '60K Male', country: 'KOR', age: 31, gender: 'M', pace: '10:17/km' },
    ],
    '30k': [
      { rank: 1, name: 'RIZKI RAMADHAN', bib: '4101', time: '03:15:45', cat: '30K Male', country: 'IDN', age: 25, gender: 'M', pace: '6:46/km' },
      { rank: 2, name: 'PUTU ADITYA', bib: '4102', time: '03:32:10', cat: '30K Male', country: 'IDN', age: 29, gender: 'M', pace: '7:20/km' },
      { rank: 3, name: 'ANNA SMITH', bib: '4201', time: '03:55:22', cat: '30K Female', country: 'AUS', age: 31, gender: 'F', pace: '8:08/km' },
      { rank: 4, name: 'KADEK SURYA', bib: '4103', time: '04:10:00', cat: '30K Male', country: 'IDN', age: 37, gender: 'M', pace: '8:39/km' },
    ],
  };

  const results = allResults[activeCategory] || [];
  const filtered = searchTerm 
    ? results.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.bib.includes(searchTerm))
    : results;
  const podium = results.slice(0, 3);
  const totalFinishers = results.length;
  const catLabel = activeCategory.toUpperCase();

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <div className="relative overflow-hidden -mt-24 pt-24">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1533202998083-d52ec1eb311b?auto=format&fit=crop&q=80&w=2000" alt="Finish line" className="w-full h-full object-cover opacity-15"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-8 text-center">
          <div className="inline-flex items-center bg-red-600/10 border border-red-600/30 rounded-full px-4 py-1.5 mb-4">
            <Trophy size={14} className="text-red-500 mr-2"/>
            <span className="text-red-400 text-[10px] font-bold uppercase tracking-[0.2em]">Official Results — BTR Ultra 2025</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white mb-3">
            Race <span className="text-red-600">Results</span>
          </h1>
          <p className="text-zinc-400 text-lg">Leaderboard • Finisher Times • Statistics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['100k', '60k', '30k'].map(catId => (
            <button
              key={catId}
              onClick={() => { setActiveCategory(catId); setSearchTerm(''); }}
              className={`px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeCategory === catId ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'}`}
            >
              {catId.toUpperCase()} Category
            </button>
          ))}
        </div>

        {/* PODIUM SECTION */}
        {podium.length >= 3 && (
          <div className="mb-12">
            <div className="flex items-end justify-center gap-3 md:gap-6 max-w-3xl mx-auto">
              {/* 2nd Place */}
              <div className="flex-1 max-w-[200px]">
                <div className="text-center mb-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 mx-auto flex items-center justify-center text-black font-black text-xl shadow-lg border-2 border-zinc-400">2</div>
                  <h4 className="text-white font-bold text-sm mt-2 truncate">{podium[1].name}</h4>
                  <div className="text-zinc-400 text-[10px] uppercase tracking-widest">{podium[1].country}</div>
                </div>
                <div className="bg-gradient-to-t from-zinc-700 to-zinc-600 rounded-t-xl h-28 md:h-32 flex flex-col items-center justify-end pb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent)]"></div>
                  <span className="text-white font-black text-sm md:text-lg tracking-wider relative z-10">{podium[1].time}</span>
                  <span className="text-zinc-300 text-[9px] uppercase tracking-widest relative z-10">BIB {podium[1].bib}</span>
                </div>
              </div>
              {/* 1st Place */}
              <div className="flex-1 max-w-[220px]">
                <div className="text-center mb-3">
                  <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 mx-auto flex items-center justify-center text-black font-black text-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)] border-2 border-yellow-400" style={{width: '4.5rem', height: '4.5rem'}}>
                    <Trophy size={28}/>
                  </div>
                  <h4 className="text-white font-black text-base md:text-lg mt-2 truncate">{podium[0].name}</h4>
                  <div className="text-yellow-500 text-[10px] uppercase tracking-widest font-bold">{podium[0].country} • Champion</div>
                </div>
                <div className="bg-gradient-to-t from-yellow-700 to-amber-600 rounded-t-xl h-36 md:h-44 flex flex-col items-center justify-end pb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.2),transparent)]"></div>
                  <span className="text-white font-black text-lg md:text-2xl tracking-wider relative z-10">{podium[0].time}</span>
                  <span className="text-yellow-200 text-[9px] uppercase tracking-widest relative z-10">BIB {podium[0].bib}</span>
                </div>
              </div>
              {/* 3rd Place */}
              <div className="flex-1 max-w-[200px]">
                <div className="text-center mb-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 mx-auto flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-amber-700">3</div>
                  <h4 className="text-white font-bold text-sm mt-2 truncate">{podium[2].name}</h4>
                  <div className="text-zinc-400 text-[10px] uppercase tracking-widest">{podium[2].country}</div>
                </div>
                <div className="bg-gradient-to-t from-amber-900 to-amber-800 rounded-t-xl h-24 md:h-28 flex flex-col items-center justify-end pb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent)]"></div>
                  <span className="text-white font-black text-sm md:text-lg tracking-wider relative z-10">{podium[2].time}</span>
                  <span className="text-amber-300 text-[9px] uppercase tracking-widest relative z-10">BIB {podium[2].bib}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-950 border border-white/10 rounded-xl p-5 text-center">
            <div className="text-3xl font-black text-white">{totalFinishers}</div>
            <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Total Finishers</div>
          </div>
          <div className="bg-zinc-950 border border-white/10 rounded-xl p-5 text-center">
            <div className="text-3xl font-black text-red-500">{podium[0]?.time.split(':')[0]}h</div>
            <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Fastest Time</div>
          </div>
          <div className="bg-zinc-950 border border-white/10 rounded-xl p-5 text-center">
            <div className="text-3xl font-black text-white">{catLabel}</div>
            <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Category</div>
          </div>
          <div className="bg-zinc-950 border border-white/10 rounded-xl p-5 text-center">
            <div className="text-3xl font-black text-white">{results.filter(r => r.gender === 'F').length}</div>
            <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Female Finishers</div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 md:p-6 bg-black/50 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center">
              <Award size={18} className="text-red-500 mr-2"/> Full Leaderboard — {catLabel}
            </h3>
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-4 top-3.5 text-zinc-500"/>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search runner name or BIB..." 
                className="w-full bg-zinc-900 border border-white/10 text-white p-3 pl-12 rounded-xl text-sm outline-none focus:border-red-500 transition-colors placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-zinc-900/50 text-[10px] font-black uppercase tracking-[0.15em] border-b border-white/10">
                  <th className="p-5 w-20 text-center text-zinc-500">Rank</th>
                  <th className="p-5 text-zinc-500">Runner</th>
                  <th className="p-5 text-zinc-500">BIB</th>
                  <th className="p-5 text-zinc-500 text-center">Gender</th>
                  <th className="p-5 text-zinc-500 text-center">Age</th>
                  <th className="p-5 text-zinc-500">Category</th>
                  <th className="p-5 text-zinc-500 text-right">Avg Pace</th>
                  <th className="p-5 text-zinc-500 text-right">Finish Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map((r) => (
                  <tr key={r.rank} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${r.rank <= 3 ? 'bg-zinc-900/20' : ''}`}>
                    <td className="p-5 text-center">
                      {r.rank === 1 ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 text-black font-black text-xs">1</span>
                      ) : r.rank === 2 ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 text-black font-black text-xs">2</span>
                      ) : r.rank === 3 ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-white font-black text-xs">3</span>
                      ) : (
                        <span className="text-zinc-500 font-bold">{r.rank}</span>
                      )}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-[10px] font-bold mr-3 shrink-0">{r.country}</div>
                        <div>
                          <div className="text-white font-bold">{r.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-zinc-400 font-mono text-xs">{r.bib}</td>
                    <td className="p-5 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${r.gender === 'M' ? 'bg-blue-900/30 text-blue-400' : 'bg-pink-900/30 text-pink-400'}`}>
                        {r.gender === 'M' ? 'Male' : 'Female'}
                      </span>
                    </td>
                    <td className="p-5 text-center text-zinc-400">{r.age}</td>
                    <td className="p-5 text-zinc-400 text-xs">{r.cat}</td>
                    <td className="p-5 text-right text-zinc-500 font-mono text-xs">{r.pace}</td>
                    <td className="p-5 text-right">
                      <span className={`font-black tracking-wider ${r.rank <= 3 ? 'text-red-500 text-base' : 'text-zinc-300'}`}>{r.time}</span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-zinc-500">
                      <Search size={32} className="mx-auto mb-3 text-zinc-700"/>
                      <p className="font-bold">No runners found matching "{searchTerm}"</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="p-5 bg-black/50 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 uppercase tracking-widest">
            <span>Showing {filtered.length} of {results.length} finishers</span>
            <span>Results are unofficial until certified by ITRA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// NEWS VIEW
// ==========================================
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
            <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden relative"><img src={news.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="News" /><div className="absolute top-4 left-4 bg-red-600 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">{news.date}</div></div>
            <div className="p-8 w-full md:w-3/5 flex flex-col justify-center"><h3 className="font-black text-xl text-white group-hover:text-red-500 transition-colors leading-snug mb-6">{news.title}</h3><button className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center group-hover:text-white transition-colors mt-auto">Read Full Article <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-2 transition-transform"/></button></div>
          </div>
        ))}
      </div>
    </div>
  );
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
          <p>Pelari trail berbakat ini menargetkan penyelesaian rute brutal 60 Kilometer yang mengelilingi Gunung Batur dan Gunung Abang.</p>
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
  const images = ["photo-1501785888041-af3ef285b470","photo-1500530855697-b586d89ba3ee","photo-1493246507139-91e8fad9978e","photo-1469474968028-56623f02e42e","photo-1507525428034-b723cf961d3e","photo-1441974231531-c6227db76b6e","photo-1470770841072-f978cf4d019e","photo-1500534623283-312aade485b7","photo-1519681393784-d120267933ba","photo-1491553895911-0055eca6402d","photo-1500534314209-a25ddb2bd429","photo-1501785888041-af3ef285b470"];
  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 py-16">
      <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-center text-white mb-16">Official <span className="text-red-600">Gallery</span></h1>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((id, i) => (<div key={i} className="relative group overflow-hidden rounded-xl break-inside-avoid cursor-pointer shadow-lg"><img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`} className="w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Gallery" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6"><span className="text-white font-bold text-sm tracking-wider uppercase">View Photo</span></div></div>))}
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
      <div className="text-center mb-16"><h1 className="text-5xl font-black uppercase italic tracking-tighter text-white">Contact <span className="text-red-600">Us</span></h1></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-12 bg-black border-r border-white/5 flex flex-col justify-center"><h3 className="text-2xl font-black uppercase mb-8 tracking-wider text-white">Get in Touch</h3><div className="space-y-8"><div className="flex items-start"><MapPin className="text-red-600 mr-5 mt-1 shrink-0" size={24}/><p className="text-zinc-400 font-light leading-relaxed">Jl. Gunung Andakasa No. 22, Kelurahan Padangsambian, Denpasar Barat 80118</p></div><div className="flex items-center"><Mail className="text-red-600 mr-5 shrink-0" size={24}/><p className="text-zinc-300 font-bold">balitrailrunning@gmail.com</p></div><div className="flex items-center"><Phone className="text-red-600 mr-5 shrink-0" size={24}/><p className="text-zinc-300 font-bold">+62 812 3003 5465</p></div></div></div>
        <div className="p-12 bg-zinc-950"><div className="space-y-6"><div><input type="text" placeholder="Full Name" className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none text-sm font-light transition-colors"/></div><div><input type="email" placeholder="Email Address" className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none text-sm font-light transition-colors"/></div><div><textarea placeholder="Your Message..." rows={5} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none text-sm font-light transition-colors resize-none"></textarea></div><button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] text-sm transition-transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(220,38,38,0.3)]">Send Message</button></div></div>
      </div>
    </div>
  );
}

// ==========================================
// LOGIN VIEW
// ==========================================
function LoginView({ navigate }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); alert(`Login berhasil! Selamat datang, ${email}`); navigate('home'); };

  return (
    <div className="animate-fade-in flex items-center justify-center min-h-[75vh] px-4">
      <div className="bg-zinc-950 border border-white/10 p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>
        <div className="text-center mb-10"><div className="text-5xl font-black italic tracking-tighter text-white mb-3">BTR<span className="text-red-600">ULTRA</span></div><p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Sign in to your runner account</p></div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative"><User className="absolute left-4 top-4 text-zinc-500" size={20}/><input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-black border border-white/10 rounded-xl p-4 pl-14 text-white focus:border-red-500 outline-none text-sm font-light transition-colors"/></div>
          <div className="relative"><Lock className="absolute left-4 top-4 text-zinc-500" size={20}/><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-black border border-white/10 rounded-xl p-4 pl-14 text-white focus:border-red-500 outline-none text-sm font-light transition-colors"/></div>
          <div className="flex justify-between items-center text-xs text-zinc-400 font-bold"><label className="flex items-center cursor-pointer hover:text-white transition-colors"><input type="checkbox" className="mr-3 accent-red-600 w-4 h-4"/> Remember me</label><button type="button" className="hover:text-red-500 transition-colors">Forgot password?</button></div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] text-sm transition-transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(220,38,38,0.3)] mt-6">Login</button>
        </form>
        <p className="text-center text-xs text-zinc-500 mt-8 font-bold uppercase tracking-widest">No account? <button onClick={() => navigate('register')} className="text-red-500 hover:text-white transition-colors ml-1">Sign up</button></p>
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

  const getInfoTab = () => {
    if (!currentPath.startsWith('info-')) return 'venue';
    return currentPath.slice(5);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-red-600 selection:text-white">
      <style>{`.animate-fade-in { animation: fadeIn 0.4s ease-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <Navbar currentPath={currentPath} navigate={navigate} isScrolled={isScrolled} />
      <main className="pt-20 lg:pt-24 min-h-screen">
        {currentPath === 'home' && <HomeView navigate={navigate} />}
        {currentPath === 'register' && <RegisterView navigate={navigate} />}
        {currentPath === 'payment' && <PaymentView navigate={navigate} category={selectedCategory} />}
        {currentPath.startsWith('category-') && <CategoryDetailView categoryId={currentPath.replace('category-', '')} navigate={navigate} />}
        {currentPath.startsWith('info-') && <RaceInfoView initialTab={getInfoTab()} navigate={navigate} />}
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