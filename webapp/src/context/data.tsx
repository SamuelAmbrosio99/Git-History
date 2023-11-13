import React, { createContext, useContext, useState, useEffect, ReactNode, use } from 'react';
  import { getData } from '@/services/api';
import { statsCard } from '@/models/stats';
  
  interface ApiContextProps {
    user: string;
    repo: string;
    commits: any | null;
    stats: statsCard[];
    loading: boolean;
    error: Error | null;
    showUserChange: boolean;
    showRepoChange: boolean;
    handleLoading: () => void;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    setRepo: React.Dispatch<React.SetStateAction<string>>;
    setShowUserChange: React.Dispatch<React.SetStateAction<boolean>>;
    setShowRepoChange: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const ApiContext = createContext<ApiContextProps | undefined>(undefined);
  
  interface ApiProviderProps {
    children: ReactNode;
  }
  
  export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string>('vercel');
    const [repo, setRepo] = useState<string>('vercel');
    const [filter, setFilter] = useState<string>('');
    const [values, setValues] = useState<any[]>([]);
    const [showUserChange, setShowUserChange] = useState<boolean>(false);
    const [showRepoChange, setShowRepoChange] = useState<boolean>(false);
    const [commits, setCommits] = useState<any | null>(null);
    const [stats, setStats] = useState<any | null>([{}, {}, {}]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      getStats()
    }, [user, repo]);

    const getStats = async () => {
      setLoading(true);
      try {
        const data = await getData(`stats?user=${user}&repo=${repo}`);
        setStats(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  
    // useEffect(() => {
    //   const fetchDataFromApi = async () => {
    //     try {
    //       const data = await getData('');
    //       setApiData(data);
    //     } catch (error: any) {
    //       setError(error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   fetchDataFromApi();
    // }, []);

    const handleLoading = () => {
      setLoading(!loading)
    }
  
    const contextValue: ApiContextProps = {
      user,
      repo,
      showUserChange,
      showRepoChange,
      commits,
      stats,
      loading,
      error,
      handleLoading,
      setUser,
      setRepo,
      setShowUserChange,
      setShowRepoChange,
    };
  
    return (
      <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
    );
  };
  
  export const useApi = (): ApiContextProps => {
    const context = useContext(ApiContext);
    if (!context) {
      throw new Error('Debe usarse dentro de un provider');
    }
    return context;
  };
  