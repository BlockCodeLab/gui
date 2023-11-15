const defaultCode = `# hello world!
import machine

print("hello world!")
`;

export default {
  fileList: [
    {
      name: 'main.py',
      content: defaultCode,
    },
    {
      name: 'test.py',
      content: 'print("test")',
    },
  ],
};
