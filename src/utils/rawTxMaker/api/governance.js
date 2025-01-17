// rawTxMaker/api/governance.js
//
// Imports
import { scores, makeTxCallRPCObj } from "./helpers";

// Governance methods
/*
 *
 */
function voteNetworkProposal(proposalId, vote, prepAddress, nid, sl = 20000000000) {
  return makeTxCallRPCObj(
    prepAddress,
    scores.mainnet.governance2,
    "voteProposal",
    {
      id: proposalId,
      vote: vote
    },
    nid,
    sl
  );
}

/*
 *
 */
function approveNetworkProposal(proposalId, prepAddress, nid) {
  return voteNetworkProposal(proposalId, "0x1", prepAddress, nid);
}

/*
 *
 */
function rejectNetworkProposal(proposalId, prepAddress, nid) {
  return voteNetworkProposal(proposalId, "0x0", prepAddress, nid);
}

// 12500000000
function submitNetworkProposal(from, params, nid, sl = 20000000000) {
  return makeTxCallRPCObj(
    from,
    scores.mainnet.governance2,
    "registerProposal",
    params,
    nid,
    sl,
    100
  );
}

const governanceMethods = {
  voteNetworkProposal,
  approveNetworkProposal,
  rejectNetworkProposal,
  submitNetworkProposal
};
export default governanceMethods;
