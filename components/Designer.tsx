'use client';
import React from 'react';
import DesignerSidebar from './DesignerSidebar';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import useDesigner from '@/components/hooks/useDesigner';
import { ElementType, FormElements } from './FormElements';
import { idGenerator } from '@/lib/idGenerator';
import DesignerElementWrapper from './DesignerElementWrapper';

const Designer = () => {
  const {
    addElement,
    elements,
    selectElement,
    setSelectElement,
    removeElement,
  } = useDesigner();
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea =
        over?.data?.current?.isDesignerDropArea;
      if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(
          idGenerator(),
        );
        addElement(elements.length, newElement);

        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over?.data?.current?.isTopHaftDesignerElement;

      const isDroppingOverDesignerElementBottomHalf =
        over?.data?.current?.isBottomHaftDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf |
        isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarBtnOverDesignerElement =
        isDroppingOverDesignerElement && isDesignerBtnElement;
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(
          idGenerator(),
        );
        const overElementIndex = elements.findIndex(
          (el) => el.id === over.data?.current?.elementId,
        );
        if (overElementIndex === -1) {
          throw new Error('Element not found');
        }

        let indexForNewElement = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);

        return;
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active?.data?.current?.elementId;
        const overId = over?.data?.current?.elementId;
        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId,
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('element not found');
        }
        const activeElement = { ...elements[activeElementIndex] };

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        removeElement(activeId);
        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectElement) setSelectElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-2 ring-primary ring-inset',
          )}
        >
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {!droppable.isOver && !elements.length && (
            <p className="text-3xl relative text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col  w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
