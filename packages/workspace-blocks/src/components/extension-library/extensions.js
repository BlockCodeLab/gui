import { getExtensions } from '../../macros/extensions' with { type: 'macro' };

const allExtensions = getExtensions();

export default allExtensions.map(async (extensionId) => {
  const { default: extensionInfo } = await import(`@blockcode/extension-${extensionId}`);
  extensionInfo.id = extensionId;
  return extensionInfo;
});
