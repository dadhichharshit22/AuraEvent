import { Button } from "./ui/button";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#351952] text-white flex justify-between items-center h-1/2">
      <div className="p-4 h-full w-1/2 flex justify-between flex-col">
        <h1 className="font-meow text-6xl">AuraEvents</h1>

        <div className="space-x-4">
          <Button variant={"circular"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <circle
                cx="17"
                cy="7"
                r="1.5"
                fill="currentColor"
                fill-opacity="0"
              >
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="1.3s"
                  dur="0.15s"
                  values="0;1"
                />
              </circle>
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path
                  stroke-dasharray="72"
                  stroke-dashoffset="72"
                  d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.6s"
                    values="72;0"
                  />
                </path>
                <path
                  stroke-dasharray="28"
                  stroke-dashoffset="28"
                  d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.7s"
                    dur="0.6s"
                    values="28;0"
                  />
                </path>
              </g>
            </svg>
          </Button>
          <Button variant={"circular"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
            >
              <g fill="none">
                <g clip-path="url(#primeTwitter0)">
                  <path
                    fill="currentColor"
                    d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
                  />
                </g>
                <defs>
                  <clipPath id="primeTwitter0">
                    <path fill="#fff" d="M0 0h14v14H0z" />
                  </clipPath>
                </defs>
              </g>
            </svg>
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center h-full w-1/2 p-4">
        <div>
          <h1 className="font-thin">Info</h1>

          <div>About us</div>
          <div>Project</div>
          <div>News</div>
          <div>Partners</div>
        </div>
        <Button variant={"secondary"}> connect</Button>
      </div>
    </div>
  );
};


export default Footer;

// import React from "react";
// import { Home, Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react";

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-200">
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="space-y-4">
//             <h3 className="text-2xl font-bold text-white">
//               EventManage<span className="text-blue-500">.</span>
//             </h3>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               Discover and join amazing events happening near you. Your one-stop
//               platform for event management and discovery.
//             </p>
//             <div className="flex space-x-4">
//               <a
//                 href="https://twitter.com"
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <Twitter size={20} />
//               </a>
//               <a
//                 href="https://facebook.com"
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <Facebook size={20} />
//               </a>
//               <a
//                 href="https://instagram.com"
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <Instagram size={20} />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold text-white">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="/"
//                   className="text-gray-400 hover:text-blue-400 transition-colors inline-flex items-center"
//                 >
//                   <Home size={16} className="mr-2" /> Home
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/register"
//                   className="text-gray-400 hover:text-blue-400 transition-colors"
//                 >
//                   Signup
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/dashboard"
//                   className="text-gray-400 hover:text-blue-400 transition-colors"
//                 >
//                   Dashboard
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/dashboard/profile"
//                   className="text-gray-400 hover:text-blue-400 transition-colors"
//                 >
//                   Profile
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Resources */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold text-white">Resources</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="/"
//                   className="text-gray-400 hover:text-blue-400 transition-colors"
//                 >
//                   Help Center
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/"
//                   className="text-gray-400 hover:text-blue-400 transition-colors"
//                 >
//                   Terms of Service
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/"
//                   className="text-gray-400 hover:text-blue-400 transition-colors"
//                 >
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/"
//                   className="text-gray-400 hover:text-blue-400 transition-colors"
//                 >
//                   FAQ
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold text-white">Contact Us</h4>
//             <ul className="space-y-2">
//               <li className="flex items-center text-gray-400">
//                 <Mail size={16} className="mr-2" />
//                 <span>codeewithdorbi@gmail.com</span>
//               </li>
//               <li className="flex items-center text-gray-400">
//                 <Phone size={10} className="mr-2" />
//                 <span>+91-7017258457</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-12 pt-8 border-t border-gray-800">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <p className="text-sm text-gray-400">
//               &copy; {new Date().getFullYear()} EventManage. All rights
//               reserved.
//             </p>
//             <div className="flex space-x-6">
//               <a
//                 href="/terms"
//                 className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
//               >
//                 Terms
//               </a>
//               <a
//                 href="/privacy"
//                 className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
//               >
//                 Privacy
//               </a>
//               <a
//                 href="/cookies"
//                 className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
//               >
//                 Cookies
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
