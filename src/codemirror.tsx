import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { languages } from '@codemirror/language-data';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';
import { tags } from '@lezer/highlight';
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import classes from './styles.module.css';

const stylesEditor = HighlightStyle.define([
  { tag: tags.heading1, class: classes.h1},
  { tag: tags.heading2, class: classes.h2},
  { tag: tags.heading3,class: classes.h3},
]);

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
        markdown({
          codeLanguages: languages,
        }),
        syntaxHighlighting(stylesEditor),
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