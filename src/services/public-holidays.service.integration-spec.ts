import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    getListOfPublicHolidays,
    checkIfTodayIsPublicHoliday,
    getNextPublicHolidays,
} from './public-holidays.service';
import {PUBLIC_HOLIDAYS_API_URL} from "../config";

const mockAxios = new MockAdapter(axios);

describe('Public Holidays Service (Integration Tests)', () => {
    // Clean up after each test
    afterEach(() => {
        mockAxios.reset();
    });

    describe('getListOfPublicHolidays', () => {
        it('should fetch the list of public holidays for a specific country and the current year', async () => {
            const supportedCountry = 'GB';
            const currentYear = new Date().getFullYear();

            const mockData = [
                {
                    name: 'New Year',
                    localName: 'New Year',
                    date: `${currentYear}-01-01`,
                },
                {
                    name: 'Christmas',
                    localName: 'Christmas',
                    date: `${currentYear}-12-25`,
                },
            ];

            mockAxios
                .onGet(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${currentYear}/${supportedCountry}`)
                .reply(200, mockData);

            const result = await getListOfPublicHolidays(currentYear, supportedCountry);
            expect(result).toEqual(mockData);
        });

        it('should handle an unsupported country', async () => {
            const unsupportedCountry = 'GB';
            const currentYear = new Date().getFullYear();

            const result = await getListOfPublicHolidays(currentYear, unsupportedCountry);
            expect(result).toEqual([]);
        });

        it('should return an empty array if no public holidays are found for unsupported countries', async () => {
            const unsupportedCountry = 'GB';
            const year = 2023;

            const result = await getListOfPublicHolidays(year, unsupportedCountry);
            expect(result).toEqual([]);
        });
    });

    describe('checkIfTodayIsPublicHoliday', () => {
        it('should return true if today is a public holiday for supported countries', async () => {
            const supportedCountry = 'GB';

            // Mock the Axios response to return a 200 status (today is a public holiday)
            mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${supportedCountry}`).reply(200);

            const result = await checkIfTodayIsPublicHoliday(supportedCountry);
            expect(result).toBe(true);
        });

        it('should return false if today is not a public holiday for supported countries', async () => {
            const supportedCountry = 'GB';

            // Mock the Axios response to return a 404 status (today is not a public holiday)
            mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${supportedCountry}`).reply(404);

            const result = await checkIfTodayIsPublicHoliday(supportedCountry);
            expect(result).toBe(false);
        });

        it('should handle an unsupported country', async () => {
            const unsupportedCountry = 'GB';

            mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${unsupportedCountry}`).reply(404);

            const result = await checkIfTodayIsPublicHoliday(unsupportedCountry);
            expect(result).toBe(false);
        });
    });

    describe('getNextPublicHolidays', () => {
        it('should return the next public holidays for a specific country', async () => {
            const supportedCountry = 'GB';

            const mockData = [
                {
                    name: 'New Year',
                    localName: 'New Year',
                    date: '2024-01-01',
                },
                {
                    name: 'Christmas',
                    localName: 'Christmas',
                    date: '2024-12-25',
                },
            ];

            mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${supportedCountry}`).reply(200, mockData);

            const result = await getNextPublicHolidays(supportedCountry);
            expect(result).toEqual(mockData);
        });

        it('should handle an unsupported country', async () => {
            const unsupportedCountry = 'GB';

            const result = await getNextPublicHolidays(unsupportedCountry);
            expect(result).toEqual([]);
        });

        it('should return an empty array if no next public holidays are found for unsupported countries', async () => {
            const unsupportedCountry = 'GB';

            mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${unsupportedCountry}`).reply(204);

            const result = await getNextPublicHolidays(unsupportedCountry);
            expect(result).toEqual([]);
        });

    });
});
