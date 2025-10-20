// pages/ViewGreeting.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFirebaseGreetings } from '@/hooks/useFirebaseGreetings';
import { GreetingFormData } from '@/types/greeting';
import Preview from '@/components/preview/Preview';
import { Button } from '@/components/ui/button';
import { Share2, Edit3, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ShareActions from '@/components/share/ShareActions';
import SEOManager from '@/components/seo/SEOManager';
import BackgroundAudioPlayer from '@/components/greeting/contentEditor/AudioPlayerInput/BackgroundAudioPlayer';
import NotFoundPage from './NotFound';
import { motion } from 'framer-motion';
import ShareNameInput from '@/components/preview/ShareNameInput';


interface ViewGreetingProps {
  onClick?: () => void;
  onlyCustomizeButton?: boolean;
}

const ViewGreeting: React.FC<ViewGreetingProps> = ({ onClick, onlyCustomizeButton }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { loadGreeting } = useFirebaseGreetings();
  const [greetingData, setGreetingData] = useState<GreetingFormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const mountedRef = useRef(true);
  const { toast } = useToast();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!slug) {
      setError('No greeting slug provided');
      setInitialLoading(false);
      return;
    }

    let cancelled = false;

    const fetchGreeting = async () => {
      try {
        setInitialLoading(true);
        const data = await loadGreeting(slug);
        if (cancelled || !mountedRef.current) return;

        if (data) {
          setGreetingData(data);
          setError(null);
        } else {
          setGreetingData(null);
          setError('Greeting not found');
        }
      } catch (err) {
        if (!cancelled && mountedRef.current) setError('Failed to load greeting');
      } finally {
        if (!cancelled && mountedRef.current) setInitialLoading(false);
      }
    };

    fetchGreeting();
    return () => {
      cancelled = true;
    };
  }, [slug, loadGreeting]);

  if (initialLoading && !greetingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading greeting...</p>
        </div>
      </div>
    );
  }

  if (error || !greetingData) {
    return <NotFoundPage />;
  }

  const handleCustomizeGreeting = () => {
    navigate(`/create?edit=${slug}`, { state: { greetingData } });
  };

  return (
    <>
      {!onlyCustomizeButton && (
        <>
          <SEOManager
            title={`${greetingData.eventType || 'Greeting'} for ${greetingData.receiverName || 'You'}`}
            description={greetingData.texts?.[0]?.content || greetingData.customEventText || ' '}
            customEventName={greetingData.customEventName}
            greetingData={greetingData}
          />

          <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-500">
            {/* HEADER */}
            <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3">
                {/* BACK BUTTON */}
                <Link to="/">
                  <AnimatedButton icon={<Home className="h-4 w-4" />} label="Home" onClick={onClick} />
                </Link>

                {/* RIGHT SIDE BUTTONS */}
                <div className="flex items-center gap-1 sm:gap-3">
                  {/* Audio Player */}
                  {greetingData.audioUrl && (
                    <BackgroundAudioPlayer audioUrl={greetingData.audioUrl} autoPlay />
                  )}

                  {/* Share Button */}
                  <ShareActions greetingData={greetingData} onlyShareButton />

                  {/* Customize */}
                  <AnimatedButton
                    icon={<Edit3 className="h-4 w-4" />}
                    label="Customize"
                    onClick={handleCustomizeGreeting}
                  />
                </div>
              </div>
            </header>

            {/* BODY */}
            <main className="max-w-4xl mx-auto p-3 sm:p-4">
              <Preview greetingData={greetingData} selectedEvent={null} showShareInput />
              <div className="mt-1 mb-40">
                <ShareActions greetingData={greetingData} selectedEvent={null} />
              </div>
            </main>
                 
          </div>
        </>
      )}

      {/* Only Customize Button */}
      {onlyCustomizeButton && ( 
        <AnimatedButton
          icon={<Edit3 className="h-4 w-4" />}
          label="Customize"
          onClick={handleCustomizeGreeting}
        />
      )}

    </>
  );
};

export default ViewGreeting;

/* 🔹 Consistent Animated Button Component */
interface AnimatedButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ icon, label, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    whileHover={{
      scale: 1.05,
      boxShadow: '0 0 25px rgba(168,85,247,0.3)',
    }}
    whileTap={{ scale: 0.96 }}
    className="relative inline-flex"
  >
    <Button
      variant="outline"
      onClick={onClick}
      className="relative overflow-hidden bg-white/50 dark:bg-gray-900/70 backdrop-blur-md 
                 text-gray-900 dark:text-gray-100 border border-gray-400 dark:border-gray-600
                 hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-1 sm:gap-2 text-base"
    >
      {/* subtle shine on hover */}
      <motion.span
        initial={{ x: '-120%' }}
        whileHover={{ x: '120%' }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-green/70 to-transparent dark:via-white/10 -skew-x-12"
      />
      <span className="relative z-10 flex items-center gap-1">
        {icon}
         {label !== "Customize" ? (
          <span className="hidden sm:inline">{label}</span>
        ) : (
          <span>{label}</span>
        )}
      </span>
    </Button>
  </motion.div>
);
