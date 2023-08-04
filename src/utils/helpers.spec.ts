import { validateInput, shortenPublicHoliday } from './helpers';
import {PublicHoliday} from "../types/types";

describe('Helpers', () => {
  it('should validate country correctly', () => {
    const supportedCountry = 'GB';
    const unsupportedCountry = 'UA';

    expect(validateInput({ country: supportedCountry })).toBe(true);
    expect(() => validateInput({ country: unsupportedCountry })).toThrow(
        `Country provided is not supported, received: ${unsupportedCountry}`,
    );
  });

  it('should validate year correctly', () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    expect(validateInput({ year: currentYear })).toBe(true);
    expect(() => validateInput({ year: nextYear })).toThrow(`Year provided not the current, received: ${nextYear}`);
  });

  it('should shorten public holiday correctly', () => {
    const holiday = {
      name: 'New Year',
      localName: 'New Year',
      date: '2023-01-01',
    } as PublicHoliday;

    const shortenedHoliday = shortenPublicHoliday(holiday);

    expect(shortenedHoliday).toEqual({
      name: 'New Year',
      localName: 'New Year',
      date: '2023-01-01',
    });
  });

  it('should return a shortened list of public holidays', () => {
    const holidays = [
      {
        name: 'New Year',
        localName: 'New Year',
        date: '2023-01-01',
      },
      {
        name: 'Christmas',
        localName: 'Christmas',
        date: '2023-12-25',
      },
    ];

    // @ts-ignore
    const shortenedHolidays = holidays.map(shortenPublicHoliday);

    expect(shortenedHolidays).toEqual([
      {
        name: 'New Year',
        localName: 'New Year',
        date: '2023-01-01',
      },
      {
        name: 'Christmas',
        localName: 'Christmas',
        date: '2023-12-25',
      },
    ]);
  });

  it('should throw an error if an unsupported country is provided', () => {
    const unsupportedCountry = 'Australia';

    expect(() => validateInput({ country: unsupportedCountry })).toThrow(
        `Country provided is not supported, received: ${unsupportedCountry}`,
    );
  });

  it('should throw an error if a non-current year is provided', () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    expect(() => validateInput({ year: nextYear })).toThrow(`Year provided not the current, received: ${nextYear}`);
  });

  // Additional test cases for edge cases, if needed
  it('should handle empty input correctly', () => {
    expect(validateInput({})).toBe(true);
  });

  it('should handle undefined input correctly', () => {
    expect(validateInput({ year: undefined, country: undefined })).toBe(true);
  });

  it('should handle valid country and year input', () => {
    const supportedCountry = 'GB';
    const currentYear = new Date().getFullYear();

    expect(validateInput({ country: supportedCountry, year: currentYear })).toBe(true);
  });

  it('should handle negative year input correctly', () => {
    expect(() => validateInput({ year: -2023 })).toThrow(`Year provided not the current, received: -2023`);
  });

  it('should handle invalid year and country input correctly', () => {
    const unsupportedCountry = 'Australia';
    const nextYear = new Date().getFullYear() + 1;

    expect(() => validateInput({ year: nextYear, country: unsupportedCountry })).toThrow(
        `Country provided is not supported, received: ${unsupportedCountry}`,
    );
  });
});
