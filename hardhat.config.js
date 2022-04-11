/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "adb2539f8d704c999a3b01f5494e70c1";
const RINKEBY_PRIVATE_KEY ="0444b5f1a6387dc2e6da402908d4334739f5b5e50e79ab4558191d097b3c3514";

module.exports = {
  solidity: "0.8.9",

  networks:{

    rinkeby:{
      url:`https://rinkeby.infura.io/v3/${ALCHEMY_API_KEY}`,
      accounts:[`${RINKEBY_PRIVATE_KEY}`]
    }
  }
};
