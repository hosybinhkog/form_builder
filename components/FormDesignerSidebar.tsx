import React from 'react';
import SidebarBtnElement from './SidebarBtnElement';
import { FormElements } from './FormElements';

const FormDesignerSidebar = () => {
  return (
    <div className="w-full max-w-[400px] flex flex-col flew-grow gap-2 border-l-2 pl-2 border-muted-foreground bg-background overflow-y-auto h-full">
      DesignerSidebar
      <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  );
};

export default FormDesignerSidebar;
