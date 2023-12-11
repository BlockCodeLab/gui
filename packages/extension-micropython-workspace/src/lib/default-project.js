const defaultCode = `# hello world!
import machine

print("hello world!")
`;

export default {
  editor: {
    name: 'MicroPython',
    package: '@blockcode/extension-micropython',
  },
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
