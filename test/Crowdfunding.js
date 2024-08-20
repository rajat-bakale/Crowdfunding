const { expect } = require("chai");
const { ethers } = require("hardhat");

(async () => {
    const chaiAsPromised = await import("chai-as-promised");
    require("chai").use(chaiAsPromised.default);
})();

describe("CrowdFunding Contract", function () {
    let crowdfunding;
    let manager;
    let contributor1;
    let contributor2;

    beforeEach(async function () {
        [manager, contributor1, contributor2] = await ethers.getSigners();

        const target = ethers.parseEther("10");
        const deadline = 3600;

        crowdfunding = await ethers.deployContract("CrowdFunding", [target, deadline]);
        await crowdfunding.waitForDeployment();
    });

    it("Should set the correct manager", async function () {
        expect(await crowdfunding.manager()).to.equal(manager.address);
    });

    it("Should accept contributions", async function () {
        await crowdfunding.connect(contributor1).sendETH({ value: ethers.parseEther("1") });
        expect(await crowdfunding.contributers(contributor1.address)).to.equal(ethers.parseEther("1"));
        expect(await crowdfunding.raisedAmount()).to.equal(ethers.parseEther("1"));
    });

    it("Should not accept contributions after the deadline", async function () {
        await ethers.provider.send("evm_increaseTime", [3600]);
        await ethers.provider.send("evm_mine");
    
        try {
            await crowdfunding.connect(contributor1).sendETH({ value: ethers.parseEther("1") });
            assert.fail("Expected error not received");
        } catch (error) {
            expect(error.message).to.include("revert");
        }
    });          

    it("Should allow the manager to create a request", async function () {
        await crowdfunding.createRequests("Request 1", contributor1.address, ethers.parseEther("1"));
        const request = await crowdfunding.requests(0);
        expect(request.discription).to.equal("Request 1");
        expect(request.recipient).to.equal(contributor1.address);
        expect(request.value.toString()).to.equal(ethers.parseEther("1").toString());
    });

    it("Should allow contributors to vote on requests", async function () {
        await crowdfunding.connect(contributor1).sendETH({ value: ethers.parseEther("1") });
        await crowdfunding.createRequests("Request 1", contributor1.address, ethers.parseEther("1"));

        await crowdfunding.connect(contributor1).voteRequest(0);
        const request = await crowdfunding.requests(0);
        expect(request.noOfVoters.toString()).to.equal("1");
    });

    it("Should allow the manager to make payments if the majority approves", async function () {
        await crowdfunding.connect(contributor1).sendETH({ value: ethers.parseEther("2") });
        await crowdfunding.connect(contributor2).sendETH({ value: ethers.parseEther("2") });
    
        await crowdfunding.createRequests("Request 1", recipient.address, ethers.parseEther("3"));
    
        await crowdfunding.connect(contributor1).voteRequest(0);
        await crowdfunding.connect(contributor2).voteRequest(0);
    
        await crowdfunding.makePayment(0);
    
        const request = await crowdfunding.requests(0);
        expect(request.completed).to.be.true;
        expect(await ethers.provider.getBalance(recipient.address)).to.be.above(ethers.parseEther("3"));
    });            

    it("Should refund contributors if the target is not met", async function () {
        await crowdfunding.connect(contributor1).sendETH({ value: ethers.parseEther("1") });
    
        await ethers.provider.send("evm_increaseTime", [3600]);
        await ethers.provider.send("evm_mine");
    
        await crowdfunding.connect(contributor1).refund();
    
        const balanceAfterRefund = await crowdfunding.contributers(contributor1.address);
        expect(balanceAfterRefund).to.equal(0);
    });            
});
