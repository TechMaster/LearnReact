export function isMarkdownTable(text: string): boolean {
  // Match the header row and capture the number of columns
  const headerRegex = /^\s*\|(.+?)\|\s*$/gm;
  const separatorRegex = /^\s*\|(?:\s*[-:]+\s*\|)+\s*$/gm;

  const lines = text.trim().split(/\r?\n/);

  if (lines.length < 2) {
      return false; // At least a header and a separator are required
  }

  const headerMatch = headerRegex.exec(lines[0]);
  const separatorMatch = separatorRegex.exec(lines[1]);

  if (!headerMatch || !separatorMatch) {
      return false; // Must have a valid header and separator
  }

  // Count the number of columns in the header
  const columnCount = (lines[0].match(/\|/g) || []).length;

  // Check if the separator has the same number of columns
  if ((lines[1].match(/\|/g) || []).length !== columnCount) {
      return false;
  }

  // Check each data row for the correct number of columns
  for (let i = 2; i < lines.length; i++) {
      if ((lines[i].match(/\|/g) || []).length !== columnCount) {
          return false;
      }
  }

  return true;
}
export function formatMarkdownTable(table: string): string[] {
  let cells: string[][] = [];
  let columnWidths: number[] = [];
  let outputTable: string[] = [];

  const addMissingCellColumns = (): void => {
    cells.forEach(row => {
      while (row.length < columnWidths.length) {
        row.push('');
      }
    });
  };

  const getColumnWidths = (): void => {
    columnWidths = cells[0].map((_, colIndex) =>
      Math.max(...cells.map(row => row[colIndex]?.length || 0))
    );
  };

  const importTable = (table: string): void => {
    const tableRows = table.split('\n').filter(row => row.includes('|'));

    cells = tableRows.map(row => 
      row.split('|').map(cell => cell.trim().replace(/-+/g, '-'))
    );

    removeEmptyColumns();
  };

  const removeEmptyColumns = (): void => {
    getColumnWidths();
    cells.forEach(row => {
      if (columnWidths[0] === 0) row.shift();
      if (columnWidths[columnWidths.length - 1] === 0) row.pop();
    });
    getColumnWidths();
  };

  const padCellsForOutput = (): void => {
    cells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const padChar = rowIndex === 1 ? '-' : ' ';
        row[colIndex] = cell.padEnd(columnWidths[colIndex], padChar);
      });
    });
  };

  importTable(table);
  getColumnWidths();
  addMissingCellColumns();
  padCellsForOutput();

  outputTable = cells.map((row, index) => {
    const separator = index === 1 ? '-' : ' ';
    return `| ${row.join(` | `)} |`.replace(/ /g, separator);
  });

  return outputTable;
}

/*
export function generateTable(row: number, col: number): string[] {
  const columnWidth = 10; // Define a fixed width for each column
  const header = [];
  const delimiter = [];
  const rows = [];
  // Create header
  for (let i = 1; i <= col; i++) {
      header.push(padString(`Column ${i}`, columnWidth));
      delimiter.push(repeatChar('-', columnWidth));
  }

  // Create rows
  for (let i = 0; i < row; i++) {
      const rowContent = [];
      for (let j = 0; j < col; j++) {
          rowContent.push(padString('Text', columnWidth));
      }
      rows.push(`| ${rowContent.join(' | ')} |`);
  }

  // Combine all parts into a single array of strings
  const table = [
      `| ${header.join(' | ')} |`,
      `| ${delimiter.join(' | ')} |`,
      ...rows
  ];

  return table;
}*/

export function generateTable(row: number, col: number): string[] {
  const columnWidth = 10; // Define a fixed width for each column
  const header = [];
  const delimiter = [];
  const rows = [];
  // Create header
  for (let i = 1; i <= col; i++) {
      header.push(`Column ${i}`.padEnd(columnWidth));
      delimiter.push('-'.repeat(columnWidth));
  }

  // Create rows
  for (let i = 0; i < row; i++) {
      const rowContent = [];
      for (let j = 0; j < col; j++) {
          rowContent.push('Text'.padEnd(columnWidth));
      }
      rows.push(`| ${rowContent.join(' | ')} |`);
  }

  // Combine all parts into a single array of strings
  const table = [
      `| ${header.join(' | ')} |`,
      `| ${delimiter.join(' | ')} |`,
      ...rows
  ];

  return table;
}

