import { motion } from "framer-motion";

const AntSVG = ({ size = 14, flip = false }: { size?: number; flip?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 24"
    fill="currentColor"
    style={{ transform: flip ? "scaleX(-1)" : undefined }}
  >
    {/* Abdomen */}
    <ellipse cx="6" cy="13" rx="4" ry="3" />
    <ellipse cx="6" cy="13" rx="3.2" ry="2.2" fill="currentColor" opacity="0.7" />
    {/* Thorax */}
    <ellipse cx="12.5" cy="11.5" rx="2.8" ry="2.2" />
    {/* Petiole (narrow waist) */}
    <ellipse cx="9.5" cy="12.5" rx="1.2" ry="1" />
    {/* Head */}
    <ellipse cx="17.5" cy="10.5" rx="2.5" ry="2.2" />
    {/* Mandibles */}
    <path d="M19.5 11.5 Q21 13 20 14" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <path d="M19.8 10.8 Q21.5 11.5 21 13" stroke="currentColor" strokeWidth="0.6" fill="none" />
    {/* Eyes */}
    <circle cx="18.5" cy="9.8" r="0.6" fill="hsl(var(--background))" opacity="0.8" />
    {/* Antennae */}
    <path d="M18.5 9 Q20 6 22 4.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
    <path d="M17.8 8.8 Q19 6.5 21 5.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
    {/* Antenna tips */}
    <circle cx="22" cy="4.5" r="0.5" />
    <circle cx="21" cy="5.5" r="0.5" />
    {/* Front legs */}
    <path d="M16 12.5 Q17 15 18.5 17" stroke="currentColor" strokeWidth="0.7" fill="none" />
    <path d="M15 12.5 Q15.5 15.5 16.5 17.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
    {/* Middle legs */}
    <path d="M12 13.5 Q12.5 16 13.5 18" stroke="currentColor" strokeWidth="0.7" fill="none" />
    <path d="M10.5 13.5 Q10 16 9.5 18.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
    {/* Back legs */}
    <path d="M7.5 15 Q6.5 17.5 5.5 19" stroke="currentColor" strokeWidth="0.7" fill="none" />
    <path d="M5.5 15 Q4 17 3 19.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
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
