import { useRef, useEffect } from 'react';

function useDocumentTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef('SYSPRO ERP Plus - Galaxy Infotech');

  useEffect(() => {
    document.title = `${title} | ${defaultTitle.current}`;
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    [],
  );
}

export default useDocumentTitle;
