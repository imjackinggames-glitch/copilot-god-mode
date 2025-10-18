import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative overflow-hidden rounded-lg border-2 bg-card p-6 shadow-lg"
      style={{ borderColor: color }}
    >
      {/* Icon */}
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
        style={{ backgroundColor: color + '20' }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">
        {title}
      </h3>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend.isPositive ? 'text-accent' : 'text-destructive'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            `radial-gradient(circle at 0% 0%, ${color} 0%, transparent 50%)`,
            `radial-gradient(circle at 100% 100%, ${color} 0%, transparent 50%)`,
            `radial-gradient(circle at 0% 0%, ${color} 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
