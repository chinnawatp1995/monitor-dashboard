// export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3010'
export const SERVER_URL = 'http://47.129.235.187/monitor-server'
export const urls = {
  getServices: () => `${SERVER_URL}/services`,
  getServerStatus: () => `${SERVER_URL}/server-status`,
  getTotalRequest: () => `${SERVER_URL}/request`,
  getCpuUsage: () => `${SERVER_URL}/cpu-usage`,
  getMemUsage: () => `${SERVER_URL}/mem-usage`,
  getAvgResponse: () => `${SERVER_URL}/avg-response`,
  getResponseTimeDistribution: () => `${SERVER_URL}/dist-response`,
  getServerTimeline: () => `${SERVER_URL}/server-timeline`,
  getMachines: service => `${SERVER_URL}/machines?service=${service}`,
  getPaths: service => `${SERVER_URL}/path?service=${service}`,
  getErrorRate: service => `${SERVER_URL}/error-req?service=${service}`,
  getErrorRanking: service => `${SERVER_URL}/error-ranking?service=${service}`,
  getRxNetworkUsage: () => `${SERVER_URL}/rx-network-usage`,
  getTxNetworkUsage: () => `${SERVER_URL}/tx-network-usage`,
  getAlertRules: () => `${SERVER_URL}/alert-rules`,
  createAlertRule: () => `${SERVER_URL}/create-alert`,
  createRecipient: () => `${SERVER_URL}/create-recipient`,
  addRecipient: () => `${SERVER_URL}/add-recipient`,
  enableRule: ruleId => `${SERVER_URL}/enable-rule?ruleId=${ruleId}`,
  disableRule: ruleId => `${SERVER_URL}/disable-rule?ruleId=${ruleId}`,
  deleteRule: ruleId => `${SERVER_URL}/delete-rule?ruleId=${ruleId}`,
  updateRule: () => `${SERVER_URL}/update-alert`,
  getRecipient: ruleId =>
    `${SERVER_URL}/recipients${ruleId ? `?ruleId=${ruleId}` : ''}`,
  removeRecipientFromRule: (recipientId, ruleId) =>
    `${SERVER_URL}/remove-recipient-from-rule?recipientId=${recipientId}&ruleId=${ruleId}`,
  deleteRecipient: recipientId =>
    `${SERVER_URL}/delete-recipient?recipientId=${recipientId}`,
  getController: service => `${SERVER_URL}/controllers?service=${service}`,
  getRequestErrorRatio: () => `${SERVER_URL}/request-error-ratio`,
  getAlertType: () => `${SERVER_URL}/alert-type`,
  getGroups: () => `${SERVER_URL}/groups`,
  removeGroupFromRule: () => `${SERVER_URL}/remove-group-from-rule`,
  addGroupToRule: () => `${SERVER_URL}/add-group-to-rule`,
  updateGroupOfRule: () => `${SERVER_URL}/update-group-of-rule`,
}
