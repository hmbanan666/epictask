import { Link, RichTextEditor } from '@mantine/tiptap';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { globalStyles } from '../utils/styles';
import { countWords } from '../utils/helpers';

const TextEditor = ({
  htmlContent,
  onUpdate,
  textOnly,
  wordsCount,
}: {
  htmlContent: string | null | undefined;
  onUpdate: (value: string | null) => void;
  textOnly?: boolean;
  wordsCount?: boolean;
}) => {
  const { classes } = globalStyles();

  const [wordCount, setWordCount] = useState(
    countWords(htmlContent || '') || 0
  );

  const createdEditor = useEditor({
    injectCSS: false,
    extensions: [StarterKit, Link],
    content: htmlContent,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const html = editor.getHTML();

      onUpdate(textOnly ? text : html || null);
      setWordCount(countWords(text));
    },
  });

  return (
    <RichTextEditor
      editor={createdEditor}
      classNames={{
        root: classes.coolTextEditorRoot,
        content: classes.coolTextEditorContent,
      }}
    >
      {createdEditor && (
        <BubbleMenu editor={createdEditor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
            <RichTextEditor.CodeBlock />
            <RichTextEditor.Link />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
      {wordsCount && (
        <div
          style={{
            textAlign: 'center',
            marginTop: 10,
            fontStyle: 'italic',
            opacity: 0.4,
          }}
        >
          Кол-во слов: <b>{wordCount}</b>. Хороший показатель: 500-800 слов.
        </div>
      )}
    </RichTextEditor>
  );
};

export default TextEditor;
