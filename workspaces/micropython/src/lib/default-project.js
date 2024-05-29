const defaultCode = `# hello world!
import machine

print("hello world!")
`;

export default {
  fileList: [
    {
      id: 'main',
      type: 'text/x-python',
      content: defaultCode,
    },
    {
      id: 'test',
      type: 'text/x-python',
      content: 'print("test")',
    },
  ],
};
