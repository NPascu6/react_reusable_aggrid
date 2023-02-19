import { ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import moment from 'moment';
import CustomTooltip from '../grid/components/CustomTooltip';

/**
 * Sets the ag-grid theme based on the selected theme in the app
 * @param isDark
 */
export const getGridTheme = (isDark: boolean): string => {
    return isDark ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';
};

/**
 * Cell getter for getting date
 * @param params
 */
export const dateValueGetter = (params: ValueGetterParams) => {
    if (params.data) return moment(params.data.timestamp).startOf('day');
    else return ""
};

/**
 * Cell formatter for formatting date in the specific format "MMMM.DD.YYYY"
 * @param params
 */
export const dateValueFormatter = (params: ValueFormatterParams) => {
    if (params.value) return moment(new Date(params.value)).format('MMMM.DD.YYYY');
    return params.value;
};

/**
 * Cell formatter for formatting time in the specific format "HH:mm:ss"
 * @param params
 */
export const timeValueFormatter = (params: ValueFormatterParams) => {
    if (params.value) return moment(params.value).format('HH:mm:ss');
    return params.value;
};

/**
 * Cell formatter for formatting date and time in the specific format "MMMM.DD.YYYY; HH:mm:ss"
 * @param params
 */
export const dateTimeValueFormatter = (params: ValueFormatterParams) => {
    if (params.value) return moment(params.value).format('MMMM.DD.YYYY, HH:mm:ss');
    return params.value;
};

/**
 * Cell formatter for formatting guid
 * @param params
 */
export const guidValueFormatter = (params: ValueFormatterParams) => {
    if (params.value) {
        const parts = params.value.split('-');
        return parts[0];
    }
    return params.value;
};

/**
 * Cell formatter for formatting string to convert it to upper casse
 * @param params
 */
export const capitalizeLetterCellFormatter = (params: ValueFormatterParams) => {
    if (params.value) {
        return params.value.toUpperCase();
    }
    return params.value;
};

export const capitalizeFirstLetterCellFormatter = (params: ValueFormatterParams) => {
    if (params.value) {
        return params.value.charAt(0).toUpperCase() + params.value.slice(1);
    }
    return params.value;
}

/**
 * Setting ag-grid default column definitions
 */
export const DefaultColumnDef = {
    enableCellChangeFlash: true,
    sortable: true,
    resizable: true,
    filter: true,
    editable: true,
    flex: 1,
    tooltipComponent: CustomTooltip,
};