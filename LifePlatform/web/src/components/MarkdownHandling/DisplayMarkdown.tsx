import React, { useState, useEffect } from 'react';
import MarkDown from 'markdown-to-jsx';

function DisplayMarkdown(props: any) {
  //TODO cleanup example markdown code
  const markdownExample = `---
You will like those projects!
---

# h1 Test smarkdownheader 8-)

## h2 SubheaderTest

### h3 Heading

#### h4 Heading
`;
  const [text, setText] = useState('');

  useEffect(() => {
    /* import(`./markdownExample/${markdownFromUser}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text)
          .then((res) => setText(res));
      })
      .catch((err) => console.log(err));
      */

    //TODO
    //Load text (markdown) from user

    setText(props.subText);

    //Set text as normal text
    //  setText(props.subText);
  });

  return (
    <>
      <MarkDown>{text}</MarkDown>
    </>
  );
}

export default DisplayMarkdown;
