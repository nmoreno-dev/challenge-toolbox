function parse(fileData) {
  const fileLines = fileData.split('\n');
  const { length: linesLength } = fileLines;

  // el archivo esta vacio o solo tiene los nombres de las columnas
  if (linesLength <= 1) return null;

  let fileName;
  // contiene la información formateada de fileLines
  const lines = [];

  for (let i = 1; i < linesLength; i++) {
    const line = fileLines[i];
    const columns = line.split(',');

    const [file, text, number, hex] = columns;
    const parsedNumeber = parseInt(number, 10);

    if (file && text && !isNaN(parsedNumeber) && hex) {
      // extrae el nombre del archivo por unica vez
      if (!fileName) fileName = file;

      try {
        lines.push({
          text,
          number: parsedNumeber,
          hex: parsedHex,
        });
      } catch (error) {}
    }
  }

  // ninguna linea del archivo estaba completa
  if (lines.length <= 0) return null;

  return {
    file: fileName,
    lines,
  };
}

export default {
  parse,
};
