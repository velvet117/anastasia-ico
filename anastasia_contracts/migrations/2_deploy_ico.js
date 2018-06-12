var AnastasiaToken = artifacts.require("./AnastasiaToken.sol");
var AnastasiaICO = artifacts.require("./AnastasiaICO.sol");

const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
};

module.exports = async function(deployer, network, accounts) {
  var now = Math.floor(Date.now() / 1000) + duration.seconds(50);
  var oneYearFromNow = now + duration.years(1);
  const rate = 1000; //1 eth = 1000 ANS tokens
  const walletToCollectFunds = accounts[0];

  await deployer.deploy(AnastasiaToken, "Anastasia Token", "ANS", 18);
  const tokenContract = await AnastasiaToken.deployed();
  await deployer.deploy(AnastasiaICO, rate, walletToCollectFunds, tokenContract.address, now, oneYearFromNow);
  const icoContract = await AnastasiaICO.deployed()
  await tokenContract.transferOwnership(icoContract.address)
};
