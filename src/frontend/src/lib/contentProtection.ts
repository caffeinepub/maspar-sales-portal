export function disableContextMenu(element: HTMLElement | null): () => void {
  if (!element) return () => {};
  
  const handler = (e: MouseEvent) => {
    e.preventDefault();
    return false;
  };
  
  element.addEventListener('contextmenu', handler);
  
  return () => {
    element.removeEventListener('contextmenu', handler);
  };
}

export function disableDragStart(element: HTMLElement | null): () => void {
  if (!element) return () => {};
  
  const handler = (e: DragEvent) => {
    e.preventDefault();
    return false;
  };
  
  element.addEventListener('dragstart', handler);
  
  return () => {
    element.removeEventListener('dragstart', handler);
  };
}

export function applyContentProtection(element: HTMLElement | null): () => void {
  const cleanup1 = disableContextMenu(element);
  const cleanup2 = disableDragStart(element);
  
  return () => {
    cleanup1();
    cleanup2();
  };
}
