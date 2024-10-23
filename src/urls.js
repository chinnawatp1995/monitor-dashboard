export const urls = {
  getServices: () => '/services',
  getServerStatus: () => '/server-status',
  getTotalRequest: () => '/request',
  getCpuUsage: () => '/cpu-usage',
  getMemUsage: () => '/mem-usage',
  getAvgResponse: () => '/avg-response',
  getResponseTimeDistribution: () => '/dist-response',
  getServerTimeline: () => '/server-timeline',
  getMachines: service => `/machines?service=${service}`,
  getPaths: service => `path?service=${service}`,
  getErrorRate: service => `/error-req?service=${service}`,
  getErrorRanking: service => `error-ranking?service=${service}`,
}
