import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { defaultKeymap } from '@codemirror/commands';
import { EditorView, keymap } from '@codemirror/view';
import { languages } from '@codemirror/language-data';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';

interface Props {
  initialDoc: string;
  onChange?: (state: EditorState) => void;
}

export const codeMirror = <T extends Element>(
  props: Props
): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();
  const { onChange } = props;

  useEffect(() => {
    if (!refContainer.current) return;
    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
    });
    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });
    setEditorView(view);
    return () => {
      view.destroy();
    };
  }, [refContainer]);
  return [refContainer, editorView];
};