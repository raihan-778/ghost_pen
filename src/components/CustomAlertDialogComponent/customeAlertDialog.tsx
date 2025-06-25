import React, { useState } from "react";
import { AlertTriangle, Trash2, X, Shield } from "lucide-react";

// Enhanced AlertDialog Components with GhostPen Theme
const AlertDialog = ({ children, open, onOpenChange }) => {
  return (
    <>
      {children}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => onOpenChange?.(false)}
          />
          <div className="relative z-50">
            {React.Children.map(children, (child) =>
              child.type?.displayName === "AlertDialogContent" ? child : null
            )}
          </div>
        </div>
      )}
    </>
  );
};

const AlertDialogTrigger = ({ children, asChild, ...props }) => {
  return React.cloneElement(children, {
    ...props,
    ...children.props,
  });
};
AlertDialogTrigger.displayName = "AlertDialogTrigger";

const AlertDialogContent = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`relative bg-gradient-to-br from-slate-900/95 via-purple-950/95 to-indigo-950/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-300 border border-purple-800/30 ${className}`}
      {...props}
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl opacity-20 animate-pulse" />

      <div className="relative bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 rounded-3xl">
        {children}
      </div>
    </div>
  );
};
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-t-3xl ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-pink-500/10" />
      <div className="relative p-6 pb-4">{children}</div>
    </div>
  );
};
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogTitle = ({ children, className = "", ...props }) => {
  return (
    <h2
      className={`text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent text-center mb-2 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-gradient-to-r from-red-950/50 via-purple-950/50 to-pink-950/50 border border-red-500/30 rounded-2xl p-4 mb-6 backdrop-blur-sm ${className}`}
      {...props}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-500/20 rounded-full">
          <Shield className="w-5 h-5 text-red-400 flex-shrink-0" />
        </div>
        <div className="text-sm text-purple-200 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogFooter = ({ children, className = "", ...props }) => {
  return (
    <div className={`px-6 pb-6 ${className}`} {...props}>
      <div className="flex gap-3">{children}</div>
    </div>
  );
};
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogCancel = ({ children, className = "", onClick, ...props }) => {
  return (
    <button
      className={`flex-1 px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-gray-200 font-semibold rounded-2xl transition-all duration-300 hover:scale-105 border border-slate-600/50 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
AlertDialogCancel.displayName = "AlertDialogCancel";

const AlertDialogAction = ({
  children,
  className = "",
  variant = "destructive",
  loading = false,
  onClick,
  ...props
}) => {
  const variants = {
    destructive:
      "bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 border border-red-400/20 hover:shadow-red-500/25",
    default:
      "bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 hover:from-purple-600 hover:via-purple-700 hover:to-pink-700 border border-purple-400/20 hover:shadow-purple-500/25",
  };

  return (
    <button
      className={`flex-1 px-4 py-3 ${variants[variant]} text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 ${className}`}
      onClick={onClick}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};
AlertDialogAction.displayName = "AlertDialogAction";

// Enhanced Icon Component
const AlertIcon = ({ variant = "warning", className = "", ...props }) => {
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
      className={`flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${gradient} rounded-full shadow-lg relative ${className}`}
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
const AlertDialogClose = ({ onClose, className = "", ...props }) => {
  return (
    <button
      onClick={onClose}
      className={`absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all duration-200 text-gray-400 hover:text-white ${className}`}
      {...props}
    >
      <X className="w-4 h-4" />
    </button>
  );
};

// Background Component
const AlertDialogBackground = ({ children, className = "" }) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-950 flex items-center justify-center p-4 relative overflow-hidden ${className}`}
    >
      {/* Animated background stars */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div
          className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-300 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
      </div>
      {children}
    </div>
  );
};

// Demo Implementation
const AlertDialogDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsDeleting(false);
    setIsOpen(false);
    alert("Account deleted successfully!");
  };

  return (
    <AlertDialogBackground>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <button
            onClick={() => setIsOpen(true)}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 border border-red-400/20"
          >
            <Trash2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Delete Account
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogClose onClose={() => setIsOpen(false)} />
            <AlertIcon variant="warning" />
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <p className="text-sm text-purple-300 text-center font-medium">
              This action is irreversible
            </p>
          </AlertDialogHeader>

          <div className="px-6">
            <AlertDialogDescription>
              <div>
                <p className="text-sm font-semibold text-red-200 mb-2">
                  Are you absolutely sure?
                </p>
                <p>
                  This will permanently delete your account and remove all your
                  data from our servers. This action cannot be undone.
                </p>
              </div>
            </AlertDialogDescription>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              loading={isDeleting}
              onClick={handleDeleteConfirm}
            >
              {!isDeleting && <Trash2 className="w-4 h-4" />}
              {isDeleting ? "Deleting..." : "Delete Forever"}
            </AlertDialogAction>
          </AlertDialogFooter>

          <p className="text-xs text-purple-400 text-center pb-6 italic">
            All data will be permanently removed within 24 hours
          </p>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogBackground>
  );
};

