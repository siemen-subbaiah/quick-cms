interface DrawerProps {
  launchMode: 'create' | 'edit' | 'add' | 'edit-form';
  editProps?: Field;
  pageId?: number;
  editPageProps?: PageBuilder | null;
}

interface PageBuilder {
  displayName: string;
  apiName: string;
  description: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdUserId?: string;
  createdUserName?: string;
}

interface FieldConfig {
  id?: number;
  pageId?: number;
  fieldType: number;
  fieldName: string;
  defaultValue: string | undefined;
  isRequired: boolean;
  isShortText: boolean | null;
}

interface Field {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdUserId: string;
  createdUserName: string;
  fieldType: number;
  fieldName: string;
  defaultValue: string | null;
  isRequired: boolean | null;
  isShortText: boolean | null;
  value: string | null;
  pageId: number;
}

interface StateField {
  id: number;
  fieldType: number;
  fieldName: string;
  value: string;
  defaultValue: string | null;
  isRequired: boolean;
  isShortText: boolean | null;
}

export interface Page extends PageBuilder {
  fields: Field[];
}
