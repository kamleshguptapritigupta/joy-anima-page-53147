import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Share2, 
  Copy, 
  QrCode, 
  CheckCircle,
  MessageCircle,
  Facebook,
  Twitter,
  Send,
  Linkedin,
  Edit,
  Edit2,
} from 'lucide-react';
import { useLanguageTranslation } from '@/components/language/useLanguageTranslation';
import type { EventType } from '@/types/greeting';
import ViewGreeting from '@/pages/ViewGreeting'

/* -------------------------------------------------------------------------- */
/* ✅ Reusable Share Button Component */
/* -------------------------------------------------------------------------- */
export const ShareButton = ({
  label,
  icon: Icon,
  onClick,
  gradient = 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
  isCopied = false,
  disabled = false,
}: {
  label: string;
  icon: any;
  onClick: () => void;
  gradient?: string;
  isCopied?: boolean;
  disabled?: boolean;
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    size="sm"
    className={`relative flex items-center justify-center gap-1.5 sm:gap-2 
      px-3 py-2 h-9 min-w-[3rem]
      bg-gradient-to-r ${gradient} text-white 
      shadow-md hover:shadow-lg rounded-md 
      overflow-hidden transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed group`}
  >
    {/* Shine Animation */}
    <span className="absolute inset-0 bg-white/20 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

    <Icon className="h-4 w-4 flex-shrink-0 relative z-10" />
    <span className="hidden sm:inline text-xs sm:text-sm font-medium relative z-10">
      {isCopied ? 'Copied!' : label}
    </span>
  </Button>
);

/* -------------------------------------------------------------------------- */
/* ✅ ShareActions Component */
/* -------------------------------------------------------------------------- */

interface ShareActionsProps {
  greetingData: any;
  greetingRef?: React.RefObject<HTMLDivElement>;
  selectedEvent?: EventType | null;
  onlyShareButton?: boolean;
  dialogOpen?: boolean; // controlled dialog state
  onDialogChange?: (open: boolean) => void; // controlled dialog handler
}

const ShareActions = ({ greetingData, selectedEvent, onlyShareButton, dialogOpen, onDialogChange }: ShareActionsProps) => {
  const [internalDialogOpen, setInternalDialogOpen] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const shareDialogOpen = dialogOpen !== undefined ? dialogOpen : internalDialogOpen;
  const setShareDialogOpen = onDialogChange || setInternalDialogOpen;
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  const { translate } = useLanguageTranslation();

  /* Generate Share URL */
  const generateFirebaseSlugURL = (data: any) => {
    const eventName = data?.eventType === 'custom'
      ? (data?.customEventName || data?.customEvent?.label || selectedEvent?.label || 'custom')
      : data?.eventType;

    const sanitize = (str: string) =>
      str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const slug = `${sanitize(data?.senderName || 'someone')}-wishes-${sanitize(data?.receiverName || 'you')}-${sanitize(eventName || 'greeting')}`;
    return `${window.location.origin}/${slug}`;
  };

  const generateShareableURL = () => generateFirebaseSlugURL(greetingData || {});

  const copyShareLink = () => {
    const shareableURL = generateShareableURL();
    navigator.clipboard.writeText(shareableURL);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast({
      title: translate("Link copied!"),
      description: translate("Greeting link has been copied to your clipboard."),
    });
  };

  const shareToSocialMedia = (platform: string) => {
    const shareableURL = generateShareableURL();
    const text = translate("Check out this beautiful greeting I created!");
    let shareURL = '';

    switch (platform) {
      case 'whatsapp': shareURL = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareableURL)}`; break;
      case 'facebook': shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableURL)}`; break;
      case 'twitter': shareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareableURL)}`; break;
      case 'telegram': shareURL = `https://t.me/share/url?url=${encodeURIComponent(shareableURL)}&text=${encodeURIComponent(text)}`; break;
      case 'linkedin': shareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableURL)}`; break;
    }

    if (shareURL) window.open(shareURL, '_blank');
  };

  const handleNativeShare = async () => {
    const shareableURL = generateShareableURL();
    if (navigator.share) {
      try {
        await navigator.share({
          title: translate('Beautiful Greeting'),
          text: translate('Check out this beautiful greeting I created!'),
          url: shareableURL
        });
      } catch (error) {
        console.log('Share cancelled:', error);
      }
    } else {
      copyShareLink();
    }
  };

  const generateQRCode = () => {
    const shareableURL = generateShareableURL();
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareableURL)}`;
    const link = document.createElement('a');
    link.download = 'greeting-qr-code.png';
    link.href = qrCodeURL;
    link.click();
    toast({
      title: translate("QR Code generated!"),
      description: translate("QR code for your greeting has been downloaded."),
    });
  };

  /* Social Buttons */
  const socialButtons = [
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'text-green-500' },
    { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-500' },
    { id: 'twitter', label: 'Twitter', icon: Twitter, color: 'text-sky-400' },
    { id: 'telegram', label: 'Telegram', icon: Send, color: 'text-blue-400' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
  ];

  return (
    <>
     {!onlyShareButton && (
      <Card className="border-dashed border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 shadow-sm no-capture">
        <CardContent className="p-4">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-lg mb-1">{translate('Share Your Greeting')}</h3>
            <p className="text-sm text-muted-foreground">{translate('Share your greeting with others')}</p>
          </div>
<div className="text-center mb-2 sm:mb-4">
 <ViewGreeting onlyCustomizeButton />
</div>
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-lg bg-gradient-to-r from-muted/10 to-muted/5">
            
            {/* New "Create New" Button */}
            <ShareButton
              label={translate('Create New')}
              icon={Edit}
              onClick={() => window.location.href = '/create'}
              gradient="from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
            />

            <ShareButton
              label={translate('Copy Link')}
              icon={isCopied ? CheckCircle : Copy}
              onClick={copyShareLink}
              gradient="from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              isCopied={isCopied}
            />
            <ShareButton
              label={translate('Share')}
              icon={Share2}
              onClick={() => setShareDialogOpen(true)}
              gradient="from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            />
          </div>
        </CardContent>
      </Card>
       )}

    {/* If onlyShareButton is true, render just the ShareButton */}
    {onlyShareButton && (
      <ShareButton
        label={translate('Share')}
        icon={Share2}
        onClick={() => setShareDialogOpen(true)}
        gradient="from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
      />
    )}


      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-md rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-center">{translate('Share Your Greeting')}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="flex justify-center">
              <Button
                onClick={handleNativeShare}
                className="w-full max-w-xs justify-center py-6 bg-primary/90 hover:bg-primary text-white font-medium rounded-md"
                size="lg"
              >
                <Share2 className="h-5 w-5 mr-2" />
                {translate('Share via...')}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {translate('Or share directly on')}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {socialButtons.map((social) => (
                <Button
                  key={social.id}
                  onClick={() => shareToSocialMedia(social.id)}
                  variant="outline"
                  className="justify-start py-3 h-auto rounded-lg hover:bg-muted/40"
                >
                  <social.icon className={`h-5 w-5 mr-2 ${social.color}`} />
                  {social.label}
                </Button>
              ))}

              <Button onClick={generateQRCode} variant="outline" className="justify-start py-3 h-auto rounded-lg">
                <QrCode className="h-5 w-5 mr-2 text-purple-500" />
                {translate('QR Code')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareActions;
