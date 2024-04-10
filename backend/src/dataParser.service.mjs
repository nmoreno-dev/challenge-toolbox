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

    if (file && text && number && hex) {
      // extrae el nombre del archivo por unica vez
      if (!fileName) fileName = file;

      lines.push({
        text,
        number,
        hex,
      });
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
