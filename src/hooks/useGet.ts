import { useCallback, useEffect, useState } from "react";
import type { PaginatedResponse } from "../types/Common-types/paginated-response.types";


export const useGet = <TData, TResponse>() => {
	const [data, setData] = useState<TData[] | null>(null);
	const [fullResponse, setFullResponse] = useState<TResponse | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getData = useCallback(
		async (
			getFn: (page: number, query: string) => Promise<PaginatedResponse<TData>>,
			page: number,
			query: string
		) => {
			setError(false);
			setIsFetching(true);
			try {
				const res = await getFn(page, query);
				console.log("Fetchin...")
				setData(res.data);
				setFullResponse(res as TResponse); // förlåt..
			} catch (err) {
				setError(err instanceof Error ? err.message : "Unexpected error");
			} finally {
				setIsFetching(false);
				setIsLoading(false);
			}
		},
		[]
	);

	useEffect(() => {
		setIsLoading(!data);
	}, [data]);

	return {
		data,
		fullResponse,
		error,
		isFetching,
		isLoading,
		getData,
		setData,
	};
}