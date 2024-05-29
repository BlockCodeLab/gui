import { readWorkspaces } from '../../macros/workspaces' with { type: 'macro' };

const workspaceList = readWorkspaces();

export default workspaceList.map(async (workspaceId) => {
  const { default: workspaceInfo } = await import(`@blockcode/workspace-${workspaceId}`);
  workspaceInfo.package = workspaceId;
  return workspaceInfo;
});
