import {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
} from "react";
import { isKeypair } from "./handy";
import { WORKSPACE_ADDR, BOOTSTRAP_PUBS } from "../constants";

export function useDownload(data: string, filename: string): () => void {
  return useCallback(() => {
    const blob = new Blob([data], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display: none");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, [data, filename]);
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  return ref.current;
}

export function useTempString(
  delay: number = 3000
): [string | null, React.Dispatch<React.SetStateAction<string | null>>] {
  const [tempString, setTempString] = useState<string | null>(null);

  useEffect(() => {
    if (tempString) {
      const timeout = setTimeout(() => {
        setTempString(null);
      }, delay);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [tempString, delay]);

  return [tempString, setTempString];
}

function isStringList(list: any): list is string[] {
  if (!Array.isArray(list)) {
    return false;
  }

  if (!list.every((item) => typeof item === "string")) {
    return false;
  }

  return true;
}

export function usePersistedAuthor() {
  const maybeSessionAuthor = localStorage.getItem("authorKeypair");

  return useMemo(() => {
    if (!maybeSessionAuthor) {
      return null;
    }

    const parsed = JSON.parse(maybeSessionAuthor);

    if (parsed && !isKeypair(parsed)) {
      return null;
    }

    return parsed;
  }, [maybeSessionAuthor]);
}

const INIT_WORKSPACES = [WORKSPACE_ADDR];
const INIT_PUBS = { [WORKSPACE_ADDR]: BOOTSTRAP_PUBS };

export function usePubsFromStorage() {
  return useMemo(() => {
    const pubsInStorage = localStorage.getItem("pubs");

    if (!pubsInStorage) {
      return INIT_PUBS;
    }

    const parsed = JSON.parse(pubsInStorage);

    if (parsed && typeof parsed !== "object") {
      return INIT_PUBS;
    }

    return parsed as Record<string, string[]>;
  }, []);
}

export function useWorkspacesFromStorage() {
  return useMemo(() => {
    const wsInStorage = localStorage.getItem("workspaces");

    if (!wsInStorage) {
      return INIT_WORKSPACES;
    }

    const parsed = JSON.parse(wsInStorage);

    if (parsed && !isStringList(parsed)) {
      return INIT_WORKSPACES;
    }

    return parsed as string[];
  }, []);
}

export const StorageContext = createContext<{
  workspaces: string[];
  pubs: Record<string, string[]>;
  setPubs: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  setWorkspaces: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  workspaces: [],
  pubs: {},
  setPubs: () => {},
  setWorkspaces: () => {},
});

export function usePersistingWorkspacesAndPubs() {
  const initWorkspaces = useWorkspacesFromStorage();
  const initPubs = usePubsFromStorage();

  const [workspaces, setWorkspaces] = useState(initWorkspaces);
  const [pubs, setPubs] = useState(initPubs);

  useEffect(() => {
    localStorage.setItem("workspaces", JSON.stringify(workspaces));
  }, [workspaces]);

  useEffect(() => {
    localStorage.setItem("pubs", JSON.stringify(pubs));
  }, [pubs]);

  return { workspaces, setWorkspaces, pubs, setPubs };
}

export function usePubs(): [
  Record<string, string[]>,
  React.Dispatch<React.SetStateAction<Record<string, string[]>>>
] {
  const { pubs, setPubs } = useContext(StorageContext);

  return [pubs, setPubs];
}

export function useWorkspacePubs(
  workspace: string
): [string[], (value: React.SetStateAction<string[]>) => void] {
  const { pubs, setPubs } = useContext(StorageContext);

  return [
    pubs[workspace] || [],
    (value: React.SetStateAction<string[]>) => {
      setPubs(({ [workspace]: prevWorkspacePubs, ...rest }) => {
        if (Array.isArray(value)) {
          return { ...rest, [workspace]: value };
        }
        const next = value(prevWorkspacePubs || []);
        return { ...rest, [workspace]: next };
      });
    },
  ];
}

export function useWorkspaces(): [
  string[],
  React.Dispatch<React.SetStateAction<string[]>>
] {
  const { workspaces, setWorkspaces } = useContext(StorageContext);

  return [workspaces, setWorkspaces];
}
