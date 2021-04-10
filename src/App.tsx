import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import { orderBy } from 'lodash';

import styles from './App.module.scss';
import Button from 'react-bootstrap/Button';

export default function App() {

    const [columns, setColumns] = useState<any>([]);
    const [data, setData] = useState<any>([]);

    const [selectedRow, setSelectedRow] = useState<any>([]);

    // process CSV data
    const processData = (dataString: any) => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length == headers.length) {
                const obj: any = {};
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] == '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] == '"')
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
        const columns = headers.map((c: any) => ({
            name: c,
            selector: c,
        }));

        setData(list);
        setColumns(columns);
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

            console.log(data);

            processData(data);
        };
        reader.readAsBinaryString(file);
    }

    const handleChange = (state: any) => {
        setSelectedRow(state.selectedRows);
    };

    const handleSort = (column: any, sortDirection: any) => {
        // simulate server sort
        // setLoading(true);

        // instead of setTimeout this is where you would handle your API call.
        setTimeout(() => {
            setData(orderBy(data, column.selector, sortDirection));
            // setLoading(false);
        }, 100);
    };

    return (
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

                {/* {selectedRow.length > 0 &&
                    <Button
                        className="mt-2 mb-2"
                        variant="danger"
                        onClick={() => { }}
                    >
                        Clear selection
                    </Button>
                } */}

            </div>

            <div className={styles.upload}>

                <DataTable
                    title="G-Tech Barcode Generator"
                    pagination
                    highlightOnHover
                    columns={columns}
                    data={data}
                    theme="solarized"
                    selectableRows
                    onSelectedRowsChange={handleChange}
                    paginationRowsPerPageOptions={[10, 20, 50, 100, 200]}
                    defaultSortField="id"
                    defaultSortAsc={false}
                    onSort={handleSort}
                // fixedHeader
                />

            </div>

        </div>
    )
}