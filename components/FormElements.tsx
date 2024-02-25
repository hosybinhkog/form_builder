import React, { ReactNode } from 'react';
import { TextFieldFormElement } from './fields/TextField';
import { IconType } from 'react-icons';

export type ElementType = 'TextField';
export type FormElement = {
  type: ElementType;
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  formComponent: React.FC<{ elementInstance: FormElementInstance }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  designerBtnComponent: {
    icon: React.ReactElement | IconType | ReactNode | any;
    label: string;
  };

  construct: (id: string) => FormElementInstance;
};

export type FormElementsType = {
  [key in ElementType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};

export type FormElementInstance = {
  id: string;
  type: ElementType;
  extraAttributes?: Record<string, any>;
};
