import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Heart, Star, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ShareActions from '@/components/share/ShareActions';
import { useFirebaseGreetings } from '@/hooks/useFirebaseGreetings';
import type { GreetingFormData } from '@/types/greeting';

interface ShareNameInputProps {
  greetingData: GreetingFormData;
  greetingSlug?: string;
}

const ShareNameInput: React.FC<ShareNameInputProps> = ({ greetingData, greetingSlug }) => {
  const [senderName, setSenderName] = useState('');
  const [showCustomize, setShowCustomize] = useState(false);
  const [customSenderName, setCustomSenderName] = useState('');
  const [customReceiverName, setCustomReceiverName] = useState('');
  const [animationVariant, setAnimationVariant] = useState(0);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [modifiedGreetingData, setModifiedGreetingData] = useState<GreetingFormData>(greetingData);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const { updateGreetingSenderName } = useFirebaseGreetings();

  // Random animation variant on mount
  useEffect(() => {
    setAnimationVariant(Math.floor(Math.random() * 4));
  }, []);

  const handleShare = async () => {
    const hasSenderName = senderName.trim();
    
    if (!hasSenderName) {
      toast({
        title: "Name required",
        description: "Please enter your name to share this greeting.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsCreating(true);

      // Update greeting data with new sender name
      const updatedData = {
        ...greetingData,
        senderName: hasSenderName ? senderName.trim() : greetingData.senderName,
      };
      setModifiedGreetingData(updatedData);
      
      // Open share dialog with updated data
      setShareDialogOpen(true);
      
      toast({
        title: "Ready to share!",
        description: "Your personalized greeting is ready.",
      });
    } catch (error) {
      console.error('Error preparing greeting:', error);
      toast({
        title: "Error",
        description: "Failed to prepare greeting. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCustomize = async () => {
    const hasSenderName = customSenderName.trim();
    const hasReceiverName = customReceiverName.trim();
    
    if (!hasSenderName && !hasReceiverName) {
      toast({
        title: "Name required",
        description: "Please enter at least one name to customize.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsCreating(true);
      
      // Create new greeting with customized names
      const newSlug = await updateGreetingSenderName(
        greetingSlug || '',
        hasSenderName ? customSenderName.trim() : undefined,
        hasReceiverName ? customReceiverName.trim() : undefined
      );
      
      if (newSlug) {
        toast({
          title: "Greeting customized!",
          description: "A new greeting has been created with your names.",
        });
        
        // Redirect to new greeting
        window.location.href = `/view/${newSlug}`;
      }
    } catch (error) {
      console.error('Error customizing greeting:', error);
      toast({
        title: "Error",
        description: "Failed to customize greeting. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isCreating) {
      handleShare();
    }
  };

  // Different icon animations for variety
  const icons = [
    <Sparkles className="h-4 w-4" />,
    <Heart className="h-4 w-4" />,
    <Star className="h-4 w-4" />,
    <Zap className="h-4 w-4" />
  ];

  const selectedIcon = icons[animationVariant];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-background via-background to-background/95 backdrop-blur-xl border-t border-border/50"
    >
      <div className="max-w-3xl my-5 z-10 mx-auto">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{
              duration: 3 + animationVariant,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative flex items-center gap-2 mx-4 sm:gap-3 p-3 bg-card/80 backdrop-blur-xl rounded-2xl border border-green-300 hover:border-green-500 shadow-2xl">

            {/* Animated Icon */}
            <motion.div
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 text-primary-foreground shadow-lg"
              animate={{
                rotate: animationVariant === 0 ? [0, 360] : 0,
                scale: animationVariant === 1 ? [1, 1.1, 1] : 1,
                y: animationVariant === 2 ? [0, -5, 0] : 0
              }}
              transition={{
                duration: 2 + animationVariant * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {selectedIcon}
            </motion.div>

            {/* Input Field - Single sender name input */}
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Your name..."
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isCreating}
                className="h-11 sm:h-12 pr-4 bg-background/60 border hover:border-primary/50 focus:border-primary/60 rounded-xl text-sm sm:text-base transition-all duration-300"
              />
              
              {/* Animated underline effect */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: senderName ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Customize Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setShowCustomize(true)}
                variant="outline"
                className="h-11 sm:h-12 px-4 rounded-xl text-sm sm:text-base"
              >
                Customize
              </Button>
            </motion.div>

            {/* Go Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleShare}
                disabled={!senderName.trim() || isCreating}
                className="relative h-11 sm:h-12 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base overflow-hidden group disabled:opacity-50"
              >
                {/* Animated shine effect */}
                {!isCreating && (
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
                )}
                
                <span className="relative flex items-center gap-2">
                  {isCreating ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <AnimatePresence mode="wait">
                      {senderName.trim() ? (
                        <motion.span
                          key="send"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Send className="h-4 w-4" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="sparkle"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  )}
                  <span className="">{isCreating ? 'Creating...' : 'Go'}</span>
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Floating particles effect */}
          {animationVariant === 3 && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-purple-500"
                  style={{
                    left: `${20 + i * 15}%`,
                    bottom: '100%'
                  }}
                  animate={{
                    y: [-10, -50],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs sm:text-sm text-muted-foreground mt-2"
        >
          Enter your name to personalize • Click Customize to edit both names
          <span className="text-lg ml-1 animate-pulse">
            💖
          </span>
        </motion.p>
      </div>

      {/* Customize Dialog */}
      <AnimatePresence>
        {showCustomize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowCustomize(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-foreground">Customize Names</h3>
              <p className="text-sm text-muted-foreground mb-6">
                This will create a new greeting with your custom names
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Sender Name</label>
                  <Input
                    type="text"
                    placeholder="Your name..."
                    value={customSenderName}
                    onChange={(e) => setCustomSenderName(e.target.value)}
                    className="h-11 bg-background/60 border hover:border-primary/50 focus:border-primary/60 rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Receiver Name</label>
                  <Input
                    type="text"
                    placeholder="Receiver's name..."
                    value={customReceiverName}
                    onChange={(e) => setCustomReceiverName(e.target.value)}
                    className="h-11 bg-background/60 border hover:border-primary/50 focus:border-primary/60 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomize(false)}
                  className="flex-1"
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCustomize}
                  className="flex-1"
                  disabled={isCreating || (!customSenderName.trim() && !customReceiverName.trim())}
                >
                  {isCreating ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Create New'
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Dialog using ShareActions */}
      <div className="hidden">
        <ShareActions 
          greetingData={modifiedGreetingData}
          onlyShareButton={false}
          dialogOpen={shareDialogOpen}
          onDialogChange={setShareDialogOpen}
        />
      </div>
    </motion.div>
  );
};

export default ShareNameInput;
