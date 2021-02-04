import React from "react";
import MessageComposer from "./MessageComposer";
import WorkspaceMessages from "./WorkspaceMessages";
import { useCurrentAuthor } from "react-earthstar";
import Button from "./Button";
import { LobbyContext } from "./util/lobby-context";
import MaxWidth from "./MaxWidth";

type WorkspaceViewerProps = {
  workspaceAddress: string;
};

const WorkspaceViewer: React.FC<WorkspaceViewerProps> = ({
  workspaceAddress,
}) => {
  const [currentAuthor] = useCurrentAuthor();
  const { appStateDispatch } = React.useContext(LobbyContext);

  return (
    <>
      <MaxWidth>
        <Button
          css={`
            margin: 8px 0;
          `}
          onClick={() => appStateDispatch({ type: "OPEN_DASHBOARD" })}
        >
          {"← View all workspaces"}
        </Button>
      </MaxWidth>
      {currentAuthor ? <MessageComposer workspace={workspaceAddress} /> : null}
      <WorkspaceMessages workspace={workspaceAddress} />
    </>
  );
};

export default WorkspaceViewer;
