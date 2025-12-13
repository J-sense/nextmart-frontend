import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PlayCircle, X } from "lucide-react";
import { useState, useRef } from "react";

export function WatchDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Watch Demo
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden">
        <AlertDialogHeader className="relative">
          <button
            onClick={handlePause}
            className="absolute top-0 right-0 z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <AlertDialogTitle className="text-2xl font-bold text-center mb-2">
            Platform Demo Video
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            See how our platform transforms digital experiences in just 2 minutes
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Video Player Container */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-black">
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls={isPlaying}
            preload="metadata"
            poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Custom Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <button
                onClick={handlePlay}
                className="group relative flex flex-col items-center justify-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600/90 to-blue-600/90 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110">
                  <PlayCircle className="w-12 h-12 text-white ml-1" />
                </div>
                <div className="mt-6 space-y-2">
                  <p className="text-white text-lg font-semibold group-hover:text-purple-300 transition-colors">
                    Watch Platform Demo
                  </p>
                  <p className="text-slate-300 text-sm max-w-md text-center">
                    See how our intelligent platform works in real-time with AI-powered features
                  </p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Video Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 px-6 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 rounded-xl">
          <div className="text-center">
            <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              2:30
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Duration
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              1080p
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Quality
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              English
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Audio
            </div>
          </div>
        </div>

        {/* Features Shown in Video */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">What You&apos;ll See:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "🎯", label: "AI Integration" },
              { icon: "⚡", label: "Real-time Analytics" },
              { icon: "🛡️", label: "Security Features" },
              { icon: "🚀", label: "Quick Setup" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all"
              >
                <span className="text-2xl mb-2">{feature.icon}</span>
                <span className="text-sm font-medium text-center">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
          <AlertDialogCancel 
            onClick={handlePause}
            className="w-full sm:w-auto border-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </AlertDialogCancel>
          <AlertDialogAction 
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Start Free Trial
          </AlertDialogAction>
          <Button
            variant="outline"
            onClick={handlePlay}
            className="w-full sm:w-auto border-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            Replay Demo
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}