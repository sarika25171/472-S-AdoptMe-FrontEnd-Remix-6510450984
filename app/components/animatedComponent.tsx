// AnimatedComponent.jsx
import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedComponentProps {
  children: ReactNode;
}

const AnimatedComponent = ({children}:AnimatedComponentProps) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries:any) => {
      entries.forEach((entry:any) => {
        if (entry.isIntersecting) {
          // Trigger your animation here
          gsap.to(elementRef.current, {opacity: 1, y: 0, duration: 1, ease: "power2.out"}); // Adjust the duration, ease, and delay as needed
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {threshold: 0.1,}); // Adjust this value to control when the animation triggers

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      style={{ opacity: 0.1, transform: "translateY(50px)" }} // Initial styles
    >
      {children}
    </div>
  );
};

export default AnimatedComponent;
