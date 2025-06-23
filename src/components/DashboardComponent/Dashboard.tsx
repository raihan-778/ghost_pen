import {
  Activity,
  Bell,
  Bot,
  Clock,
  Eye,
  EyeOff,
  Filter,
  Globe,
  MessageCircle,
  MoreVertical,
  Plus,
  Search,
  Send,
  Settings,
  Shield,
  Sparkles,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";

type CardProps = {
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
};

// Card Components (inline for demo)
const Card = ({ className = "", children, ...props }: CardProps) => (
  <div
    className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:border-white/30 hover:bg-white/15 group relative overflow-hidden ${className}`}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
    <div className="relative z-10">{children}</div>
  </div>
);

const CardHeader = ({ className = "", children, ...props }: CardProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 pb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = "", children, ...props }: CardProps) => (
  <div
    className={`text-xl font-bold leading-none tracking-tight text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ className = "", children, ...props }: CardProps) => (
  <div
    className={`p-6 pt-4 text-gray-300 group-hover:text-gray-200 transition-colors duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const Dashboard = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      preview: "Hey, I've been thinking about you...",
      time: "2 min ago",
      unread: true,
      anonymous: true,
    },
    {
      id: 2,
      preview: "Thank you for always being there for me",
      time: "1 hour ago",
      unread: true,
      anonymous: true,
    },
    {
      id: 3,
      preview: "Your friendship means everything to me",
      time: "3 hours ago",
      unread: false,
      anonymous: true,
    },
    {
      id: 4,
      preview: "I hope you're having a wonderful day",
      time: "1 day ago",
      unread: false,
      anonymous: true,
    },
  ]);

  const [stats, setStats] = useState({
    totalMessages: 247,
    unreadMessages: 12,
    sentMessages: 156,
    activeChats: 8,
  });

  const [activities, setActivities] = useState([
    { action: "New message received", time: "2 min ago", type: "message" },
    { action: "Message sent anonymously", time: "15 min ago", type: "sent" },
    { action: "Security scan completed", time: "1 hour ago", type: "security" },
    { action: "AI suggestion used", time: "2 hours ago", type: "ai" },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    {
      name: "Compose Message",
      icon: Plus,
      color: "from-purple-600 to-pink-600",
      action: () => console.log("Compose"),
    },
    {
      name: "AI Suggestions",
      icon: Bot,
      color: "from-blue-600 to-cyan-600",
      action: () => console.log("AI"),
    },
    {
      name: "Security Check",
      icon: Shield,
      color: "from-green-600 to-emerald-600",
      action: () => console.log("Security"),
    },
    {
      name: "Settings",
      icon: Settings,
      color: "from-orange-600 to-red-600",
      action: () => console.log("Settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">Ghost Pen</h1>
              </div>
              <div className="hidden md:flex items-center space-x-1 text-sm text-gray-400">
                <span>Dashboard</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300"
                />
              </div>

              <button className="relative p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-300">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Anonymous
                </span>
              </h2>
              <p className="text-gray-400">
                {currentTime.toLocaleDateString()} •{" "}
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400">Secure Connection</span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Total Messages
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalMessages}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+12% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Unread</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.unreadMessages}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Clock className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-yellow-400">2 urgent</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Sent Messages
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.sentMessages}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Activity className="w-4 h-4 text-blue-400 mr-1" />
                <span className="text-blue-400">98% delivered</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Active Chats
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.activeChats}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Globe className="w-4 h-4 text-purple-400 mr-1" />
                <span className="text-purple-400">Global reach</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={action.action}
                        className={`p-4 bg-gradient-to-r ${action.color} rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm">{action.name}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Messages</CardTitle>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Filter className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      View All
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex items-center space-x-4 p-6 hover:bg-white/5 transition-colors cursor-pointer ${
                        index !== messages.length - 1
                          ? "border-b border-white/10"
                          : ""
                      }`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <EyeOff className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-400">
                            Anonymous
                          </span>
                          {message.unread && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p
                          className={`text-sm ${message.unread ? "text-white font-medium" : "text-gray-400"} truncate`}
                        >
                          {message.preview}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.time}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Security Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Encryption</span>
                    <span className="text-green-400 text-sm font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Anonymity</span>
                    <span className="text-green-400 text-sm font-medium">
                      Protected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">VPN Status</span>
                    <span className="text-green-400 text-sm font-medium">
                      Connected
                    </span>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                      Security Scan
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "message"
                            ? "bg-blue-500"
                            : activity.type === "sent"
                              ? "bg-green-500"
                              : activity.type === "security"
                                ? "bg-yellow-500"
                                : "bg-purple-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span>AI Assistant</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-300">
                    I can help you craft the perfect anonymous message.
                  </p>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Get Suggestions</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
