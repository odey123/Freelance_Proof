const axios = require('axios');

class GithubService {
  async getAccessToken(code) {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      { headers: { Accept: 'application/json' } }
    );
    return response.data.access_token;
  }

  async fetchUserData(accessToken) {
    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    const reposRes = await axios.get('https://api.github.com/user/repos?per_page=100&type=owner', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const user = userRes.data;
    const repos = reposRes.data;

    // Aggregate languages
    let languages = {};
    for (const repo of repos) {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    }

    // Attempt to fetch commits or use simple total public_repos + gists as fallback for commits demo
    const total_commits = (user.public_repos * 10) + user.followers; // Mock calculation for demo

    return {
      github_username: user.login,
      github_id: String(user.id),
      avatar_url: user.avatar_url,
      raw_github_data: {
        repos: repos.map(r => ({ name: r.name, description: r.description, stars: r.stargazers_count })),
        total_commits: total_commits,
        languages,
        account_age_years: (new Date() - new Date(user.created_at)) / (1000 * 60 * 60 * 24 * 365),
        weekly_activity: [] // mock
      }
    };
  }
}

module.exports = new GithubService();
