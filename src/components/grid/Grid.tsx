'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './styles.css';
import {
    ColDef,
    GetRowIdFunc,
    GetRowIdParams,
    RowSelectedEvent,
    ValueFormatterParams,
} from 'ag-grid-community';

interface ICar {
    make: string;
    model: string;
    price: number;
}

const GridExample = () => {
    const gridRef = useRef<AgGridReact<ICar>>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData,] = useState<ICar[]>([
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 },
    ]);
    const [columnDefs,] = useState<ColDef[]>([
        { headerName: 'Make', field: 'make' },
        { headerName: 'Model', field: 'model' },
        {
            headerName: 'Price',
            field: 'price',
            valueFormatter: (params: ValueFormatterParams<ICar, number>) => {
                // params.value: number
                return '£' + params.value;
            },
        },
    ]);
    const getRowId = useMemo<GetRowIdFunc>(() => {
        return (params: GetRowIdParams<ICar>) => {
            // params.data : ICar
            return params.data.make + params.data.model;
        };
    }, []);

    const onRowSelected = useCallback((event: RowSelectedEvent<ICar>) => {
        // event.data: ICar | undefined
        if (event.data) {
            const price = event.data.price;
            console.log('Price with 10% discount:', price * 0.9);
        }
    }, []);

    const onShowSelection = useCallback(() => {
        // api.getSelectedRows() : ICar[]
        const cars: ICar[] = gridRef.current!.api.getSelectedRows();
        console.log(
            'Selected cars are',
            cars.map((c) => `${c.make} ${c.model}`)
        );
    }, []);

    return (
        <div style={containerStyle}>
            <div className="test-container">
                <div className="test-header">
                    <button onClick={onShowSelection}>Log Selected Cars</button>
                </div>

                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact<ICar>
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        rowSelection={'multiple'}
                        getRowId={getRowId}
                        onRowSelected={onRowSelected}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default GridExample