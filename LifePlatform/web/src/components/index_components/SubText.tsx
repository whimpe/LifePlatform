import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
//import draftToMarkdown from 'draftjs-to-markdown';

class SubText extends Component {
  state = {
    editorState: undefined,
  };

  onEditorStateChange: Function = (editorState: any) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          //onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          disabled
          value={
            editorState //&&
            //   draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
          }
        />
      </div>
    );
  }
}
