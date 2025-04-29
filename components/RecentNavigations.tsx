import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const RecentNavigations = () => {
  const [history, setHistory] = useState<string[]>([]); // Store visited URLs
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted
  const router = useRouter();

  useEffect(() => {
    // Ensure that this only runs on the client side
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const handleRouteChange = (url: string) => {
        setHistory((prevHistory) => [...prevHistory, url]);
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      // Cleanup the event listener
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events, isMounted]);

  if (!isMounted) return null; // Ensure nothing is rendered on SSR

  return (
    <div className="p-4">
      <p className="text-gray-200 text-sm">Recent Navigations</p>
      <ul className="mt-2">
        {history.map((url, index) => (
          <li key={index} className="text-gray-300 text-sm">
            {url}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentNavigations;
