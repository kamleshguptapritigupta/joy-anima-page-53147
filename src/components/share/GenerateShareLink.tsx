import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFirebaseGreetings } from '@/hooks/useFirebaseGreetings';
import { GreetingFormData, EventType } from '@/types/greeting';
import { useToast } from '@/hooks/use-toast';
import { Share2, Loader2 } from 'lucide-react';
import { useLanguageTranslation } from '@/components/language/useLanguageTranslation';
import ShareActions from '@/components/share/ShareActions';
import { motion } from 'framer-motion';

interface FirebaseShareButtonProps {
  greetingData: GreetingFormData;
  selectedEvent?: EventType | null;
  onSuccess?: (slug: string) => void;
  onClearAutoSave?: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const FirebaseShareButton: React.FC<FirebaseShareButtonProps> = ({
  greetingData,
  selectedEvent,
  onSuccess,
  onClearAutoSave,
  variant = "default",
  size = "lg"
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const { saveGreeting, isSaving: hookIsSaving } = useFirebaseGreetings();
  const { toast } = useToast();
  const { translate } = useLanguageTranslation();

  const handleSaveAndShare = async () => {
    if (!greetingData.eventType) {
      toast({
        title: "Missing Event Type",
        description: "Please select an event.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const title = `${greetingData.senderName || 'Someone'} wishes ${greetingData.receiverName || 'You'}`;
      const slug = await saveGreeting(greetingData, title, greetingData.isPublic || false);

      if (slug) {
        const shareableURL = `${window.location.origin}/${slug}`;
        await navigator.clipboard.writeText(shareableURL);

        toast({ title: "Link Generated! 🎉", description: "Greeting saved and link copied." });

        if (onClearAutoSave) onClearAutoSave();
        if (onSuccess) onSuccess(slug);

        setShareVisible(true);
      } else throw new Error('Save failed');
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Error saving greeting.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid = !!greetingData.eventType;
  const isLoading = isSaving || hookIsSaving;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-background via-background to-background/95 backdrop-blur-xl border-t border-border/50"
    >
      <div className="max-w-3xl my-5 mx-auto px-4">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/20 via-violet-500/20 to-primary/20 blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 p-3 bg-card/80 backdrop-blur-xl rounded-2xl border border-primary/30 hover:border-primary/50 shadow-2xl">
            {/* Save & Share Button */}
            <Button
              variant={variant}
              size={size}
              onClick={handleSaveAndShare}
              disabled={!isFormValid || isLoading}
              className="relative overflow-hidden group shadow-2xl hover:shadow-primary/30 transition-all duration-500 bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l flex items-center gap-2 justify-center text-white px-5 w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  {!shareVisible && <Share2 className="h-4 w-4 group-hover:animate-spin" />}
                  {shareVisible && <span className="text-xl group-hover:animate-spin">✨</span>}
                  <span>{translate('Save And Share')}</span>
                  <span className="text-xl group-hover:animate-spin">✨</span>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    animate={{
                      x: ['-200%', '200%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 2
                    }}
                  />
                </>
              )}
            </Button>

            {/* ShareActions - visible only after save */}
            {shareVisible && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex justify-center sm:justify-start"
              >
                <ShareActions greetingData={greetingData} onlyShareButton />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs sm:text-sm text-muted-foreground mt-2"
        >
          Save your greeting and share it with the world
          <span className="text-lg ml-1 animate-pulse">
            🎉
          </span>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default FirebaseShareButton;
