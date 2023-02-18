import React, { useCallback, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '..styles/iconStyles.css';
import '..styles/gridStyles.css';
import {
    ColDef,
    GridApi,
    GetRowIdParams,
    ColGroupDef,
    FirstDataRenderedEvent,
    GridReadyEvent,
    CellEditingStartedEvent,
    CellEditingStoppedEvent,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import CustomTooltip from '../helpers/CustomTooltip';

const DefaultColumnDef = {
    enableCellChangeFlash: true,
    editable: true,
    sortable: true,
    flex: 1,
    filter: true,
    resizable: true,
    tooltipComponent: CustomTooltip,
};

interface AGGridProps {
    items: any[];
    rowStyle?: React.CSSProperties;
    getColumnDefs: (ColDef | ColGroupDef)[];
    rowKey: string;
    onRowSelected?: any
    showPagination?: boolean;
    defaultRowsPerPage?: number;
    loadingMessage?: string;
    gridStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    tooltipField?: string;
    rowHeight?: number;
    suppressMenu?: boolean;
    enableRangeSelection?: boolean;
    showHeaderFilterIcon?: boolean;
    onCellEditingStarted?: (event: CellEditingStartedEvent) => void;
    onCellEditingStopped?: (event: CellEditingStoppedEvent) => void;
}

/**
 * Aggrid props:
 * @param items: any[] - data to be displayed in the grid
 * @param rowStyle?: React.CSSProperties - style for the row
 * 
 * ---------------------------------------------------------------------------------------------------------------------
 * 
 * @param getColumnDefs: (ColDef | ColGroupDef)[] - column definitions for the grid :
 * 
 * {
 * 
 *  @param headerName:string, 
 *  @param field=string, 
 *  @param width?=number, 
 *  @param height?=number,
 *  @param minWidth?: =number, 
 *  @param minHeight?=number,
 *  @param maxWidth?=number, 
 *  @param maxHeight?=number,
 *  @param sortable?=boolean,
 *  @param enableRowGroup?=boolean,
 *  @param tootltipField?=string,
 *  @param type?=['dateColumn', 'numberColumn', 'textColumn', 'nonEditableColumn'],
 *  @param editable?=boolean,
 *  @param filter?='agTextColumnFilter', 'agNumberColumnFilter', 'agDateColumnFilter',
 *  @param cellStyle?=(params: any) => React.CSSProperties,
 *  @param cellRenderer?=(params: any) => React.ReactNode,
 *  @param cellEditor?=(params: any) => React.ReactNode,
 *  @param valueFormatter?=(params: any) => React.ReactNode,
 *  @param valueGetter?=(params: any) => React.ReactNode,
 *  @param valueSetter?=(params: any) => React.ReactNode,
 *  @param onCellValueChanged?=(params: any) => React.ReactNode,
 *  @param onCellEditingStarted?=(params: any) => React.ReactNode,
 *  @param onCellEditingStopped?=(params: any) => React.ReactNode,
 *  @param onCellFocused?=(params: any) => React.ReactNode,
 *  @param onCellClicked?=(params: any) => React.ReactNode,
 *  @param onCellDoubleClicked?=(params: any) => React.ReactNode,
 *  @param onCellContextMenu?=(params: any) => React.ReactNode,
 *  @param rowHeight?=number,    
 *  @param rowGroup?=boolean,
 *  @param rowDrag?=boolean,
 *  @param sort?=string, 'asc', 'desc'
 *  @param pinned?=string, 'left', 'right'
 *  @param lockPosition?=boolean,
 *  @param cellClass?=(params: any) => string | string[],
 *  @param children?=(ColDef | ColGroupDef)[], 
 *  @param headerClass?=(params: any) => string | string[],
 *  @param menuIcon:string,
 *  @param toolPanel:string,
 *  @param toolPanelParams?:any

 * }

 * ---------------------------------------------------------------------------------------------------------------------

 * @param onCellEditingStarted?=(event: CellEditingStartedEvent) => void, method with param event for cell editing start contains property data of the row.
 * @param onCellEditingStopped?=(event: CellEditingStoppedEvent) => void,
 * @param rowKey: string - row id (unique key - property name)
 * @param onRowSelected?: any - callback for row selection
 * @param showPagination?: boolean - show pagination
 * @param defaultRowsPerPage?: number - default rows per page
 * @param loadingMessage?: string - loading message
 * @param gridStyle?: React.CSSProperties - style for the grid
 * @param containerStyle?: React.CSSProperties - style for the container
 */
const AGGridComponent = (props: AGGridProps) => {
    const [, setGridApi] = React.useState<GridApi | undefined>();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%', padding: '0.5em' }), []);

    /**
     * Sets row id to each row in the ag grid
     * @param params
     */
    const getRowId = useCallback((params: GetRowIdParams) => {
        return params.data[props.rowKey]
    }, [props]);

    /**
     * Sets colum to fit on start
     * @param params
     */
    const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
        params.api.sizeColumnsToFit();
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setGridApi(params.api);
    }, []);

    const onCellEditingStarted = useCallback((event: CellEditingStartedEvent) => {
        console.log('cellEditingStarted', event);
    }, []);

    const onCellEditingStopped = useCallback((event: CellEditingStoppedEvent) => {
        console.log('cellEditingStopped', event);
    }, []);

    const getRowStyle = useCallback((params: any) => {
        return props.rowStyle ?? { ...params.data.style };
    }, [props.rowStyle]);

    return <div style={props.containerStyle ?? containerStyle}>
        <div style={props?.gridStyle ?? gridStyle} className="ag-theme-alpine">
            <AgGridReact
                onFirstDataRendered={onFirstDataRendered}
                rowData={props.items}
                rowHeight={props.rowHeight ?? 40}
                pagination={props?.showPagination}
                paginationPageSize={props?.defaultRowsPerPage ?? 10}
                cellFlashDelay={1000}
                columnDefs={props?.getColumnDefs}
                getRowId={getRowId}
                tooltipShowDelay={150}
                ensureDomOrder={true}
                suppressMenuHide={props?.showHeaderFilterIcon ?? true}
                rowSelection={'single'}
                onGridReady={onGridReady}
                onCellEditingStarted={onCellEditingStarted ?? null}
                onCellEditingStopped={onCellEditingStopped ?? null}
                getRowStyle={getRowStyle}
                overlayLoadingTemplate={
                    props?.loadingMessage ?? '<span class="ag-overlay-loading-center">Please wait, loading...</span>'
                }
                animateRows={true}
                defaultColDef={DefaultColumnDef}
            >
            </AgGridReact>
        </div>
    </div>


};

export default AGGridComponent