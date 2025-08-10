import { TextReveal } from "./magicui/text-reveal";

export function ProductsTextReveal() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      {/* TextReveal Component - positioned relative for proper scroll functionality */}
      <div className="relative z-10">
        <TextReveal>
          {`Products, where `}
          {<span className="underline-on-scroll">street</span>}
          {` meets `}
          {<span className="underline-on-scroll">rock</span>}
        </TextReveal>
      </div>

      {/* Add underline animation on scroll */}
      <style jsx>{`
        .underline-on-scroll {
          position: relative;
          display: inline-block;
        }

        .underline-on-scroll::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease-out;
        }

        .underline-on-scroll.in-view::after {
          transform: scaleX(1);
        }
      `}</style>

      <script>
        {`
          document.addEventListener('scroll', () => {
            const elements = document.querySelectorAll('.underline-on-scroll');
            elements.forEach((el) => {
              const rect = el.getBoundingClientRect();
              if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                el.classList.add('in-view');
              } else {
                el.classList.remove('in-view');
              }
            });
          });
        `}
      </script>
    </div>
  );
}
