import axios from 'axios';
import FetchDataFromServer from '../FetchDataFromServer';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock console.log
const consoleSpy = jest.spyOn(console, 'log');

describe('FetchDataFromServer', () => {
  beforeEach(() => {
    consoleSpy.mockClear();
  });

  it('fetches data from the server and returns it', async () => {
    const data = {
      articles: [[1, 1]],  // [ group_id, article_id ]
      problems: [[1, 1]],  // [ group_id, problem_id ]
      groups: [{id: 1, name: 'test'}],
    };
    mockedAxios.get.mockResolvedValue({ data });

    const url = '/api/';
    const setFunc = jest.fn();
    await FetchDataFromServer(url, setFunc);

    expect(setFunc).toHaveBeenCalledWith(data);
  });

  it('logs an error when the request fails', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    const url = '/api/';
    const setFunc = jest.fn();
    await FetchDataFromServer(url, setFunc);

    expect(console.log).toHaveBeenCalledWith(new Error(errorMessage));
  });
});