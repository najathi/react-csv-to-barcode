import React, { useCallback, useState } from 'react';

import styles from './App.module.scss';

import TableViewScreen from './screens/TableViewScreen/TableViewScreen';
import BarcodeScreen from './screens/BarcodeScreen/BarcodeScreen';

export default function App() {

    const initialSetting = {
        barcodeMode: false
    };

    const [settings, setSettings] = useState<any>(initialSetting);

    const [columns, setColumns] = useState<any>([]);
    const [data, setData] = useState<any>([]);

    const [selectedRow, setSelectedRow] = useState<any>([]);

    console.log('selectedRow', selectedRow);

    const handleSettingsChange = useCallback((state: boolean) => {
        setSettings({
            ...settings,
            barcodeMode: state
        });
    }, [settings]);

    const handleChangeSelectedRow = useCallback((state: Array<any>) => {
        setSelectedRow(state);
    }, [selectedRow]);

    const handleChangeColumns = useCallback((state: any) => {
        setColumns(state);
    }, [columns]);

    const handleChangeData = useCallback((state: any) => {
        setData(state);
    }, [data]);

    if (settings.barcodeMode) {
        return (<BarcodeScreen
            handleSettings={handleSettingsChange}
            selectedRow={selectedRow}
        />);
    }

    return (
        <TableViewScreen
            handleSettings={handleSettingsChange}
            handleSelectedRow={handleChangeSelectedRow}
            selectedRow={selectedRow}
            handleColumns={handleChangeColumns}
            handleData={handleChangeData}
            columns={columns}
            data={data}
        />
    )
}