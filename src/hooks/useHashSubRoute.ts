import { useState, useEffect, useCallback } from 'react';
import { buildHashHref, parseHashRoute, updateHashRoute } from '../utils/deepLink';

/**
 * Workspace içi alt modül / araç seçimi için merkezi hash deep-link hook'u.
 *
 * - İlk açılışta URL'deki `#arac=<toolId>&sub=<subId>` parametresini otomatik okur
 * - `hashchange` (tarayıcı geri/ileri tuşu) ile senkronize kalır
 * - `selectSub(id)` ile state + URL hash'ini birlikte günceller
 * - `getSubHref(id)` ile `<PortalLink>` için gerçek `<a href>` URL'si üretir
 */
export function useHashSubRoute<T extends string>(
  toolId: string,
  initialSubId?: T | null,
  validIds?: readonly T[]
) {
  const normalize = useCallback(
    (candidate: string | null | undefined): T | null => {
      if (!candidate) return null;
      if (validIds && !validIds.includes(candidate as T)) return null;
      return candidate as T;
    },
    [validIds]
  );

  const [activeSubId, setActiveSubId] = useState<T | null>(() => {
    const fromProp = normalize(initialSubId);
    if (fromProp) return fromProp;
    const route = parseHashRoute();
    if (route.type === 'arac' && route.id === toolId) {
      return normalize(route.subId);
    }
    return null;
  });

  useEffect(() => {
    if (initialSubId !== undefined) {
      setActiveSubId(normalize(initialSubId));
    }
  }, [initialSubId, normalize]);

  useEffect(() => {
    const handleHashChange = () => {
      const route = parseHashRoute();
      if (route.type === 'arac' && route.id === toolId) {
        setActiveSubId(normalize(route.subId));
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [toolId, normalize]);

  const selectSub = useCallback(
    (id: T | null) => {
      setActiveSubId(id);
      updateHashRoute('arac', id ? `${toolId}&sub=${id}` : toolId);
    },
    [toolId]
  );

  const clearSub = useCallback(() => {
    selectSub(null);
  }, [selectSub]);

  const getSubHref = useCallback(
    (id?: T | null) => buildHashHref('arac', toolId, id),
    [toolId]
  );

  return {
    activeSubId,
    setActiveSubId,
    selectSub,
    clearSub,
    getSubHref
  };
}
