# CrowdFunding Smart Contract

The CrowdFunding smart contract is a decentralized crowdfunding platform built on the Ethereum blockchain. It allows users to contribute Ether towards a funding goal, request funds through a proposal mechanism, and vote on whether to approve these requests. If the funding goal is not met by the deadline, contributors can refund their contributions.

## Features
- **Contributions** : Users can contribute Ether to the crowdfunding campaign.
- **Requests** : The campaign manager can create requests for funds.
- **Voting** : Contributors can vote on requests to approve or reject them.
- **Payments** : The manager can make payments from the contract if a request is approved by the majority.
- **Refunds** : Contributors can request refunds if the funding goal is not met by the deadline.


## Contract Details
### CrowdFunding
#### State Variables:

- **contributers** : Mapping of contributor addresses to their contribution amounts.
- **manager** : The address of the campaign manager.
- **minimumContribution** : The minimum amount of Ether required to contribute.
- **deadline** : The deadline for the crowdfunding campaign.
- **target** : The target amount of Ether to be raised.
- **raisedAmount** : The total amount of Ether raised.
- **noofContributers** : The number of unique contributors.
- **requests** : Mapping of request IDs to request details.
- **numRequests** : The number of requests created.
- **Constructor constructor(uint _target, uint _deadline)**: Initializes the contract with a target amount and a deadline.
##### Functions:

- **sendETH()**: Allows users to contribute Ether to the campaign.
- **getContractBalance()**: Returns the current balance of the contract.
- **refund()**: Allows contributors to refund their contributions if the goal is not met.
- **createRequests(string memory _discrption, address payable _recipient, uint _value)**: Allows the manager to create a request for funds.
- **voteRequest(uint _requestNo)**: Allows contributors to vote on a request.
- **makePayment(uint requestNo)**: Allows the manager to make payments if a request is approved by the majority.

## Installation and Deployment

1. **Install Dependencies**: Ensure you have Node.js and Hardhat installed.
   ```bash
   npm install
   ```

2. **Compile the Contract**:
   ```bash
   npx hardhat compile
   ```

3. **Deploy the Contract**: Update the deployment scripts and deploy to hardhat testnet.
   ```bash
   npx hardhat run scripts/deploy.js --network hardhat
   ```

## Scripts
- **deploy.js**: Deploys the Crowdfunding.sol contract.

## Testing
Unit tests are written using Hardhat and Chai. The test cases cover all functionalities of contracts.
  ### Running Tests
   ```bash
   npx hardhat test
   ```
  ### Test Files
  - **test/Crowdfunding.js**: Contains tests for the Crowdfunding.sol contract.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
