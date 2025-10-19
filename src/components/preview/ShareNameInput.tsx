import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Heart, Star, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ShareNameInput: React.FC = () => {
  const [name, setName] = useState('');
  const [animationVariant, setAnimationVariant] = useState(0);
  const { toast } = useToast();

  // Random animation variant on mount
  useEffect(() => {
    setAnimationVariant(Math.floor(Math.random() * 4));
  }, []);

  const handleShare = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to share this greeting.",
        variant: "destructive"
      });
      return;
    }

    // TODO: Implement share logic with user's name
    toast({
      title: "Sharing...",
      description: `${name} is sharing this greeting!`
    });
    
    // Clear input after share
    setName('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-gradient-to-t from-background via-background to-background/95 backdrop-blur-xl border-t border-border/50"
    >
      <div className="max-w-3xl mx-auto">
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

          <div className="relative flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-card/80 backdrop-blur-xl rounded-2xl border border-green-300 hover:border-green-700 shadow-2xl">

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

            {/* Input Field */}
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Enter your name to share..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-11 sm:h-12 pr-4 bg-background/60 border hover:border-primary/80 focus:border-primary/60 rounded-xl text-sm sm:text-base transition-all duration-300"
              />
              
              {/* Animated underline effect */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: name ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Go Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleShare}
                disabled={!name.trim()}
                className="relative h-11 sm:h-12 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base overflow-hidden group disabled:opacity-50"
              >
                {/* Animated shine effect */}
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
                
                <span className="relative flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    {name.trim() ? (
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
                  <span className="">Go</span>
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
          Share this greeting with others
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ShareNameInput;
