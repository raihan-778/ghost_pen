"use client";

import { AlertTriangle, Shield, Trash2, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

// Base primitive components that handle the actual dialog logic
const AlertDialogPrimitive = {
  Root: ({
    children,
    open,
    onOpenChange,
  }: {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }) => {
    return (
      <AlertDialogContext.Provider
        value={{ open: open || false, onOpenChange }}
      >
        {children}
      </AlertDialogContext.Provider>
    );
  },
  Trigger: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  }) => {
    const context = React.useContext(AlertDialogContext);
    return (
      <button
        {...props}
        onClick={(e) => {
          props.onClick?.(e);
          context.onOpenChange?.(true);
        }}
      >
        {children}
      </button>
    );
  },
  Portal: ({ children }: { children: React.ReactNode }) => {
    const context = React.useContext(AlertDialogContext);
    if (!context.open) return null;
    return <>{children}</>;
  },
  Overlay: React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(({ className, ...props }, ref) => {
    const context = React.useContext(AlertDialogContext);
    return (
      <div
        ref={ref}
        className={className}
        onClick={() => context.onOpenChange?.(false)}
        {...props}
      />
    );
  }),
  Content: React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={className}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  )),
  Title: React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
  >(({ className, ...props }, ref) => (
    <h2 ref={ref} className={className} {...props} />
  )),
  Description: React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
  >(({ className, ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  )),
  Action: React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >(({ className, ...props }, ref) => (
    <button ref={ref} className={className} {...props} />
  )),
  Cancel: React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >(({ className, ...props }, ref) => {
    const context = React.useContext(AlertDialogContext);
    return (
      <button
        ref={ref}
        className={className}
        onClick={(e) => {
          props.onClick?.(e);
          context.onOpenChange?.(false);
        }}
        {...props}
      />
    );
  }),
};

// Context for managing dialog state
const AlertDialogContext = React.createContext<{
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}>({ open: false });

// Button variants helper
const buttonVariants = (props?: {
  variant?: "destructive" | "outline" | "default";
}) => {
  const variant = props?.variant || "default";
  const variants = {
    default:
      "bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 hover:from-purple-600 hover:via-purple-700 hover:to-pink-700 text-white",
    destructive:
      "bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 text-white",
    outline:
      "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-gray-200 border border-slate-600/50",
  };
  return `px-4 py-3 font-semibold rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${variants[variant]}`;
};

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  const stars = [
    {
      top: "25%",
      left: "25%",
      size: "w-1 h-1",
      color: "bg-white",
      delay: "0s",
    },
    {
      top: "33%",
      right: "33%",
      size: "w-0.5 h-0.5",
      color: "bg-purple-300",
      delay: "1s",
    },
    {
      bottom: "25%",
      left: "33%",
      size: "w-1 h-1",
      color: "bg-pink-300",
      delay: "2s",
    },
    {
      top: "66%",
      right: "25%",
      size: "w-0.5 h-0.5",
      color: "bg-blue-300",
      delay: "0.5s",
    },
  ];

  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-gradient-to-br from-indigo-950/80 via-purple-950/80 to-violet-950/80 backdrop-blur-sm animate-in fade-in-0 duration-300",
        className
      )}
      {...props}
    >
      {/* Animated background stars */}
      <div className="absolute inset-0 opacity-30">
        {stars.map((star, index) => (
          <div
            key={index}
            className={`absolute ${star.size} ${star.color} rounded-full animate-pulse`}
            style={{
              top: star.top,
              bottom: star.bottom,
              left: star.left,
              right: star.right,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
    </AlertDialogPrimitive.Overlay>
  );
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "fixed top-[50%] left-[25%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] animate-in zoom-in-95 duration-300 mx-4",
          "relative bg-gradient-to-br from-slate-900/95 via-purple-950/95 to-indigo-950/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-800/30",
          className
        )}
        {...props}
      >
        {/* Animated gradient border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl opacity-20 animate-pulse" />

        <div className="relative bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 rounded-3xl">
          {props.children}
        </div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("relative overflow-hidden rounded-t-3xl", className)}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-pink-500/10" />
      <div className="relative p-6 pb-4">{props.children}</div>
    </div>
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn("px-6 pb-6", className)}
      {...props}
    >
      <div className="flex gap-3">{props.children}</div>
    </div>
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent text-center mb-2",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "bg-gradient-to-r from-red-950/50 via-purple-950/50 to-pink-950/50 border border-red-500/30 rounded-2xl p-4 mb-6 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-500/20 rounded-full">
          <Shield className="w-5 h-5 text-red-400 flex-shrink-0" />
        </div>
        <div className="text-sm text-purple-200 leading-relaxed">
          {props.children}
        </div>
      </div>
    </AlertDialogPrimitive.Description>
  );
}

function AlertDialogAction({
  className,
  variant = "destructive",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> & {
  variant?: "destructive" | "default";
}) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(
        buttonVariants({ variant }),
        "flex-1 flex items-center justify-center gap-2 shadow-lg",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(
        buttonVariants({ variant: "outline" }),
        "flex-1",
        className
      )}
      {...props}
    />
  );
}

// Enhanced Icon Component
interface AlertIconProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "warning" | "danger";
}

const AlertIcon: React.FC<AlertIconProps> = ({
  variant = "warning",
  className = "",
  ...props
}) => {
  const variants = {
    warning: {
      icon: AlertTriangle,
      gradient: "from-red-500 via-red-600 to-pink-600",
      pingColor: "from-red-400 to-pink-500",
    },
    danger: {
      icon: Trash2,
      gradient: "from-red-600 via-red-700 to-red-800",
      pingColor: "from-red-500 to-red-600",
    },
  };

  const { icon: Icon, gradient, pingColor } = variants[variant];

  return (
    <div
      className={cn(
        `flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${gradient} rounded-full shadow-lg relative`,
        className
      )}
      {...props}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${pingColor} rounded-full animate-ping opacity-30`}
      />
      <Icon className="w-10 h-10 text-white relative z-10" />
    </div>
  );
};

// Close Button Component
interface AlertDialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClose?: () => void;
}

const AlertDialogClose: React.FC<AlertDialogCloseProps> = ({
  onClose,
  className = "",
  ...props
}) => {
  const context = React.useContext(AlertDialogContext);

  return (
    <button
      onClick={(e) => {
        props.onClick?.(e);
        onClose?.();
        context.onOpenChange?.(false);
      }}
      className={cn(
        "absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all duration-200 text-gray-400 hover:text-white z-10",
        className
      )}
      {...props}
    >
      <X className="w-4 h-4" />
    </button>
  );
};

// Example usage component
interface MessageDeleteDialogProps {
  message: {
    _id: string;
    content?: string;
  };
  onMessageDelete: (messageId: string) => void;
}

const MessageDeleteDialog: React.FC<MessageDeleteDialogProps> = ({
  message,
  onMessageDelete,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onMessageDelete(message._id);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete message:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogClose />
        <AlertDialogHeader>
          <AlertIcon variant="danger" />
          <AlertDialogTitle>Delete Message</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this message? This action cannot be
            undone and will permanently remove the message from the
            conversation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertIcon,
  MessageDeleteDialog,
};

// Export types for external use
export type { AlertDialogCloseProps, AlertIconProps, MessageDeleteDialogProps };
