// В этом нет необходимости,
// но я могу это сделать "на будущее",
// если этот input будет отправлять
// значение на сервер.

import { useState, useEffect } from "react"

export function useDebounce(value: string, delay = 1000) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
    }, [value, delay])
  return debounced
}
