export function exportFile(data, filename) {
  const link = globalThis.document.createElement('a');
  const blob = new globalThis.Blob([data]);
  const url = globalThis.URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
}
