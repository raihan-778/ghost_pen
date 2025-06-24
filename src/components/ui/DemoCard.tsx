import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

// Demo Component to showcase the enhanced cards
function CardDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800 p-8">
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Enhanced Premium Cards
          </h1>
          <p className="text-xl text-gray-300">
            Industry-standard design with professional typography
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card */}
          <Card className="hover:shadow-purple-500/40">
            <CardHeader>
              <CardTitle>Anonymous Feedback</CardTitle>
              <CardDescription>
                Get honest insights without revealing identities. Perfect for
                team collaboration and growth.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-200">
                    Complete Privacy
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-gray-200">
                    Real-time Insights
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm text-gray-200">
                    AI-Powered Analytics
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <CardAction>Learn More →</CardAction>
            </CardFooter>
          </Card>

          {/* Testimonial Card */}
          <Card className="hover:shadow-cyan-500/40">
            <CardHeader>
              <CardTitle>Executive Transformation</CardTitle>
              <CardDescription>
                "This platform enabled our leadership team to receive genuine
                insights."
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-lg text-gray-100 italic">
                  "The anonymity feature completely transformed our company
                  culture and decision-making process."
                </div>
                <div className="border-t border-purple-500/30 pt-4">
                  <div className="text-purple-300 font-semibold">
                    Fortune 500 CEO
                  </div>
                  <div className="text-gray-400 text-sm">Technology Sector</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <CardAction>Read Full Story →</CardAction>
            </CardFooter>
          </Card>

          {/* Pricing Card */}
          <Card className="hover:shadow-pink-500/40 border-pink-500/40">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Professional Plan</CardTitle>
                  <CardDescription>
                    Perfect for growing teams and organizations
                  </CardDescription>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">$29</div>
                  <div className="text-gray-400">per month</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-200">Unlimited feedback</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-200">Advanced analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-200">Priority support</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <CardAction className="w-full justify-center bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-400/50">
                Start Free Trial →
              </CardAction>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CardDemo;
