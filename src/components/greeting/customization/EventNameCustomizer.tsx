import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { TextContent, EventType } from '@/types/greeting';
import { Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextStyleControls from '../TextStyleControls';
import { createTextSettings } from '@/types/textSettings';

interface EventNameCustomizerProps {
  eventNameStyle: TextContent;
  selectedEvent: EventType | null;
  onChange: (eventNameStyle: TextContent) => void;
}

const EventNameCustomizer: React.FC<EventNameCustomizerProps> = ({ eventNameStyle, selectedEvent, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  // Default text when no custom content is provided
  const defaultText = selectedEvent ? `Happy ${selectedEvent.label}` : 'Happy Celebration';

  return (
    <Card className="border border-green-300 shadow-sm">
      <CardHeader className="pb-3">
  <div className="flex w-full items-center justify-between">
    {/* Left: icon + title (allow truncation so it doesn't push the right side) */}
    <div className="flex items-center gap-2 min-w-0">
      <Calendar className="h-4 w-4 text-green-500 flex-shrink-0" />
      <CardTitle className="text-sm truncate min-w-0">
        Event Name Customization
      </CardTitle>
    </div>

    {/* Right: switch (stays at the extreme right) */}
    <div className="flex items-center gap-2 shrink-0">
      <span className="text-xs text-muted-foreground hidden sm:inline">Show Settings</span>
      <Switch
        checked={expanded}
        onCheckedChange={(checked) => setExpanded(checked)}
        aria-label={expanded ? 'Collapse settings' : 'Expand settings'}
      />
    </div>
  </div>
</CardHeader>



      {/* Animate Expand/Collapse */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            style={{ originY: 0 }}
          >
            <CardContent className="space-y-4">
              {/* Custom Event Name */}
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-2">
                  <Label className="text-xs font-medium">Custom Event Name</Label>
                  <Input
                    value={eventNameStyle.content}
                    onChange={(e) => onChange({ ...eventNameStyle, content: e.target.value })}
                    placeholder={`Default: ${defaultText}`}
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to use default: "{defaultText}"
                  </p>
                </div>
              </div>

              {/* Text Style Controls */}
              <TextStyleControls
                textSettings={createTextSettings({
                  id: 'event-name',
                  content: eventNameStyle.content,
                  style: eventNameStyle.style,
                  animation: eventNameStyle.animation,
                  continuousAnimation: eventNameStyle.continuousAnimation
                })}
                onChange={(settings) => onChange({
                  ...eventNameStyle,
                  content: settings.content,
                  style: settings.style,
                  animation: settings.animation,
                  continuousAnimation: settings.continuousAnimation
                })}
                showContent={false}
                showAnimation={true}
              />
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default EventNameCustomizer;
