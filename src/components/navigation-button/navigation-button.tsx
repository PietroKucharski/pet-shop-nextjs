import type React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';

type NavigationButtonProps = {
  tooltipText: string;
  children: React.ReactNode;
  onClick: () => void;
};

export const NavigationButton = ({
  children,
  onClick,
  tooltipText,
}: NavigationButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="h-12 w-9 bg-transparent border border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand"
          variant="outline"
          size="icon"
          onClick={onClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-background-tertiary">
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};
