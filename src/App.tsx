import React, { useCallback, useState } from 'react';

import styles from './App.module.scss';

import TableViewScreen from './screens/TableViewScreen/TableViewScreen';
import BarcodeScreen from './screens/BarcodeScreen/BarcodeScreen';

export default function App() {

    const initialSetting = {
        barcodeMode: false
    };

    const [settings, setSettings] = useState<any>(initialSetting);

    const [selectedRow, setSelectedRow] = useState<any>([]);

    const handleSettingsChange = useCallback((state: boolean) => {
        setSettings({
            ...settings,
            barcodeMode: state
        });
    }, [settings]);

    const handleChangeSelectedRow = useCallback((state: Array<any>) => {
        setSelectedRow(state);
    }, [selectedRow]);

    if (settings.barcodeMode) {
        return <BarcodeScreen handleSettings={handleSettingsChange} />;
    }

    return (
        <TableViewScreen
            handleSettings={handleSettingsChange}
            handleSelectedRow={handleChangeSelectedRow}
            selectedRow={selectedRow}
        />
    )
}