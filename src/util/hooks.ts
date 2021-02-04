import {
  useCallback,
  useRef,
  useEffect,
  useState,
  
} from "react";
import { useLocalStorage } from '@rehooks/local-storage'
import { AuthorKeypair } from "earthstar";

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

export function usePersistedAuthor() {
  
  
  const [maybeAuthor] = useLocalStorage<AuthorKeypair>('authorKeypair')

  return maybeAuthor
}

export function usePubsFromStorage() {
  const [pubs] = useLocalStorage<Record<string, string[]>>('pubs')
  
  return pubs
}

export function useWorkspacesFromStorage() {
  const [workspaces] = useLocalStorage<string[]>('workspaces')
  
return workspaces
}






