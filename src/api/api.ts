import axios, { AxiosResponse } from "axios";

const api = axios.create({
	baseURL: "https://swapi.dev/api/",
});

interface ApiResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T;
}

export const fetchData = async <T>(
	endpoint: string
): Promise<ApiResponse<T>> => {
	try {
		const response: AxiosResponse<ApiResponse<T>> = await api.get<
			ApiResponse<T>
		>(endpoint);
		return response.data;
	} catch (error) {
		throw new Error(
			`Ошибка при получении данных: ${
				error instanceof Error ? error.message : "Неизвестная ошибка"
			}`
		);
	}
};
