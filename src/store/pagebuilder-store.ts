import { createStore } from 'zustand/vanilla';

export type PageBuilderState = {
  showFieldSelection: boolean;
  fieldType: number | null;
  pageBuilderData: PageBuilder | null;
  fieldConfigData: FieldConfig | null;
};

export type PageBuilderActions = {
  proceedToFieldSelection: (showSelection: boolean) => void;
  setPageBuilderData: (data: PageBuilder | null) => void;
  setFieldType: (fieldType: number | null) => void;
  setFieldConfigData: (data: FieldConfig) => void;
};

export type PageBuilderStore = PageBuilderState & PageBuilderActions;

export const initPageBuilderStore = (): PageBuilderState => {
  return {
    showFieldSelection: false,
    fieldType: null,
    pageBuilderData: null,
    fieldConfigData: null,
  };
};

export const defaultInitState: PageBuilderState = {
  showFieldSelection: false,
  fieldType: null,
  pageBuilderData: null,
  fieldConfigData: null,
};

export const createPageBuilderStore = (
  initState: PageBuilderState = defaultInitState
) => {
  return createStore<PageBuilderStore>()((set) => ({
    ...initState,
    proceedToFieldSelection: (showSelection: boolean) =>
      set((state) => ({ ...state, showFieldSelection: showSelection })),
    setFieldType: (fieldType) => set((state) => ({ ...state, fieldType })),
    setPageBuilderData: (data) =>
      set((state) => ({ ...state, pageBuilderData: data })),
    setFieldConfigData: (data) =>
      set((state) => ({ ...state, fieldConfigData: data })),
  }));
};
