import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import validator from 'validator';
import { useLocation, useHistory } from 'react-router-dom';

import { getTrackDetails, getTracks } from '../utils/utils';
import { SearchResultsProps } from '../pages/Home';
import { validate } from '../utils/validator';

const TracksContext = createContext<
  | {
      searchInput: string;
      searchResults: SearchResultsProps[] | undefined;
      clearSearch: () => void;
      fetchSearch: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
      pagesCount: number;
      trackDetailsData: SpotifyApi.SingleTrackResponse | undefined;
      setDetailsId: React.Dispatch<React.SetStateAction<string | undefined>>;
    }
  | undefined
>(undefined);

const TracksProvider = ({ children }: { children: React.ReactNode }) => {
  /******************************* State ***********************************/
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<
    SearchResultsProps[] | undefined
  >([]);
  const [trackDetailsData, setTrackDetailsData] = useState<
    SpotifyApi.SingleTrackResponse | undefined
  >();
  const [detailsId, setDetailsId] = useState<string>();

  const [pagesCount, setPagesCount] = useState(0);
  const [, setTotalDocs] = useState<null | number>();

  /******************************* Hooks ***********************************/

  const { search } = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(search);
  const trackParam = `${searchParams.get('track')}`;
  const pageParam = `${searchParams.get('page')}`;

  /******************************* useEffect ***********************************/

  useEffect(() => {
    (async () => {
      if (searchParams.has('track') && searchParams.has('page')) {
        setSearchInput(trackParam);

        searchTracks(trackParam, parseInt(pageParam));
      } else if (searchParams.has('track')) {
        setSearchInput(trackParam);

        searchTracks(trackParam);
      } else {
        setSearchInput('');
      }
    })();
  }, [trackParam, pageParam]);

  useEffect(() => {
    (async () => {
      if (detailsId) {
        const trackDetails = await getTrackDetails(detailsId);

        if (trackDetails) {
          setTrackDetailsData(trackDetails);
        }
      }
    })();
  }, [detailsId]);

  /******************************* helpers ***********************************/

  const fetchSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      clearSearch();
      history.push('/');
      return;
    }

    setDetailsId(undefined);
    setSearchInput(e.target.value);

    const sanitizedSearchValues = validate(e.target.value);

    history.push(`/search?track=${sanitizedSearchValues}`);
    try {
      const data = await getTracks(sanitizedSearchValues);
      const total = data?.total || 0;
      const pages = Math.ceil(total / 10);
      setSearchResults(data?.tracks);
      setPagesCount(pages);
      setTotalDocs(total);
    } catch (error) {
      console.error(error);
    }
  };

  const searchTracks = async (searchValue: string, page: number = 0) => {
    if (validator.isEmpty(searchValue, { ignore_whitespace: false })) {
      history.push('/');
      return;
    }

    setDetailsId(undefined);
    setSearchInput(searchValue);

    const sanitizedSearchValues = validate(searchValue);

    try {
      const data = await getTracks(sanitizedSearchValues, page);

      const total = data?.total || 0;
      const pages = Math.ceil(total / 10); //Limit = 10
      setSearchResults(data?.tracks);
      setPagesCount(pages);
      setTotalDocs(total);
    } catch (error) {
      console.error(error);
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchResults([]);
    history.push('/');
  };

  const memoizedProviderValue = useMemo(
    () => ({
      searchInput,
      searchResults,
      clearSearch,
      fetchSearch,
      pagesCount,
      trackDetailsData,
      setDetailsId,
    }),
    [
      clearSearch,
      searchTracks,
      fetchSearch,
      searchInput,
      setSearchResults,

      pagesCount,
      trackDetailsData,
      setDetailsId,
    ],
  );

  return (
    <TracksContext.Provider value={memoizedProviderValue}>
      {children}
    </TracksContext.Provider>
  );
};

function useTracks() {
  const context = useContext(TracksContext);

  if (context === undefined) {
    throw new Error('useTracks must be used within a TracksContext Provider');
  }

  return context;
}

export { useTracks, TracksProvider };
