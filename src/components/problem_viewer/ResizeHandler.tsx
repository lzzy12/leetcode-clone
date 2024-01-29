import { PanelResizeHandle } from "react-resizable-panels";
import React from "react";
import { style } from "./Panel.style";

export default function ResizeHandle({ className = "", id, direction = 'horizontal' }: { className?: string; id?: string, direction?: 'vertical' | 'horizontal' }) {
    return (
        <PanelResizeHandle className={[style.ResizeHandleOuter, className].join(" ")} id={id}>
            <div className="resizeHandler"
                style={{
                    position: "relative",
                    height: '100%',
                    width: '100%',
                    borderRadius: "0.25em",
                    padding: '4px',
                    transition: "background-color 0.2s linear",

                }}
            >
                {direction == 'horizontal' ? <svg
                    style={{
                        width: "50px",
                        height: "50px",
                        position: "absolute",
                        left: "calc(50% - 0.5rem)",
                        top: "calc(50% - 0.5rem)",
                    }}
                    viewBox="0 0 50 50"
                >
                    <path
                        fill="white"
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                    />
                </svg> : <svg 
                    style={{
                        width: "50px",
                        height: "50px",
                        position: "absolute",
                        left: "calc(50% - 0.5rem)",
                        top: "calc(50% - 0.7rem)",
                    }}
                    viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="white" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter"><line x1="5.99" y1="12" x2="6" y2="12" stroke-linecap="round" stroke-width="2"></line><line x1="11.99" y1="12" x2="12" y2="12" stroke-linecap="round" stroke-width="2"></line><line x1="17.99" y1="12" x2="18" y2="12" stroke-linecap="round" stroke-width="2"></line></svg>
                }
            </div>
        </PanelResizeHandle>
    );
}