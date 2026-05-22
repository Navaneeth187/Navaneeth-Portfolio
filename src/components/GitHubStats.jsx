import { useState, useEffect } from 'react';
import { Code2, GitFork, Star, BookOpen, Activity, AlertTriangle, RefreshCw } from 'lucide-react';
import ContributionGraph from './ContributionGraph';

const SkeletonCard = () => (
  <div className="bg-cardBg border border-cardBorder rounded-2xl p-6 animate-pulse">
    <div className="h-4 bg-cardBorder rounded w-2/3 mb-4"></div>
    <div className="h-3 bg-cardBorder rounded w-1/2 mb-3"></div>
    <div className="h-3 bg-cardBorder rounded w-1/3"></div>
  </div>
);

const GitHubStats = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const username = 'navaneethp1407';
  const CACHE_KEY = `github_data_${username}`;
  const CACHE_TTL = 3600000; // 1 hour in ms

  useEffect(() => {
    let isMounted = true;

    const fetchGitHub = async () => {
      setLoading(true);
      setError(false);

      try {
        // Check session storage cache first
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            setProfile(data.profile);
            setRepos(data.repos);
            setLoading(false);
            return;
          }
        }

        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        ]);

        if (!profileRes.ok || !reposRes.ok) {
           if (profileRes.status === 403 || profileRes.status === 404) {
             throw new Error('API Rate Limit or Not Found');
           }
           throw new Error('API request failed');
        }

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();

        if (isMounted) {
          setProfile(profileData);
          setRepos(reposData);
          
          // Save to cache
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: { profile: profileData, repos: reposData }
          }));
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchGitHub();

    return () => {
      isMounted = false;
    };
  }, [username, retryCount, CACHE_KEY]);

  if (error) {
    return (
      <div className="space-y-8">
        <ContributionGraph />
        <div className="bg-cardBg border border-red-500/20 rounded-2xl p-8 flex flex-col items-center text-center group">
          <AlertTriangle className="text-red-500/80 mb-4 group-hover:scale-110 transition-transform" size={32} />
          <h3 className="text-lg font-bold text-textMain mb-2">GitHub Sync Interrupted</h3>
          <p className="text-textMuted text-sm mb-6 max-w-md">
            The GitHub API is currently rate-limiting public requests from this IP address. Real-time repository data cannot be fetched.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => setRetryCount(c => c + 1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-background border border-cardBorder rounded-full text-sm font-medium hover:text-textMain transition-colors"
            >
              <RefreshCw size={16} /> Retry Connection
            </button>
            <a 
              href={`https://github.com/${username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-bold hover:bg-primary hover:text-background transition-colors"
            >
              View Profile on GitHub →
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-64 bg-cardBg border border-cardBorder rounded-2xl animate-pulse"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Public Repos', value: profile?.public_repos || 0, icon: BookOpen },
    { label: 'Followers', value: profile?.followers || 0, icon: Star },
    { label: 'Following', value: profile?.following || 0, icon: GitFork },
    { label: 'Total Stars', value: repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0), icon: Star },
  ];

  return (
    <div className="space-y-8">
      {/* Simulated Heatmap */}
      <ContributionGraph />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-cardBg border border-cardBorder rounded-2xl p-6 text-center group hover:border-primary/30 transition-colors shadow-lg">
            <stat.icon className="text-textDarker mx-auto mb-3 group-hover:text-primary transition-colors" size={22} />
            <p className="text-3xl font-bold text-textMain mb-1">{stat.value}</p>
            <p className="text-xs text-textMuted uppercase tracking-wider font-mono">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Repos */}
      <div>
        <h3 className="text-lg font-bold text-textMain mb-4 flex items-center gap-2">
          <Code2 size={20} className="text-primary" />
          Recent Repositories
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.slice(0, 6).map(repo => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cardBg border border-cardBorder rounded-xl p-5 hover:border-primary/40 transition-all group block shadow-md hover:shadow-[0_5px_15px_rgba(168,255,53,0.1)] hover:-translate-y-1"
              aria-label={`View ${repo.name} on GitHub`}
            >
              <h4 className="font-bold text-textMain text-sm group-hover:text-primary transition-colors truncate mb-2">
                {repo.name}
              </h4>
              <p className="text-xs text-textMuted line-clamp-2 mb-4 min-h-[2rem]">
                {repo.description || 'No description provided.'}
              </p>
              <div className="flex items-center gap-4 text-xs text-textDarker">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star size={12} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
