import React, { useMemo } from 'react';
import { ITooltipParams } from 'ag-grid-community';

const Tootltip = (props: ITooltipParams & { color: string }) => {
    const data = useMemo(
        () => props.api.getDisplayedRowAtIndex(props.rowIndex!)!.data,
        [props.api, props.rowIndex]
    );

    return (
        <div className='tooltip'>
            {
                Object.keys(data).map((key) => {
                    return (
                        <div key={key} style={{ display: 'flex', padding: '0.5em', backgroundColor: 'white', flexDirection: 'row' }}>
                            <span>{key}:{data[key]}</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Tootltip;