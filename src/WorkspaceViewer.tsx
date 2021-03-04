import React from "react";
import MessageComposer from "./MessageComposer";
import WorkspaceMessages from "./WorkspaceMessages";
import { useCurrentAuthor } from "react-earthstar";
import { useWorkspaceNotifications } from "./util/hooks";

type WorkspaceViewerProps = {
  workspaceAddress: string;
};

const WorkspaceViewer: React.FC<WorkspaceViewerProps> = ({
  workspaceAddress,
}) => {
  const [currentAuthor] = useCurrentAuthor();
  useWorkspaceNotifications(workspaceAddress);

  return (
    <>
      {currentAuthor ? <MessageComposer workspace={workspaceAddress} /> : null}
      <WorkspaceMessages workspace={workspaceAddress} />
    </>
  );
};

export default WorkspaceViewer;
