import React, { useState } from 'react';
import { FormElementInstance, FormElements } from './FormElements';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { BiSolidTrash } from 'react-icons/bi';
import useDesigner from './hooks/useDesigner';

interface DesignerElementWrapperProps {
  element: FormElementInstance;
}

const DesignerElementWrapper: React.FC<DesignerElementWrapperProps> = ({
  element,
}) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const { removeElement, selectElement, setSelectElement } = useDesigner();
  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHaftDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHaftDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;
  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn('absolute  w-full h-1/2 rounded-t-md')}
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className={cn('absolute  w-full h-1/2 bottom-0 rounded-b-md')}
      ></div>
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full z-20">
            <Button
              variant={'outline'}
              className="h-full border flex justify-center rounded-md rounded-l-none bg-red-500"
              onClick={(e) => (e.stopPropagation(), removeElement(element.id))}
            >
              <BiSolidTrash className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse ">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag or move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
      )}

      <div
        className={cn(
          'flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
          mouseIsOver && 'opacity-30',
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="rounded-t-none absolute bottom-0 w-full rounded-md h-[7px] bg-primary" />
      )}
    </div>
  );
};

export default DesignerElementWrapper;
