import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function useDateTime() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = format(now, 'hh:mm:ss a');
  const formattedDate = format(now, 'EEE, dd MMM yyyy');

  return {
    date: now,
    formattedTime,
    formattedDate,
  };
}
