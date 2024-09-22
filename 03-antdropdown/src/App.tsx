import React, { useState, useRef } from 'react';
import TableButton from './TableButton';
import {generateTable, isMarkdownTable, formatMarkdownTable } from './markdown-table';

const App = () => {
  const [selectedText, setSelectedText] = useState('');
  const [isTableSelected, setTableSelected] = useState(false);
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSelect = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = event.target as HTMLTextAreaElement;
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    setSelectedText(selectedText);
    //setTableSelected(selectedText !== '' );
    setTableSelected(isMarkdownTable(selectedText));
  };

  const formatSelectedTable = () => {
    const formattedTable = formatMarkdownTable(selectedText).join('\n');
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newText = text.substring(0, start) + formattedTable + text.substring(end);
      setText(newText);
    }
  };

  const generateMarkdownTable = (row: number, column: number) => {
    //setText(text + '\n' + generateTable(row, column).join('\n'));
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const table = generateTable(row, column).join('\n');
      const newText = text.substring(0, start) + table + text.substring(end);
      setText(newText);
    }
  };

  return (
    <div style={{ margin: '15px'}}>
      <TableButton 
        isTableSelected={isTableSelected}
        onFormatSelectedTable={formatSelectedTable} // Truyền hàm handleUpperCase
        onGenerateTable={generateMarkdownTable} // Truyền hàm handleAppendText  
      />
      <textarea
        ref={textareaRef}
        placeholder="Nhập văn bản ở đây" 
        style={{width: '800px', height: '400px', fontSize: '150%', fontFamily: 'monospace' }} 
        onSelect={handleSelect}
        value={text}
        onChange={(e) => setText(e.target.value)}>
      </textarea>
      <p>Selected Text: {selectedText}</p>
    </div>
  );
};

export default App;