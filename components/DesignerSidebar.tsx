import React from 'react';
import FormDesignerSidebar from './FormDesignerSidebar';
import useDesigner from './hooks/useDesigner';
import PropertiesFormSidebar from './PropertiesFormSidebar';

const DesignerSidebar = () => {
  const { selectElement } = useDesigner();
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectElement && <FormDesignerSidebar />}
      {selectElement && <PropertiesFormSidebar />}
    </aside>
  );
};

export default DesignerSidebar;
