'use strict';

import React, { useCallback } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './styles.css';
import { DefaultColumnDef, DefaultSideBarDef, DefaultStatusPanelDef } from '../helpers/agGrid';
import {
    ColDef,
    GridApi,
    GetRowIdParams,
    ColGroupDef,
    FirstDataRenderedEvent,
    GridReadyEvent
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

interface AGGridProps {
    items: any[],
    rowStyle?: any,
    getColumnDefs: (ColDef | ColGroupDef)[],
    prop0: string,
    prop1?: string,
    prop2?: string,
    prop3?: string,
    onRowSelected?: any
    numberOfProps?: number,
    hasMultipleProps?: boolean
}

const AGGridComponent = (props: AGGridProps) => {
    const [, setGridApi] = React.useState<GridApi | undefined>();
    /**
     * Sets row id to each row in the ag grid
     * @param params
     */
    const getRowId = useCallback((params: GetRowIdParams) => {
        if (props.hasMultipleProps) {
            if (props.prop1 && props.prop2 && props.prop3) {
                return params.data[props.prop0] + params.data[props.prop1] + params.data[props.prop2] + params.data[props.prop3];
            } else {
                return props.prop1 && props.prop2 ? params.data[props.prop0] + params.data[props.prop1] + params.data[props.prop2] : params.data[props.prop0];
            }
        } else {
            return params.data[props.prop0]
        }
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

    return <div className="ag-theme-alpine">
        <AgGridReact
            onFirstDataRendered={onFirstDataRendered}
            rowData={props.items}
            rowHeight={20}
            pagination={true}
            paginationPageSize={20}
            cellFlashDelay={2000}
            columnDefs={props.getColumnDefs}
            getRowId={getRowId}
            ensureDomOrder={true}
            rowSelection={'single'}
            onGridReady={onGridReady}
            animateRows={true}
            defaultColDef={DefaultColumnDef}
            sideBar={DefaultSideBarDef}
            statusBar={DefaultStatusPanelDef}
        >
        </AgGridReact>
    </div>

};

export default AGGridComponent