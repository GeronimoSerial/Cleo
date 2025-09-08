"use client";

import { useState } from "react";
import RowsPhotoAlbum from "react-photo-album";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import LightBox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const lookbookImages = [
  {
    id: 1,
    src: "/premium-black-hoodie-streetwear-drop-exclusive.jpg",
    alt: "Shato #3 - Front View",
    category: "Front",
    width: 1200,
    height: 1600,
  },
  {
    id: 2,
    src: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    alt: "Shato #3 - Back Detail",
    category: "Back",
    width: 1200,
    height: 800,
  },
  {
    id: 3,
    src: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    alt: "Shato #3 - Lifestyle",
    category: "Lifestyle",
    width: 1200,
    height: 1600,
  },
  {
    id: 4,
    src: "/premium-black-hoodie-streetwear-drop-exclusive.jpg",
    alt: "Shato #3 - Detail Shot",
    category: "Details",
    width: 1200,
    height: 1600,
  },
  {
    id: 5,
    src: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    alt: "Shato #3 - Street Style",
    category: "Street",
    width: 1200,
    height: 1600,
  },
  {
    id: 6,
    src: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    alt: "Shato #3 - Close Up",
    category: "Close Up",
    width: 1200,
    height: 1600,
  },
];

export function DropLookbook() {
  const [index, setIndex] = useState(-1);

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Lookbook
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cada ángulo cuenta una historia. Descubre la versatilidad y el
            carácter único del Drop Shato #3 a través de nuestra galería
            exclusiva.
          </p>
        </div>
        {/* Photo Album */}
        <RowsPhotoAlbum
          photos={lookbookImages}
          layout="masonry"
          onClick={({ index }) => setIndex(index)}
        />
        <LightBox
          slides={lookbookImages}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          thumbnails={{ position: "bottom" }}
        />
      </div>
    </section>
  );
}
