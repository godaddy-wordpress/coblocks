export const getDesignResp = ( state ) => state.designResp;

export const getDesignStyle = ( state ) => state.designStyle;

export const getDesignStyles = ( state ) => state.designStyles;

export const getDesignStyleObj = ( state ) => state.designStyles?.find( ( design ) => design.slug === state.designStyle );

export const getColorPalette = ( state ) => state.colorPalette;

export const getCurrentColors = ( state ) => state.currentColors;

export const getFontSize = ( state ) => state.fontSize;

export const getTypeRatio = ( state ) => state.typeRatio;

export const getFonts = ( state ) => state.fonts;

export const showSaveBtn = ( state ) => state.showSaveBtn;

export const getSelectedFonts = ( state ) => state.selectedFonts;

export const isFontsPanelOpen = ( state ) => state.fontsPanelOpen;

export const isColorsPanelOpen = ( state ) => state.colorsPanelOpen;

export const isDesignsPanelOpen = ( state ) => state.designsPanelOpen;

export const isUpdating = ( state ) => state.isUpdating;
