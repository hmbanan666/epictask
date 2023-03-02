import { Link, RichTextEditor } from '@mantine/tiptap';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { globalStyles } from '../utils/styles';

const TextEditor = ({
  textOnly,
  htmlContent,
  onUpdate,
}: {
  textOnly?: boolean;
  htmlContent: string | null | undefined;
  onUpdate: (value: string | null) => void;
}) => {
  const { classes } = globalStyles();

  const createdEditor = useEditor({
    injectCSS: false,
    extensions: [StarterKit, Link],
    content: htmlContent,
    onUpdate: ({ editor }) => {
      onUpdate(textOnly ? editor?.getText() : editor?.getHTML() || null);
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
            <RichTextEditor.Link />
            <RichTextEditor.CodeBlock />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default TextEditor;
