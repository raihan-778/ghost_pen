// import * as React from "react";

// import { cn } from "@/lib/utils";

// function Card({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card"
//       className={cn(
//         "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-header"
//       className={cn(
//         "@container/card-header text-green-500 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-title"
//       className={cn("leading-none font-semibold", className)}
//       {...props}
//     />
//   );
// }

// function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-description"
//       className={cn("text-muted-foreground text-sm", className)}
//       {...props}
//     />
//   );
// }

// function CardAction({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-action"
//       className={cn(
//         "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// function CardContent({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-content"
//       className={cn("px-6", className)}
//       {...props}
//     />
//   );
// }

// function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-footer"
//       className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
//       {...props}
//     />
//   );
// }

import { cn } from "@/lib/utils";
import * as React from "react";

// Enhanced Card Components with Premium Design
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative group bg-gradient-to-br from-slate-900/95 via-purple-900/25 to-slate-800/90 backdrop-blur-2xl border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 hover:scale-[1.03] hover:shadow-purple-500/30 hover:shadow-3xl hover:border-purple-400/70 hover:-translate-y-2",
        className
      )}
      {...props}
    >
      {/* Enhanced animated border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/0 via-purple-500/80 to-cyan-400/60 opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-700 animate-pulse" />

      {/* Aurora-like moving background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-pink-500/15 to-cyan-400/15 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>

      {/* Premium glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      {/* Dynamic grid pattern */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-500">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.4) 1px, transparent 0),
              radial-gradient(circle at 18px 18px, rgba(236, 72, 153, 0.3) 1px, transparent 0)
            `,
            backgroundSize: "20px 20px, 40px 40px",
          }}
        />
      </div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content container with inner glow */}
      <div className="relative z-10 h-full bg-gradient-to-br from-black/20 via-transparent to-purple-900/10 group-hover:from-black/10 group-hover:to-purple-900/20 transition-all duration-700">
        {props.children}
      </div>

      {/* Enhanced corner accents with glow */}
      <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-purple-300/60 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-purple-400/25" />
      <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-cyan-300/60 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-cyan-400/25" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-cyan-300/60 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-cyan-400/25" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-purple-300/60 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-purple-400/25" />

      {/* Top highlight line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col space-y-3 p-8 pb-6 relative", className)}
      {...props}
    >
      {/* Premium header accent with glow */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-400/70 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 shadow-sm shadow-purple-400/50" />
      {props.children}
    </div>
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-2xl font-bold leading-tight tracking-tight text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-cyan-200 group-hover:bg-clip-text transition-all duration-500 drop-shadow-lg filter",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-base text-gray-200 group-hover:text-gray-50 transition-all duration-500 leading-relaxed font-normal drop-shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-sm font-bold text-purple-300 hover:text-white transition-all duration-300 cursor-pointer group/action relative overflow-hidden px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:shadow-lg hover:shadow-purple-500/30 border border-purple-400/30 hover:border-purple-300/60 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/40 to-pink-600/0 -translate-x-full group-hover/action:translate-x-full transition-transform duration-700" />
      <span className="relative z-10 drop-shadow-sm">{props.children}</span>
    </div>
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "p-8 pt-6 text-gray-100 group-hover:text-gray-50 transition-all duration-500 relative leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center p-8 pt-6 relative", className)}
      {...props}
    >
      {/* Premium footer accent with glow */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 shadow-sm shadow-cyan-400/50" />
      {props.children}
    </div>
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
