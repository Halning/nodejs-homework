import request from 'supertest';
import {PUBLIC_HOLIDAYS_API_URL} from "../config";

describe('E2E Tests for checkIfTodayIsPublicHoliday', () => {
    it('should return true if today is a public holiday in the specified country', async () => {
        const country = 'GB';

        // Perform a GET request to the endpoint to check if today is a public holiday
        const res = await request(PUBLIC_HOLIDAYS_API_URL).get(`/IsTodayPublicHoliday/${country}`);

        // Validate the response
        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
    });

    it('should return false if today is not a public holiday in the specified country', async () => {
        const country = 'GB';

        // Perform a GET request to the endpoint to check if today is a public holiday
        const res = await request(PUBLIC_HOLIDAYS_API_URL).get(`/IsTodayPublicHoliday/${country}`);

        // Validate the response
        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
    });
});

describe('E2E Tests for getNextPublicHolidays', () => {
    it('should return a list of next public holidays for the specified country', async () => {
        const country = 'GB';

        // Perform a GET request to the endpoint
        const res = await request(PUBLIC_HOLIDAYS_API_URL).get(`/NextPublicHolidays/${country}`);

        // Validate the response
        expect(res.status).toBe(200);
        // Add more specific assertions for the response body if needed
    });

    it('should return an empty array if there are no next public holidays for the specified country', async () => {
        const country = 'GB';

        // Perform a GET request to the endpoint
        const res = await request(PUBLIC_HOLIDAYS_API_URL).get(`/NextPublicHolidays/${country}`);

        // Validate the response
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
