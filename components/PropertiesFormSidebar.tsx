import React from 'react';
import useDesigner from './hooks/useDesigner';
import { FormElements } from './FormElements';
import { Button } from './ui/button';
import { AiOutlineClose } from 'react-icons/ai';
import { Separator } from './ui/separator';

const PropertiesFormSidebar = () => {
  const { selectElement, setSelectElement } = useDesigner();
  if (!selectElement) return;
  const PropertiesForm = FormElements[selectElement?.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => {
            setSelectElement(null);
          }}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectElement} />
    </div>
  );
};

export default PropertiesFormSidebar;