export default AlertDialogDemo;

// Export individual components for reuse
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogClose,
  AlertIcon,
  AlertDialogBackground,
};

// ***
// // import React, { useState } from 'react';
// import { AlertTriangle, Trash2, X, Shield } from 'lucide-react';

// // Enhanced AlertDialog Components with GhostPen Theme
// const AlertDialog = ({ children, open, onOpenChange }) => {
//   return (
//     <>
//       {children}
//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
//             onClick={() => onOpenChange?.(false)}
//           />
//           <div className="relative z-50">
//             {React.Children.map(children, child =>
//               child.type?.displayName === 'AlertDialogContent' ? child : null
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const AlertDialogTrigger = ({ children, asChild, ...props }) => {
//   return React.cloneElement(children, {
//     ...props,
//     ...children.props
//   });
// };
// AlertDialogTrigger.displayName = 'AlertDialogTrigger';

// const AlertDialogContent = ({ children, className = '', ...props }) => {
//   return (
//     <div
//       className={`relative bg-gradient-to-br from-slate-900/95 via-purple-950/95 to-indigo-950/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-300 border border-purple-800/30 ${className}`}
//       {...props}
//     >
//       {/* Animated gradient border */}
//       <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl opacity-20 animate-pulse" />

//       <div className="relative bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 rounded-3xl">
//         {children}
//       </div>
//     </div>
//   );
// };
// AlertDialogContent.displayName = 'AlertDialogContent';

// const AlertDialogHeader = ({ children, className = '', ...props }) => {
//   return (
//     <div className={`relative overflow-hidden rounded-t-3xl ${className}`} {...props}>
//       <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-pink-500/10" />
//       <div className="relative p-6 pb-4">
//         {children}
//       </div>
//     </div>
//   );
// };
// AlertDialogHeader.displayName = 'AlertDialogHeader';

// const AlertDialogTitle = ({ children, className = '', ...props }) => {
//   return (
//     <h2
//       className={`text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent text-center mb-2 ${className}`}
//       {...props}
//     >
//       {children}
//     </h2>
//   );
// };
// AlertDialogTitle.displayName = 'AlertDialogTitle';

// const AlertDialogDescription = ({ children, className = '', ...props }) => {
//   return (
//     <div className={`bg-gradient-to-r from-red-950/50 via-purple-950/50 to-pink-950/50 border border-red-500/30 rounded-2xl p-4 mb-6 backdrop-blur-sm ${className}`} {...props}>
//       <div className="flex items-start gap-3">
//         <div className="p-2 bg-red-500/20 rounded-full">
//           <Shield className="w-5 h-5 text-red-400 flex-shrink-0" />
//         </div>
//         <div className="text-sm text-purple-200 leading-relaxed">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };
// AlertDialogDescription.displayName = 'AlertDialogDescription';

// const AlertDialogFooter = ({ children, className = '', ...props }) => {
//   return (
//     <div className={`px-6 pb-6 ${className}`} {...props}>
//       <div className="flex gap-3">
//         {children}
//       </div>
//     </div>
//   );
// };
// AlertDialogFooter.displayName = 'AlertDialogFooter';

// const AlertDialogCancel = ({ children, className = '', onClick, ...props }) => {
//   return (
//     <button
//       className={`flex-1 px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-gray-200 font-semibold rounded-2xl transition-all duration-300 hover:scale-105 border border-slate-600/50 ${className}`}
//       onClick={onClick}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };
// AlertDialogCancel.displayName = 'AlertDialogCancel';

// const AlertDialogAction = ({ children, className = '', variant = 'destructive', loading = false, onClick, ...props }) => {
//   const variants = {
//     destructive: 'bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 border border-red-400/20 hover:shadow-red-500/25',
//     default: 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 hover:from-purple-600 hover:via-purple-700 hover:to-pink-700 border border-purple-400/20 hover:shadow-purple-500/25'
//   };

//   return (
//     <button
//       className={`flex-1 px-4 py-3 ${variants[variant]} text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 ${className}`}
//       onClick={onClick}
//       disabled={loading}
//       {...props}
//     >
//       {loading ? (
//         <>
//           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//           Loading...
//         </>
//       ) : (
//         children
//       )}
//     </button>
//   );
// };
// AlertDialogAction.displayName = 'AlertDialogAction';

// // Enhanced Icon Component
// const AlertIcon = ({ variant = 'warning', className = '', ...props }) => {
//   const variants = {
//     warning: {
//       icon: AlertTriangle,
//       gradient: 'from-red-500 via-red-600 to-pink-600',
//       pingColor: 'from-red-400 to-pink-500'
//     },
//     danger: {
//       icon: Trash2,
//       gradient: 'from-red-600 via-red-700 to-red-800',
//       pingColor: 'from-red-500 to-red-600'
//     }
//   };

//   const { icon: Icon, gradient, pingColor } = variants[variant];

//   return (
//     <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${gradient} rounded-full shadow-lg relative ${className}`} {...props}>
//       <div className={`absolute inset-0 bg-gradient-to-br ${pingColor} rounded-full animate-ping opacity-30`} />
//       <Icon className="w-10 h-10 text-white relative z-10" />
//     </div>
//   );
// };

// // Close Button Component
// const AlertDialogClose = ({ onClose, className = '', ...props }) => {
//   return (
//     <button
//       onClick={onClose}
//       className={`absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all duration-200 text-gray-400 hover:text-white ${className}`}
//       {...props}
//     >
//       <X className="w-4 h-4" />
//     </button>
//   );
// };

// // Background Component
// const AlertDialogBackground = ({ children, className = '' }) => {
//   return (
//     <div className={`min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-950 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
//       {/* Animated background stars */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" />
//         <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
//         <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '2s'}} />
//         <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
//       </div>
//       {children}
//     </div>
//   );
// };

// // Real Implementation with your API
// const MessageDeleteDialog = ({ message, onMessageDelete }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleDeleteConfirm = async () => {
//     setIsDeleting(true);
//     try {
//       const response = await axios.delete(`/api/delete-message/${message._id}`);
//       toast.success("Message Delete Confirmation", {
//         description: response.data.message,
//       });
//       onMessageDelete(message._id);
//       setIsOpen(false);
//     } catch (error) {
//       toast.error("Delete Failed", {
//         description: "Failed to delete message. Please try again.",
//       });
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <AlertDialogBackground>
//       <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
//         <AlertDialogTrigger asChild>
//           <button
//             onClick={() => setIsOpen(true)}
//             className="group relative px-4 py-2 bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-red-400/20"
//           >
//             <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
//             Delete Message
//             <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </button>
//         </AlertDialogTrigger>

//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogClose onClose={() => setIsOpen(false)} />
//             <AlertIcon variant="warning" />
//             <AlertDialogTitle>Delete Message</AlertDialogTitle>
//             <p className="text-sm text-purple-300 text-center font-medium">
//               This action cannot be undone
//             </p>
//           </AlertDialogHeader>

//           <div className="px-6">
//             <AlertDialogDescription>
//               <div>
//                 <p className="text-sm font-semibold text-red-200 mb-2">
//                   Are you sure you want to delete this message?
//                 </p>
//                 <p>
//                   This will permanently remove the message from your conversation. This action cannot be undone.
//                 </p>
//               </div>
//             </AlertDialogDescription>
//           </div>

//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => setIsOpen(false)} disabled={isDeleting}>
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction
//               variant="destructive"
//               loading={isDeleting}
//               onClick={handleDeleteConfirm}
//             >
//               {!isDeleting && <Trash2 className="w-4 h-4" />}
//               {isDeleting ? 'Deleting...' : 'Delete Message'}
//             </AlertDialogAction>
//           </AlertDialogFooter>

//           <p className="text-xs text-purple-400 text-center pb-6 italic">
//             Message will be removed immediately
//           </p>
//         </AlertDialogContent>
//       </AlertDialog>
//     </AlertDialogBackground>
//   );
// };

// export default MessageDeleteDialog;

// // Export individual components for reuse
// export {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
//   AlertDialogClose,
//   AlertIcon,
//   AlertDialogBackground
// }; ***//
