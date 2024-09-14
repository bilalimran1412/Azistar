import React from 'react';
import { fetchWrapper } from "../../utils/fetchWrapper";

export const useFetchData = (url, id = null) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchData = React.useCallback(async () => {
        setLoading(true);
        try {
            const result = await fetchWrapper({ url });
            if (result.data) {
                setData(result);
            }
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    React.useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url, fetchData]);

    return { data, loading, error, setError, setLoading, refetch: fetchData };
};
