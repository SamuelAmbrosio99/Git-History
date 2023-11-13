import React, { createContext, useContext, useState, useEffect, ReactNode, use } from 'react';
  import { getData } from '@/services/api';
import { statsCard } from '@/models/stats';
import { commit } from '@/models/commits';
  
  interface ApiContextProps {
    user: string;
    repo: string;
    commits: commit[] | null;
    stats: statsCard[];
    loading: boolean;
    error: Error | null;
    showUserChange: boolean;
    showRepoChange: boolean;
    pages: Array<number>;
    lastPage: number;
    currentPage: number;
    handleLoading: () => void;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    setRepo: React.Dispatch<React.SetStateAction<string>>;
    setShowUserChange: React.Dispatch<React.SetStateAction<boolean>>;
    setShowRepoChange: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }
  
  const ApiContext = createContext<ApiContextProps | undefined>(undefined);
  
  interface ApiProviderProps {
    children: ReactNode;
  }
  
  export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string>('vercel');
    const [repo, setRepo] = useState<string>('vercel');
    const [showUserChange, setShowUserChange] = useState<boolean>(false);
    const [showRepoChange, setShowRepoChange] = useState<boolean>(false);

    const [stats, setStats] = useState<statsCard[] | any[]>([{}, {}, {}]);
    const [commits, setCommits] = useState<commit[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pages, setPages] = useState<Array<number>>([1, 2, 3, 4, 5]);
    const [perPage, setPerPage] = useState<number>(5);
    const [lastPage, setLastPage] = useState<number>(1);
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      setLoading(true);
      getStats()
      getCommits()
      setLoading(false);
    }, [user, repo]);

    useEffect(() => {
      setLoading(true);
      getCommits()
      setLoading(false);
    }, [currentPage]);

    const getStats = async () => {
      try {
        const data = await getData(`stats?user=${user}&repo=${repo}`);
        setStats(data);
      } catch (error: any) {
        setError(error);
        setStats([{}, {}, {}]);
      }
    }

    const getCommits = async () => {
      try {
        const data = await getData(`commits?user=${user}&repo=${repo}&page=${currentPage}&per_page=${perPage}`);
        setCommits(data.commits);
        setPages(data.pages);
        setLastPage(data.lastPage);
      } catch (error: any) {
        setError(error);
      }
    }

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
      pages,
      lastPage,
      currentPage,
      handleLoading,
      setUser,
      setRepo,
      setShowUserChange,
      setShowRepoChange,
      setCurrentPage
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
  