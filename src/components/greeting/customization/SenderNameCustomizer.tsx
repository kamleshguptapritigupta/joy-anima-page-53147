import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { User } from 'lucide-react';
import TextStyleControls from '@/components/greeting/TextStyleControls';
import { createTextSettings, TextSettings } from '@/types/textSettings';
import { motion, AnimatePresence } from 'framer-motion';

interface SenderNameCustomizerProps {
  senderNameStyle?: TextSettings;
  onChange: (settings: TextSettings | undefined) => void;
}

const SenderNameCustomizer: React.FC<SenderNameCustomizerProps> = ({ 
  senderNameStyle, 
  onChange 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(!!senderNameStyle);

  const handleVisibilityChange = (checked: boolean) => {
    setIsVisible(checked);
    if (!checked) {
      onChange(undefined);
      setExpanded(false);
    } else {
      onChange(createTextSettings({
        id: 'sender-name',
        content: '',
        animation: 'fadeIn'
      }));
      setExpanded(true);
    }
  };

  const handleSettingsChange = (updates: Partial<TextSettings>) => {
    if (senderNameStyle) {
      onChange({ ...senderNameStyle, ...updates });
    }
  };

  return (
    <Card className="border border-green-300 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <User className="h-4 w-4 text-green-500 flex-shrink-0" />
            <CardTitle className="text-sm truncate min-w-0">
              Sender Name Customization
            </CardTitle>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {isVisible ? 'Hide' : 'Show'}
            </span>
            <Switch 
              checked={isVisible} 
              onCheckedChange={handleVisibilityChange} 
            />
          </div>
        </div>
      </CardHeader>

      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">Edit Settings</span>
                <Switch 
                  checked={expanded} 
                  onCheckedChange={setExpanded} 
                />
              </div>

              <AnimatePresence initial={false}>
                {expanded && senderNameStyle && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TextStyleControls
                      textSettings={senderNameStyle}
                      onChange={handleSettingsChange}
                      showContent={false}
                      showAnimation={true}
                      compact={false}
                      label="Sender Name Style"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default SenderNameCustomizer;
