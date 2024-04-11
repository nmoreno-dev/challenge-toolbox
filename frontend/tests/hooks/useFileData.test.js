jest.mock('../../src/services/app.service.js', () => ({
  getFileData: jest.fn(),
}));

import { renderHook } from '@testing-library/react-hooks';
import { useFileData } from '../../src/hooks/files.hook';
import appService from '../../src/services/app.service.js';

/**
 * @jest-environment jsdom
 */

describe('useFileData', () => {
  beforeEach(() => {
    appService.getFileData.mockClear();
  });
  it('should fetch file data successfully', async () => {
    const fileName = 'testFile';
    const mockData = [
      {
        file: 'test2.csv',
        lines: [
          {
            text: 'wUgijxEpUnkUaZvbEAqYg',
            number: 603,
            hex: 'df79e4df75dd72d4360db1b05e2123ba',
          },
        ],
      },
      {
        file: 'test3.csv',
        lines: [
          {
            text: 'qTjVUDTqNgPmSKVqCZeyqiDlbNx',
            number: 723915,
            hex: '3fd8312f43809f1341d2b9f61b069c69',
          },
          {
            text: 'hkJVCqiFKmxYrUiPzrsQJBrIOygxsyhk',
            number: 176,
            hex: 'b51facc48379af1be7fb2db50ba43c8e',
          },
          {
            text: 'Zan',
            number: 702,
            hex: 'c2ea9ca20fb9c613a44a7e5d40cfbebe',
          },
        ],
      },
    ];
    appService.getFileData.mockResolvedValue(mockData);

    const { result, waitForNextUpdate } = renderHook(() => useFileData());

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch error', async () => {
    const fileName = 'testFile';
    const error = new Error('Fetch error');
    appService.getFileData.mockRejectedValue(error);

    const { result, waitForNextUpdate } = renderHook(() => useFileData());

    await waitForNextUpdate();

    expect(result.current.error).toBe(error);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
  });
});
