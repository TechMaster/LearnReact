import React, { createContext, useState, useRef } from 'react';
import TableButton from './TableButton';
import {generateTable, formatMarkdownTable } from './markdown-table';

// Định nghĩa AppContext
export const AppContext = createContext({ selectedText: '', setSelectedText: (text: string) => {} });

const App = () => {
  const [selectedText, setSelectedText] = useState('');
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSelect = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = event.target as HTMLTextAreaElement;
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    console.log(selectedText);
    
    setSelectedText(selectedText);

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
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const table = generateTable(row, column).join('\n');
      const newText = text.substring(0, start) + table + text.substring(end);
      setText(newText);
    }
  };

  return (
    <AppContext.Provider value={{ selectedText, setSelectedText }}>
      <div style={{ margin: '15px'}}>
        <TableButton 
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
    </AppContext.Provider>
  );
};

export default App;