// AnimatedComponent.jsx
import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedComponentProps {
  children: ReactNode;
}

const Popup = ({ children }: AnimatedComponentProps) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          // Trigger your animation here
          gsap
            .timeline({
              defaults: { ease: "power2.inOut", duration: 0.1 },
            })
            // Move the element down and scale down for the hiding effect
            .to(elementRef.current, {
              translateY: 50,
              translateX: 50,
              rotate:50,
              yoyo: true,
              repeat:-1,
            });
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    }); // Adjust this value to control when the animation triggers
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
      style={{}} // Initial styles
    >
      {children}
    </div>
  );
};

export default Popup;
