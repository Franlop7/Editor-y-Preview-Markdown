import { EditorState } from "@codemirror/state";
import React, { useCallback, useEffect } from "react";
import { codeMirror } from "./codemirror";
import './editor.css';

interface Props {
    initialDoc: string,
    onChange: (doc: string) => void
}

export const Editor: React.FC<Props> = (props) => {
    const { onChange, initialDoc } = props
    const handleChange = useCallback(
        (state: EditorState) => onChange(state.doc.toString()),
        [onChange]
    )
    const [refContainer, editorView] = codeMirror<HTMLDivElement>({
       initialDoc: initialDoc,
       onChange: handleChange
    })

    useEffect(() => {
        if (editorView) {
            // Nada por ahora
        }
    }, [editorView])

    return <div className="editor-wrapper" ref={refContainer}></div>
}