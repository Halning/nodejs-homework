import axios from 'axios';
import { getListOfPublicHolidays, getNextPublicHolidays, checkIfTodayIsPublicHoliday } from './public-holidays.service';
import {shortenPublicHoliday} from '../utils/helpers';
import {PUBLIC_HOLIDAYS_API_URL} from "../constants/config";

jest.mock('axios'); // Mock axios

describe('Public Holidays Service', () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;

  afterEach(() => {
    mockAxios.get.mockClear();
  });

  describe("getListOfPublicHolidays", () => {
    it('should handle API errors', async () => {
      const country = 'GB';
      const year = 2023;

      mockAxios.get.mockRejectedValueOnce(new Error('API error'));

      const result = await getListOfPublicHolidays(year, country);
      expect(result).toEqual([]);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
    });

    it('should return an empty array if no public holidays are found', async () => {
      const country = 'GB';
      const year = 2023;

      mockAxios.get.mockResolvedValueOnce({ data: [] });

      const result = await getListOfPublicHolidays(year, country);
      expect(result).toEqual([]);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
    });


    it('should fetch the list of public holidays for a specific country and year', async () => {
      const mockData = [
        {
          name: 'New Year',
          localName: 'New Year',
          date: '2023-01-01',
        },
      ];

      const country = 'GB';
      const year = 2023;

      mockAxios.get.mockResolvedValue({ data: mockData });

      const result = await getListOfPublicHolidays(year, country);
      // @ts-ignore
      expect(result).toEqual(mockData.map(shortenPublicHoliday));
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
    });
  });

  describe("getNextPublicHolidays", () => {
    it('should handle API errors', async () => {
      const supportedCountry = 'GB';

      mockAxios.get.mockRejectedValue(new Error('API Error'));

      const result = await getNextPublicHolidays(supportedCountry);
      expect(result).toEqual([]);
    });

    it('should return shortened public holidays for a supported country', async () => {
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

      mockAxios.get.mockResolvedValue({ data: mockData });

      const result = await getNextPublicHolidays(supportedCountry);

      expect(result).toEqual([
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
      ]);
    });

    it('should return an empty array if no next public holidays are found for unsupported countries', async () => {
      const unsupportedCountry = 'GB';

      mockAxios.get.mockResolvedValueOnce({ status: 204 });

      const result = await getNextPublicHolidays(unsupportedCountry);
      expect(result).toEqual([]);
    });
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    it('should handle API errors', async () => {
      const country = 'GB';

      mockAxios.get.mockRejectedValueOnce(new Error('API error'));

      const result = await checkIfTodayIsPublicHoliday(country);
      expect(result).toBe(false);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
    });

    it('should return true if today is a public holiday', async () => {
      const country = 'GB';

      // Mock the Axios response to simulate a successful response from the API
      mockAxios.get.mockResolvedValueOnce({ status: 200 });

      const result = await checkIfTodayIsPublicHoliday(country);
      expect(result).toBe(true);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
    });

    it('should return false if today is not a public holiday', async () => {
      const country = 'GB';

      mockAxios.get.mockResolvedValueOnce({ status: 404 });

      const result = await checkIfTodayIsPublicHoliday(country);
      expect(result).toBe(false);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
    });
  });
});
