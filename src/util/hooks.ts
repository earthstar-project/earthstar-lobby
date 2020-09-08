import { useCallback, useRef, useEffect, useState, useMemo } from "react";
import { useWindupString } from "windups";
import { isKeypair } from "./handy";
import { WORKSPACE_ADDR, PUB_URL } from "../constants";

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

export function useWindupAlert(
  delay: number = 3000
): [string | null, (message: string) => void] {
  const [tempMessage, setTempMessage] = useState<string | null>(null);

  useEffect(() => {
    if (tempMessage) {
      const timeout = setTimeout(() => {
        setTempMessage(null);
      }, delay);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [tempMessage, delay]);

  const [windup] = useWindupString(tempMessage || "");

  const set = useCallback((message: string) => {
    setTempMessage(message);
  }, []);

  return [windup === "" ? null : windup, set];
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

export function usePersistedWorkspaces() {
  const wsInStorage = localStorage.getItem("workspaces");

  useEffect(() => {
    if (!wsInStorage) {
      localStorage.setItem("workspaces", JSON.stringify(INIT_WORKSPACES));
    }

    if (wsInStorage) {
      const parsed = JSON.parse(wsInStorage);

      if (parsed && !isStringList(parsed)) {
        localStorage.setItem("workspaces", JSON.stringify(INIT_WORKSPACES));
      }
    }
  }, [wsInStorage]);

  return useMemo(() => {
    if (!wsInStorage) {
      return INIT_WORKSPACES;
    }

    const parsed = JSON.parse(wsInStorage);

    if (parsed && !isStringList(parsed)) {
      return INIT_WORKSPACES;
    }

    return parsed as string[];
  }, [wsInStorage]);
}

export function usePersistWorkspace() {
  const existing = usePersistedWorkspaces();

  return useCallback(
    (address: string) => {
      const prev = existing ? existing : [WORKSPACE_ADDR];

      prev.push(address);

      const next = Array.from(new Set(prev));

      localStorage.setItem("workspaces", JSON.stringify(next));
    },
    [existing]
  );
}

const INIT_PUBS = { [WORKSPACE_ADDR]: [PUB_URL] };

export function usePubs(): [
  Record<string, string[]>,
  React.Dispatch<React.SetStateAction<Record<string, string[]>>>
] {
  const initVal = useMemo(() => {
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

  const [pubs, setPubs] = useState(initVal);

  useEffect(() => {
    localStorage.setItem("pubs", JSON.stringify(pubs));
  }, [pubs]);

  console.log(pubs);

  return [pubs, setPubs];
}
