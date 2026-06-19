import { useEffect, useState } from "react";

/** Brief, smooth intro loader: brand logo over black + a single fluid gold fill. */
const Loader = () => {
  const [fill, setFill] = useState(false);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setFill(true)); // start the fill transition
    const t1 = window.setTimeout(() => setDone(true), 1300); // fade out
    const t2 = window.setTimeout(() => setRemoved(true), 2000); // unmount
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`loader ${done ? "is-done" : ""}`} style={{ background: "#000" }} aria-hidden="true">
      <img
        src="/images/logo.png"
        alt=""
        className="w-56 md:w-72 max-w-[70vw] select-none"
        style={{ animation: "logo-in 1s cubic-bezier(0.16,1,0.3,1) both" }}
      />
      <div className="loader-bar">
        <span
          style={{
            width: fill ? "100%" : "0%",
            transition: "width 1.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
