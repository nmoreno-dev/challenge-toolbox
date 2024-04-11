jest.mock('../../src/services/app.service.js', () => ({
  listFiles: jest.fn(),
}));

import { renderHook } from '@testing-library/react-hooks';
import { useFileList } from '../../src/hooks/files.hook';
import appService from '../../src/services/app.service.js';

/**
 * @jest-environment jsdom
 */

describe('useFileList', () => {
  beforeEach(() => {
    appService.listFiles.mockClear();
  });

  it('should fetch list of files successfully', async () => {
    const mockFiles = {
      files: [
        'test1.csv',
        'test2.csv',
        'test3.csv',
        'test18.csv',
        'test4.csv',
        'test5.csv',
        'test6.csv',
        'test9.csv',
        'test15.csv',
      ],
    };
    appService.listFiles.mockResolvedValue(mockFiles);

    const { result, waitForNextUpdate } = renderHook(() => useFileList());

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.list).toEqual(mockFiles.files);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch error', async () => {
    appService.listFiles.mockRejectedValue(new Error('Fetch error'));

    const { result, waitForNextUpdate } = renderHook(() => useFileList());

    await waitForNextUpdate();

    expect(result.current.error).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.list).toEqual([]);
  });
});
