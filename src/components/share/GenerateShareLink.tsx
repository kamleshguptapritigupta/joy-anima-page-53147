import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFirebaseGreetings } from '@/hooks/useFirebaseGreetings';
import { GreetingFormData, EventType } from '@/types/greeting';
import { useToast } from '@/hooks/use-toast';
import { Share2, Loader2 } from 'lucide-react';
import { useLanguageTranslation } from '@/components/language/useLanguageTranslation';
import ShareActions from '@/components/share/ShareActions';

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
  const [shareVisible, setShareVisible] = useState(false); // <-- track share visibility
  const { saveGreeting, isSaving: hookIsSaving } = useFirebaseGreetings();
  const { toast } = useToast();
  const { translate } = useLanguageTranslation();

  const handleSaveAndShare = async () => {
    if (!greetingData.eventType) {
      toast({ title: "Missing Event Type", description: "Please select an event.", variant: "destructive" });
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

        // <-- Show ShareActions only after successful save
        setShareVisible(true);
      } else throw new Error('Save failed');
    } catch (error) {
      toast({ title: "Save Failed", description: "Error saving greeting.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid = !!greetingData.eventType;
  const isLoading = isSaving || hookIsSaving;

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {/* Save & Share Button */}
      <Button
        variant={variant}
        size={size}
        onClick={handleSaveAndShare}
        disabled={!isFormValid || isLoading}
        className="relative overflow-hidden group animate-zoom-in shadow-2xl hover:shadow-primary/30 transition-all duration-500 bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l flex items-center gap-2 justify-center"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            {!shareVisible && (<Share2 className="h-4 w-4 group-hover:animate-spin" />)}
            {shareVisible && (<span className="text-xl group-hover:animate-spin">✨</span>)}
            <span>{translate('Save And Share')}</span>
            <span className="text-xl group-hover:animate-spin">✨</span>

            {/* Button shine effect */}
            <span className="absolute top-0 left-1/2 w-20 h-full bg-white/30 -skew-x-12 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-700"></span>
          </>
        )}
      </Button>

      {/* ShareActions - visible only after save */}
      {shareVisible && (
        <div className="">
          <ShareActions greetingData={greetingData} onlyShareButton />
        </div>
      )}
    </div>
  );
};

export default FirebaseShareButton;
