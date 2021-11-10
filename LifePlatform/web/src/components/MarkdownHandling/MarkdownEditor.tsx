import React, { useState, useEffect } from 'react';
import Editor from 'rich-markdown-editor';

function MarkdownEditor(props: any) {
  const { value, onChangeValue } = props;
  console.log(props.className);
  return (
    <>
      <div className={props.className}>
        <Editor
          defaultValue='Korte welkoms-of afscheidsboodschap'
          value={value}
          onChange={onChangeValue}
          autoFocus={true}
        />
      </div>
    </>
  );
}

export default MarkdownEditor;
