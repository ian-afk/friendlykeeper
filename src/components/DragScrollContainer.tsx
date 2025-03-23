import { useRef, useState } from "react";

interface DragScrollContainerProps {
  children: React.ReactNode;
}

const DragScrollContainer = ({ children }: DragScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    // containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust speed
    containerRef.current.scrollLeft -= walk;
    setStartX(e.pageX - containerRef.current.offsetLeft); // Update startX to prevent jitter
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      //   containerRef.current.style.cursor = "grab";
    }
  };

  return (
    <div
      ref={containerRef}
      className="overflow-x-scroll whitespace-nowrap"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stops dragging if mouse leaves the div
      style={{
        display: "flex",
        gap: "24px",
        width: "97vw",
        height: "90vh",
        scrollbarWidth: "thin",
        scrollbarColor: "#ccc transparent",
      }}
    >
      {children}
    </div>
  );
};

export default DragScrollContainer;
