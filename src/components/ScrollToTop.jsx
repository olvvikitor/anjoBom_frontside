import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('Navegando para:', pathname);
    window.scrollTo(0, 0);
  }, [pathname]);
  

  return null; // Este componente não renderiza nada
};

export default ScrollToTop;
