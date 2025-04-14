"use client";

import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from "lexical";

import { ToolbarContext } from "@/components/editor/context/toolbar-context";
import { useEditorModal } from "@/components/editor/editor-hooks/use-modal";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] = useState<string>("paragraph");
  const [modal, showModal] = useEditorModal();

  const $updateToolbar = () => {
    // Add logic here
  };

  useEffect(() => {
    return activeEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [activeEditor]);

  return (
    <ToolbarContext
      activeEditor={activeEditor}
      $updateToolbar={$updateToolbar}
      blockType={blockType}
      setBlockType={setBlockType}
      showModal={showModal}
    >
      {modal}

      {/* Render toolbar content directly here */}
      <div>{blockType}</div>
    </ToolbarContext>
  );
}
