const cryptoService = require('../services/crypto.service');

function calculateScore(githubData) {
  let score = {
    overall: 0,
    consistency: 0,
    experience: 0,
    diversity: 0,
    activity: 0
  };

  // Account age (25 points)
  const age = githubData.account_age_years;
  if (age >= 5) score.experience = 25;
  else if (age >= 3) score.experience = 20;
  else if (age >= 1) score.experience = 10;
  else score.experience = 5;

  // Commit/Activity consistency (25 points)
  const commits = githubData.total_commits;
  if (commits > 1000) score.consistency = 25;
  else if (commits > 500) score.consistency = 20;
  else if (commits > 100) score.consistency = 10;
  else score.consistency = 5;

  // Repository quality (20 points)
  const repoCount = githubData.repos.length;
  if (repoCount > 20) score.activity = 20;
  else if (repoCount > 10) score.activity = 15;
  else if (repoCount > 0) score.activity = 10;
  else score.activity = 0;

  // Language diversity (15 points)
  const langCount = Object.keys(githubData.languages).length;
  if (langCount >= 5) score.diversity = 15;
  else if (langCount >= 3) score.diversity = 10;
  else if (langCount >= 1) score.diversity = 5;
  else score.diversity = 0;
  
  // Community signals (15 points) -> Mocked based on commits for now
  score.community = score.activity > 10 ? 15 : 5;

  score.overall = score.consistency + score.experience + score.diversity + score.activity + score.community;

  // Cap at 100
  score.overall = Math.min(score.overall, 100);
  
  return score;
}

module.exports = { calculateScore };
