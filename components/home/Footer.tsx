export default function Footer() {
  return (
    <footer className="bg-white text-black pt-24 pb-12 px-4 md:px-12 border-t border-black">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-display text-5xl mb-8">
            UNÍTE A LA CULTURA <strong>STREET ROCK</strong>{" "}
          </h4>
          <div className="flex gap-0 border-b border-black pb-2">
            <input
              type="email"
              placeholder="DIRECCIÓN DE EMAIL"
              className="bg-transparent border-none outline-none w-full font-mono text-lg placeholder:text-black/50"
            />
            <button className="font-mono uppercase hover:opacity-50">
              SUBSCRIBÍTE
            </button>
          </div>
        </div>

        <div>
          <h5 className="font-mono font-bold mb-6">SITEMAP</h5>
          <ul className="space-y-2 font-sans text-sm">
            <li>
              <a href="#" className="hover:underline">
                Ver todo
              </a>
            </li>
            <li>
              <a href="#latest-arrivals" className="hover:underline">
                Colecciones
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-mono font-bold mb-6">LEGAL</h5>
          <ul className="space-y-2 font-sans text-sm">
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shipping & Returns
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end border-t border-black/10 pt-8">
        <h2 className="font-display text-[15vw] leading-none opacity-10 select-none pointer-events-none">
          RESOLV
        </h2>
        <div className="font-mono text-xs mt-4 md:mt-0">
          © 2025 RESOLV STUDIOS.
        </div>
      </div>
    </footer>
  );
}
