'use client';

import { ElementType, FormElement } from '../FormElements';

const type: ElementType = 'TextField';

export const TextFieldFormElement: FormElement = {
  type,
  designerComponent: () => <div>Design components</div>,
  formComponent: () => <div>Form components</div>,
  propertiesComponent: () => <div>Properties components</div>,
};
