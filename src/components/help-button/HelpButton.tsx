import { useRef, useState } from "react";
import { Overlay } from "react-bootstrap";
import { IHelpButtonParams } from "./helpButtonParams";
import "./css/style.css";

const HelpButton = ({ text }: IHelpButtonParams) => {
    const target = useRef(null);
    const [show, setShow] = useState(false);

    return (
        <>
            <div className="help-button" ref={target} onClick={() => setShow(!show)}>
                <span>?</span>
            </div>
            <Overlay target={target.current} show={show} placement="right">
            {({
                placement: _placement,
                arrowProps: _arrowProps,
                show: _show,
                popper: _popper,
                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                ...props
            }) => (
                <div
                    {...props}
                    style={{
                        position: 'absolute',
                        backgroundColor: '#0dcaf0',
                        padding: '2px 10px',
                        color: 'white',
                        borderRadius: 3,
                        zIndex: 99999,
                        maxWidth: "300px",
                        fontSize: "14px",
                        ...props.style,
                    }}
                    onClick={() => setShow(false)}
                >
                    {text}
                </div>
            )}
            </Overlay>
        </>
    );
}

export default HelpButton;