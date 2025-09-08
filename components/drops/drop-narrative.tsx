export function DropNarrative() {
  const fullDescription =
    "El Drop Shato #3 nace de las calles nocturnas de la ciudad, donde cada esquina cuenta una historia y cada sombra esconde un secreto. Hemos capturado esa esencia raw y la hemos transformado en piezas que hablan por sí solas.";
  return (
    <section
      id="narrative-section"
      className="w-full py-20 md:py-32 bg-dark-900"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Inspirado en la
                <span className="text-gray-400"> Autenticidad Urbana</span>
              </h2>
              <div className="w-24 h-1 bg-white" />
            </div>

            <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
              <p>{fullDescription}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Material Premium</h4>
                <p className="text-gray-400 text-sm">100% Algodón Orgánico</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Edición Limitada</h4>
                <p className="text-gray-400 text-sm">Solo n Unidades</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Diseño Exclusivo</h4>
                <p className="text-gray-400 text-sm">Colaboración Artística</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Proceso Artesanal</h4>
                <p className="text-gray-400 text-sm">72h de Tratamiento</p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-white/10 to-gray-300/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-3xl p-8 backdrop-blur-sm border border-gray-700/30">
                <img
                  src="/premium-black-hoodie-streetwear-drop-exclusive.jpg"
                  alt="Drop Shato #3 Detail"
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
                <div className="absolute inset-8 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                <div className="absolute bottom-12 left-12 text-white">
                  <p className="text-sm font-medium">Shato #3</p>
                  <p className="text-xs text-gray-300">Premium Collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
