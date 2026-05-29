import { motion } from "framer-motion";

/**
 * More anatomically detailed ant: three segments (gaster, thorax, head),
 * narrow petiole, six jointed legs, curved antennae and mandibles.
 * Drawn facing right; flip via scaleX(-1) when walking left.
 */
const AntSVG = ({ size = 14, flip = false }: { size?: number; flip?: boolean }) => (
  <svg
    width={size}
    height={size * (26 / 36)}
    viewBox="0 0 36 26"
    fill="none"
    style={{ transform: flip ? "scaleX(-1)" : undefined, display: "block" }}
  >
    {/* Subtle ground shadow */}
    <ellipse cx="18" cy="22.5" rx="11" ry="1.2" fill="currentColor" opacity="0.12" />

    {/* Back legs */}
    <path d="M11 14 L7 17 L5 21" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    <path d="M11 14 L9 18 L11 22" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    {/* Middle legs */}
    <path d="M17 12.5 L15 16 L13 21" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    <path d="M17 12.5 L18 16 L19 21" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    {/* Front legs */}
    <path d="M22 11.5 L23 15 L22 20" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    <path d="M22 11.5 L25 14 L28 17" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" />

    {/* Gaster (rear abdomen) */}
    <ellipse cx="7" cy="13" rx="5.2" ry="3.6" fill="currentColor" />
    {/* Gaster highlight */}
    <ellipse cx="5.5" cy="11.8" rx="2.2" ry="1.1" fill="currentColor" opacity="0.35" />

    {/* Petiole (narrow waist) */}
    <ellipse cx="12.5" cy="13" rx="1.4" ry="0.9" fill="currentColor" />

    {/* Thorax (mesosoma) */}
    <ellipse cx="17.5" cy="12" rx="3.6" ry="2.6" fill="currentColor" />
    <ellipse cx="16.8" cy="11.2" rx="1.6" ry="0.8" fill="currentColor" opacity="0.35" />

    {/* Head */}
    <ellipse cx="23.5" cy="11" rx="3.2" ry="3" fill="currentColor" />
    {/* Eye */}
    <circle cx="25" cy="10.2" r="0.7" fill="hsl(var(--background))" opacity="0.9" />

    {/* Mandibles */}
    <path d="M26.5 11.5 Q28.5 12.5 28.2 14" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
    <path d="M26.8 10.8 Q29 11 29.5 12.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />

    {/* Antennae (elbowed) */}
    <path d="M25 9 Q27 6 29 5.5 L32 3.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    <path d="M24.2 8.6 Q25.5 6 27.5 5 L30 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    <circle cx="32" cy="3.5" r="0.55" fill="currentColor" />
    <circle cx="30" cy="3" r="0.55" fill="currentColor" />
  </svg>
);

interface AntPath {
  id: number;
  duration: number;
  delay: number;
  size: number;
  flip: boolean;
  path: { x: string[]; y: string[] };
  wiggle?: number;
}

const antPaths: AntPath[] = [
  {
    id: 1,
    duration: 9,
    delay: 0,
    size: 16,
    flip: false,
    path: {
      x: ["-5%", "15%", "35%", "55%", "75%", "105%"],
      y: ["48%", "42%", "50%", "44%", "46%", "52%"],
    },
  },
  {
    id: 2,
    duration: 11,
    delay: 2,
    size: 13,
    flip: true,
    path: {
      x: ["105%", "85%", "60%", "40%", "20%", "-5%"],
      y: ["55%", "60%", "52%", "58%", "54%", "50%"],
    },
  },
  {
    id: 3,
    duration: 13,
    delay: 4,
    size: 18,
    flip: false,
    path: {
      x: ["-5%", "10%", "30%", "50%", "70%", "90%", "105%"],
      y: ["32%", "38%", "34%", "40%", "36%", "42%", "38%"],
    },
  },
  {
    id: 4,
    duration: 10,
    delay: 6,
    size: 11,
    flip: false,
    path: {
      x: ["-5%", "20%", "45%", "65%", "85%", "105%"],
      y: ["66%", "60%", "64%", "58%", "62%", "56%"],
    },
  },
  {
    id: 5,
    duration: 12,
    delay: 3,
    size: 14,
    flip: true,
    path: {
      x: ["105%", "80%", "55%", "30%", "10%", "-5%"],
      y: ["38%", "34%", "42%", "36%", "40%", "34%"],
    },
  },
  {
    id: 6,
    duration: 14,
    delay: 1,
    size: 12,
    flip: false,
    path: {
      x: ["-5%", "25%", "50%", "75%", "105%"],
      y: ["72%", "68%", "74%", "70%", "66%"],
    },
  },
  {
    id: 7,
    duration: 11,
    delay: 5,
    size: 15,
    flip: true,
    path: {
      x: ["105%", "78%", "52%", "28%", "-5%"],
      y: ["25%", "30%", "26%", "32%", "28%"],
    },
  },
];

const AntAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {antPaths.map((ant) => (
        <motion.div
          key={ant.id}
          className="absolute text-primary/70"
          initial={{ left: ant.path.x[0], top: ant.path.y[0], opacity: 0 }}
          animate={{
            left: ant.path.x,
            top: ant.path.y,
            opacity: [0, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: ant.duration,
            delay: ant.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "linear",
          }}
        >
          {/* Body wiggle for a more lifelike crawl */}
          <motion.div
            animate={{ rotate: [-3, 3, -2, 2, -3], y: [0, -0.5, 0, 0.5, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ filter: "drop-shadow(0 1px 0.5px rgba(0,0,0,0.25))" }}
          >
            <AntSVG size={ant.size} flip={ant.flip} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default AntAnimation;
