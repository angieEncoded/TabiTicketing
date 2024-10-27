import { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortControl = new AbortController();

        fetch(url, { signal: abortControl.signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText, {
                        cause: response.status
                    });
                }
                return response.json()
            })
            .then(data => {
                setData(data);
                setIsPending(false)
                setError(null)
            })
            .catch(error => {
                if (error.name === "AbortError") {
                    return;
                }

                if (error.message.includes("Failed to fetch")) {
                    setError(`Error from server: ${error.message}. Server may be down.`)
                } else {
                    setError(`Error from server: ${error.cause} ${error.message}`);
                }
                setIsPending(false)
            })
        return () => abortControl.abort()
    }, [url])
    return {
        data,
        isPending,
        error
    }


}

export default useFetch;