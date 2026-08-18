// Lazy image wrapper: defer image loading and provide a blur transition for better perceived performance.
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Forward image attributes while enabling lazy loading and the blur effect from the dependency.
export default function LazyImage({ src, alt, className = "", ...props }) {
  // Keep image rendering declarative so every product image gets the same performance behavior.
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      className={className}
      loading="lazy"
      {...props}
    />
  );
}