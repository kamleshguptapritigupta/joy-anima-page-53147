import React, { useRef, useState } from 'react';
import { GreetingFormData, EventType } from '@/types/greeting';
import { useLanguageTranslation } from '@/components/language/useLanguageTranslation';
import BackgroundWrapper from './BackgroundWrapper';
import BorderContainer from './BorderContainer';
import EmojisLayer from './EmojisLayer';
import EventHeader from './EventHeader';
import GreetingTexts from './GreetingTexts';
import EnhancedMediaGallery from './EnhancedMediaGallery';
import SenderSection from './SenderSection';
import AudioAutoPlay from './AudioAutoPlay';
import ShareNameInput from './ShareNameInput';
import { cn } from '@/lib/utils';

interface PreviewProps {
  greetingData: GreetingFormData;
  selectedEvent: EventType | null;
  frameStyle?: string;
  mediaAnimation?: string;
  className?: string;
  showShareInput?: boolean;
}

const Preview = ({
  greetingData,
  selectedEvent,
  frameStyle,
  mediaAnimation,
  className,
  showShareInput = false,
}: PreviewProps) => {
  const { translate } = useLanguageTranslation();


  // Default view mode
  return (
    <>
     <BackgroundWrapper greetingData={greetingData} className={cn('preview-theme-static pb-32 sm:pb-36', className)}>
          <BorderContainer
            greetingData={greetingData}
            selectedEvent={selectedEvent}
          >
            <div className="space-y-8">
              <EventHeader
                greetingData={greetingData}
                selectedEvent={selectedEvent}
              />
              <GreetingTexts greetingData={greetingData} />
              <EnhancedMediaGallery
                greetingData={greetingData}
                frameStyle={frameStyle || greetingData.frameStyle}
                mediaAnimation={mediaAnimation || greetingData.mediaAnimation}
              />
              <SenderSection greetingData={greetingData} />
            </div>
          </BorderContainer>

          <EmojisLayer emojis={greetingData.emojis} />

          {/* Auto-playing audio for shared greetings */}
          <AudioAutoPlay 
            audioUrl={greetingData.audioUrl} 
            autoPlay={true}
          />
      </BackgroundWrapper>

      {/* Share Name Input - only show in shared view */}
      {showShareInput && (
        <ShareNameInput greetingData={greetingData} />
      )}
    </>
  );
};

export default React.memo(Preview);
