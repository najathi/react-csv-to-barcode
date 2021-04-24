import React, { Fragment, useCallback, useRef, PureComponent } from "react";
import { BiArrowBack } from 'react-icons/bi';
import { TiPrinter } from 'react-icons/ti';
import Button from "react-bootstrap/esm/Button";
import { useReactToPrint } from "react-to-print";
// @ts-ignore
import Print from "rc-print";

import Barcode from "src/elements/Barcode/Barcode";

import styles from "./BarcodeScreen.module.scss";
// import ComponentToPrint from "src/elements/ComponentToPrint/ComponentToPrint";


const BarcodeScreen: React.FC<BarcodeScreenProps> = (props) => {

    const { handleSettings, selectedRow, count } = props;

    const componentRef: any = useRef();

    let printDom: any = null;

    const data = (selectedRow || [])
        .map((item: any) => {

            let res = [];

            for (let i = 0; i < count; i++) {
                res.push(item);
            }

            return [...res];
        });

    const handleBack = useCallback(() => {
        handleSettings(false);
    }, []);

    const handlePrintLabel = useReactToPrint({
        content: () => componentRef.current,
        // pageStyle: "@page { size: 62mm 29mm}",
        pageStyle: "@page { size: 50mm 25mm}",
        // pageStyle: "@page { size: 38mm 25mm}",
        // pageStyle: "@page { size: 76.20mm 50.80mm}",
        // pageStyle: "@page { width: 76.20mm height:50.80mm}",
        // pageStyle: "@page { width: 62mm, height: 29mm}",
        onAfterPrint: () => { handleBack.bind(null) },
    });

    return (

        <div className="container">

            <div className={styles.wrapper}>

                <div className={styles.header}>

                    <div
                        className={styles.backIcon}
                        onClick={handleBack}
                    >
                        <BiArrowBack />
                    </div>
                    <div>
                        <Button
                            className="text-white"
                            variant="warning"
                            // onClick={handlePrintLabel}
                            onClick={() => {
                                printDom.onPrint();
                            }}
                        >
                            <TiPrinter />&nbsp; Print Label
                        </Button>

                        <Print
                            ref={(myPrint: any) => printDom = myPrint} lazyRender isIframe={false}
                            title="G-Tech Barcode"
                        >
                            {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                                {(data || []).map((item: any, index: number) => (

                                    <div
                                        style={{ display: 'flex', flexWrap: 'wrap' }}
                                        key={index}
                                    >

                                        {item.map((element: any, key: number) => (

                                            <div style={{ flex: '50%' }} key={key}>

                                                <span>{element.Name}</span><br />

                                                <Barcode barcode={element.Barcode} /><br />

                                                <span>Rs. {element.Price}</span>

                                            </div>

                                        ))}

                                    </div>

                                ))}
                            </div> */}

                            <div style={{ display: 'flex', flexWrap: 'wrap', width: 550, padding: 0, margin: 0 }}>

                                {(selectedRow || []).map((element: any, index: number) => (

                                    <div style={{ width: '50%', margin: '1.5rem 1rem 1rem 0', padding: 0, alignSelf: 'center' }} key={index}>

                                        <p>{element.Name}</p><br />

                                        <Barcode barcode={element.Barcode} />

                                        <p>Rs. {element.Price}</p>

                                    </div>

                                ))}

                            </div>

                        </Print>


                    </div>

                </div>

            </div>

            <div>

                <p>Products: <strong>{selectedRow.length}</strong></p>
                <p>No. copies: <strong>{count}</strong></p>
                <p>Total copies: <strong>{+count * selectedRow.length}</strong></p>
                <br />

            </div>

            {/* <div style={{ display: 'flex', flexDirection: 'row' }}>

                {(data || []).map((item: any, index: number) => (

                    <div style={{ display: 'flex', flexDirection: 'column', width: '106mm', height: '29mm' }} key={index}>

                        {item.map((element: any, key: number) => (

                            <div style={{ width: '50mm', height: '25mm' }} key={key}>

                                <Barcode barcode={element.Barcode} />

                            </div>

                        ))}

                    </div>

                ))}

            </div> */}

            <ComponentToPrint
                ref={componentRef}
                data={data}
            />

        </div >

    );
};

interface BarcodeScreenProps {
    [key: string]: any;
}

export default BarcodeScreen;

export class ComponentToPrint extends PureComponent<ComponentToPrintProps, ComponentToState> {

    render() {
        return (
            <div className={styles.printSource}>

                {(this.props.data || []).map((item: any, index: number) => (

                    <div className="col-12" style={{ padding: 0, margin: 0 }} key={index}>

                        {item.map((element: any, key: number) => (

                            <div className="col-12" key={key} >
                                <span>{element.Name}</span><br />

                                <Barcode barcode={element.Barcode} /><br />

                                <span>Rs. {element.Price}</span>

                            </div>

                        ))}

                    </div>

                ))}

            </div>
        );
    }
};

interface ComponentToPrintProps {
    [key: string]: any;
}

interface ComponentToState {
    [key: string]: any;
}
