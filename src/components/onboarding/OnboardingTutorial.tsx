import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, Heart, Image, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: 'Welcome! 🎉',
    description: 'Create beautiful, personalized greetings in minutes. Let us show you how!',
    icon: <Sparkles className="h-12 w-12" />,
    gradient: 'from-primary to-purple-500'
  },
  {
    title: 'Choose Your Event',
    description: 'Select from birthdays, anniversaries, festivals, or create your own custom event.',
    icon: <Heart className="h-12 w-12" />,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Add Your Touch',
    description: 'Upload photos, videos, add text, emojis, and customize backgrounds to make it special.',
    icon: <Image className="h-12 w-12" />,
    gradient: 'from-pink-500 to-primary'
  },
  {
    title: 'Share the Joy',
    description: 'Generate a beautiful link and share via WhatsApp, email, or social media!',
    icon: <Send className="h-12 w-12" />,
    gradient: 'from-primary to-purple-500'
  }
];

const OnboardingTutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Check if user has seen the tutorial
    const hasSeenTutorial = localStorage.getItem('has-seen-tutorial');
    if (!hasSeenTutorial) {
      // Show after 1 second
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setShowTutorial(false);
    localStorage.setItem('has-seen-tutorial', 'true');
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!showTutorial) return null;

  const currentStepData = tutorialSteps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-lg p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-card border-2 border-primary/30 rounded-3xl p-8 max-w-lg w-full shadow-2xl overflow-hidden"
        >
          {/* Animated background gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${currentStepData.gradient} opacity-10`}
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Skip
          </button>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              key={currentStep}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className={`bg-gradient-to-br ${currentStepData.gradient} p-6 rounded-2xl text-white shadow-lg`}>
                {currentStepData.icon}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              key={`title-${currentStep}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold text-center mb-3 text-foreground"
            >
              {currentStepData.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              key={`desc-${currentStep}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-muted-foreground mb-8"
            >
              {currentStepData.description}
            </motion.p>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-8">
              {tutorialSteps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep 
                      ? 'w-8 bg-gradient-to-r from-primary to-purple-500' 
                      : 'w-2 bg-muted'
                  }`}
                  animate={{
                    scale: index === currentStep ? 1.2 : 1
                  }}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  className="flex-1 rounded-xl"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className={`${currentStep === 0 ? 'w-full' : 'flex-1'} rounded-xl bg-gradient-to-r ${currentStepData.gradient} hover:opacity-90`}
              >
                {currentStep === tutorialSteps.length - 1 ? (
                  'Get Started'
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingTutorial;
