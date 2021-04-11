import React, { useCallback, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import * as XLSX from 'xlsx';
import { orderBy } from 'lodash';
import { FaBarcode } from 'react-icons/fa';

import Button from 'react-bootstrap/Button';

import styles from "./TableViewScreen.module.scss";
import { BiReset } from 'react-icons/bi';

const TableViewScreen: React.FC<TableViewScreenProps> = (props) => {

    const { handleSelectedRow, handleSettings, selectedRow, columns, data, handleColumns, handleData, count, handleCount } = props;

    const initialSetting = {
        loading: false,
    };

    const [settings, setSettings] = useState<any>(initialSetting);

    let tableData = {
        columns,
        data,
    };

    // process CSV data
    const processData = (dataString: any) => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length === headers.length) {
                const obj: any = {};
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] === '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] === '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        obj[headers[j]] = d;
                    }
                }

                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                }
            }
        }

        // prepare columns list from headers
        // const columns = headers.map((c: any) => ({
        //     name: c,
        //     selector: c,
        //     sortable: true
        // }));

        const columnsDef = [
            {
                name: 'Name',
                selector: 'Name',
                sortable: true,
            },
            {
                name: 'Name',
                selector: 'Name',
                sortable: true,
            },
            {
                name: 'SKU',
                selector: 'SKU',
                sortable: true,
            },
            {
                name: 'Barcode',
                selector: 'Barcode',
                sortable: true,
            },
            {
                name: 'Cost',
                selector: 'Cost',
                sortable: true,
            },
            {
                name: 'Prize',
                selector: 'Prize',
                sortable: true,
            },
        ];

        handleColumns(columnsDef);
        handleData(list);
    }

    // handle file upload
    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt: any) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws);

            processData(data);
        };
        reader.readAsBinaryString(file);
    }

    const handleChange = useCallback((state: any) => {
        handleSelectedRow(state.selectedRows);
    }, [handleSelectedRow]);

    const handleSort = (column: any, sortDirection: any) => {
        setSettings({
            ...settings,
            loading: true
        });

        setTimeout(() => {
            handleData(orderBy(data, column.selector, sortDirection));
            setSettings({
                ...settings,
                loading: false
            });
        }, 100);
    };

    const handleBarcode = useCallback(() => {
        handleSettings(true);
    }, [handleSettings]);

    const handleReset = useCallback(() => {
        window.location.reload();
    }, []);

    const handleChangeCount = (e: any) => {
        handleCount(e.target.value);
    }

    return useMemo(() => (

        <div className="container">

            <div className={styles.upload}>
                <div className="alert alert-info">
                    <strong>Upload .csv files here</strong>
                </div>
                <input
                    type="file"
                    className="form-control file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                />

                {(selectedRow.length > 0) &&

                    <div className={styles.buttonContainer}>

                        <div className={styles.row}>

                            <input
                                type="number"
                                className="form-control mr-2"
                                style={{ width: 100 }}
                                value={count}
                                onChange={handleChangeCount}
                                min="1"
                            />

                            <Button
                                className="mt-4 mb-4 block"
                                variant="primary"
                                onClick={handleBarcode}
                            >
                                <FaBarcode />&nbsp; Barcode
                        </Button>

                        </div>

                        <Button
                            className="mt-4 mb-4"
                            variant="danger"
                            onClick={handleReset}
                        >
                            <BiReset />&nbsp; Reset
                        </Button>


                    </div>
                }

            </div>

            <div className={styles.upload}>

                <DataTableExtensions
                    {...tableData}
                    export={false}
                    print={false}
                >

                    <DataTable
                        title="G-Tech Barcode Generator"
                        pagination
                        highlightOnHover
                        columns={columns}
                        data={data}
                        theme="solarized"
                        selectableRows
                        onSelectedRowsChange={handleChange}
                        paginationRowsPerPageOptions={[10, 20, 50, 100, data.length || 500]}
                        defaultSortField="Barcode"
                        defaultSortAsc={false}
                        subHeader
                        striped
                        paginationComponentOptions={{ rowsPerPageText: 'Rows per page:', rangeSeparatorText: 'of', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'All' }}
                        responsive
                    // dense
                    // fixedHeader
                    />

                </DataTableExtensions>

            </div>

        </div>

    ), [columns, data, selectedRow, count]);
};

interface TableViewScreenProps {
    [key: string]: any;
}

export default TableViewScreen;
