import { TextReveal } from "./magicui/text-reveal";

export function ProductsTextReveal() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      {/* Design 1: Minimalist Dark */}
      <div className="relative z-10  text-gray-300 p-8 rounded-lg shadow-lg">
        <TextReveal>
          {`En`}
          {` CLEO`}
          {` no`}
          {` fabricamos`}
          {<span className="font-extrabold text-white ">tendencias,</span>}
          {` las `}
          <span className="relative font-black bg-gradient-to-r from-gray-700 via-gray-500 to-gray-300 bg-clip-text text-transparent">
            provocamos
          </span>
        </TextReveal>
      </div>
    </div>
  );
}

// import { TextReveal } from "./magicui/text-reveal";

// export function ProductsTextReveal() {
//   return (
//     <div className="relative w-full min-h-screen flex items-center justify-center">
//       {/* TextReveal Component - positioned relative for proper scroll functionality */}
//       <div className="relative z-10">
//         <TextReveal>
//           {`En CLEO `}
//           {`no fabricamos `}
//           {<span className="font-extrabold">tendencias</span>}
//           {`las `}
//           <span className="relative font-black glitch-text bg-gradient-to-br from-[#7c095d] via-indigo-900 to-gray-500 bg-clip-text text-transparent">
//             <span
//               aria-hidden
//               className="absolute inset-0 glitch-layer -translate-x-0.5 -translate-y-0.5 text-white opacity-60 pointer-events-none select-none"
//             >
//               provocamos
//             </span>
//             <span
//               aria-hidden
//               className="absolute inset-0 glitch-layer translate-x-0.5 translate-y-0.5 text-[#7c095d] opacity-60 pointer-events-none select-none"
//             >
//               provocamos
//             </span>
//             <span className="relative">provocamos</span>
//           </span>
//         </TextReveal>
//       </div>
//     </div>
//   );
// }
