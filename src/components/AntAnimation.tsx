import { motion } from "framer-motion";

const AntSVG = ({ size = 14, flip = false }: { size?: number; flip?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ transform: flip ? "scaleX(-1)" : undefined }}
  >
    {/* Body segments */}
    <ellipse cx="7" cy="13" rx="3.5" ry="2.5" />
    <ellipse cx="13" cy="12" rx="2.5" ry="2" />
    <ellipse cx="18" cy="11" rx="2.2" ry="1.8" />
    {/* Head */}
    <circle cx="21" cy="10" r="2" />
    {/* Antennae */}
    <line x1="22" y1="9" x2="24" y2="5" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <line x1="21" y1="8.5" x2="23.5" y2="6.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
    {/* Legs */}
    <line x1="8" y1="15" x2="6" y2="19" stroke="currentColor" strokeWidth="0.7" />
    <line x1="10" y1="14.5" x2="9" y2="19" stroke="currentColor" strokeWidth="0.7" />
    <line x1="12" y1="14" x2="12" y2="18.5" stroke="currentColor" strokeWidth="0.7" />
    <line x1="14" y1="13.5" x2="15" y2="18" stroke="currentColor" strokeWidth="0.7" />
    <line x1="16" y1="13" x2="18" y2="17" stroke="currentColor" strokeWidth="0.7" />
    <line x1="18" y1="12.5" x2="20.5" y2="16" stroke="currentColor" strokeWidth="0.7" />
  </svg>
);

interface AntPath {
  id: number;
  duration: number;
  delay: number;
  size: number;
  flip: boolean;
  path: { x: string[]; y: string[] };
  opacity?: number;
}

const antPaths: AntPath[] = [
  {
    id: 1,
    duration: 8,
    delay: 0,
    size: 12,
    flip: false,
    path: {
      x: ["-5%", "15%", "35%", "55%", "75%", "105%"],
      y: ["48%", "42%", "50%", "44%", "46%", "52%"],
    },
  },
  {
    id: 2,
    duration: 10,
    delay: 2,
    size: 10,
    flip: true,
    path: {
      x: ["105%", "85%", "60%", "40%", "20%", "-5%"],
      y: ["55%", "60%", "52%", "58%", "54%", "50%"],
    },
  },
  {
    id: 3,
    duration: 12,
    delay: 4,
    size: 14,
    flip: false,
    path: {
      x: ["-5%", "10%", "30%", "50%", "70%", "90%", "105%"],
      y: ["35%", "40%", "36%", "42%", "38%", "44%", "40%"],
    },
  },
  {
    id: 4,
    duration: 9,
    delay: 6,
    size: 9,
    flip: false,
    path: {
      x: ["-5%", "20%", "45%", "65%", "105%"],
      y: ["62%", "58%", "64%", "60%", "56%"],
    },
  },
  {
    id: 5,
    duration: 11,
    delay: 3,
    size: 11,
    flip: true,
    path: {
      x: ["105%", "80%", "55%", "30%", "10%", "-5%"],
      y: ["40%", "36%", "44%", "38%", "42%", "36%"],
    },
  },
];

const AntAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {antPaths.map((ant) => (
        <motion.div
          key={ant.id}
          className="absolute text-primary/40"
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
            repeatDelay: 2,
            ease: "linear",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 2, -2, 1, -1, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <AntSVG size={ant.size} flip={ant.flip} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default AntAnimation;
