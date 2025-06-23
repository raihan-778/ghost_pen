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

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative group bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-slate-900/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-purple-500/40 hover:shadow-2xl hover:border-purple-400/60",
        className
      )}
      {...props}
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/0 via-purple-600/100 to-cyan-500/0 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 animate-pulse" />

      {/* Moving gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-gradient-xy" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.3) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 h-full">{props.children}</div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-purple-400/50 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-400/50 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col space-y-2 p-8 pb-6 relative", className)}
      {...props}
    >
      {/* Header accent line */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {props.children}
    </div>
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-2xl font-bold leading-tight tracking-tight text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-cyan-300 group-hover:bg-clip-text transition-all duration-500 drop-shadow-sm",
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
        "text-sm text-gray-300 group-hover:text-gray-100 transition-all duration-500 leading-relaxed font-normal",
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
        "flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-white transition-all duration-300 cursor-pointer group/action relative overflow-hidden px-3 py-1.5 rounded-lg hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-500/25",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/50 to-purple-600/0 -translate-x-full group-hover/action:translate-x-full transition-transform duration-500" />
      <span className="relative z-10">{props.children}</span>
    </div>
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "p-8 pt-6 text-gray-200 group-hover:text-gray-50 transition-all duration-500 relative",
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
      {/* Footer accent line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {props.children}
    </div>
  );
}

// Delete Button Component
// function CardDeleteButton({ className, ...props }: React.ComponentProps<"button">) {
//   return (
//     <button
//       className={cn(
//         "group/delete relative overflow-hidden p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-400/60 text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-400/50",
//         className
//       )}>
//       {...props}
//     </button>
//       {/* Subtle glow effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 opacity-0 group-hover/delete:opacity-100 transition-opacity duration-300 rounded-xl" />

{
  /* Icon container */
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
