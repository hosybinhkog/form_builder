import React from 'react';
import { FormElement } from './FormElements';
import { Button } from './ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface SidebarBtnElementProps {
  formElement: FormElement;
}

const SidebarBtnElement: React.FC<SidebarBtnElementProps> = ({
  formElement,
}) => {
  const { icon: Icon, label } = formElement.designerBtnComponent;
  const draggable = useDraggable({
    id: 'designer-btn-' + formElement.type,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant={'outline'}
      className={cn(
        'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary',
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-6 w-6 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarBtnElement;

export const SidebarBtnElementOverlay: React.FC<SidebarBtnElementProps> = ({
  formElement,
}) => {
  const { icon: Icon, label } = formElement.designerBtnComponent;

  return (
    <Button
      variant={'outline'}
      className={cn('flex flex-col gap-2 h-[120px] w-[120px] cursor-grab')}
    >
      <Icon className="h-6 w-6 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};
