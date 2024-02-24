import React from 'react';
import { TextFieldFormElement } from './fields/TextField';

export type ElementType = 'TextField';
export type FormElement = {
  type: ElementType;
  designerComponent: React.FC;
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

type FormElementsType = {
  [key in ElementType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
