const { expect } = require("chai");  // CHAi LIBRARY
// const { ethers } = require("ethers");
 describe( "Token Contract", function(){
   let Token;
   let hardhatToken;
   let owner;
   let addr1;;
   let addr2;
   let addrs;

   this.beforeEach( async function(){         // BEFORE EACH IS A HOOK which makes our DRY code
      Token = await ethers.getContractFactory("Token");
      [owner,addr1,addr2,addrs] = await ethers.getSigners();
      hardhatToken = await Token.deploy();
   });
    
    describe("Deployment" , function(){
      it("Should set right owner",async function(){
        expect(await hardhatToken.owner()).to.equal(owner.address);
      } )
      it("Should Assign the total supply of token to owner", async function() {
         const ownerBalance = await hardhatToken.checkBalance(owner.address);
         expect( await hardhatToken.totalSupply()).to.equal(ownerBalance);
      });
    });

    describe("Transactions", function() {
      it("Should transfer money to addr" , async function(){
       await hardhatToken.transfer( addr1.address , 5 );
       const addr1Balance = await hardhatToken.checkBalance(addr1.address);
       expect( addr1Balance).to.equal(5);

       await hardhatToken.connect(addr1).transfer(addr2.address,5);
       const addr2Balance = await hardhatToken.checkBalance( addr2.address);
       expect( addr2Balance).to.equal(5);
      });

      it( " Should fail to send ", async function(){
         const initialBalance = await hardhatToken.checkBalance(owner.address);
         await expect ( hardhatToken.connect(addr1).transfer(owner.address,1)).to.be.revertedWith(" OWNER DID'NT HAVE SUFFICIENT BALANCE");
         expect (await hardhatToken.checkBalance(owner.address)).to.equal(initialBalance);
      });

      it("Updation of Amaount after Transfer" , async function() {
       const ownerBalance = await hardhatToken.checkBalance( owner.address);
       await hardhatToken.transfer( addr1.address , 100);
       await hardhatToken.transfer( addr2.address , 1000);

       expect( await hardhatToken.checkBalance( owner.address)).to.equal( ownerBalance - 1100);

       const addr1Balance = await hardhatToken.checkBalance( addr1.address);
       expect( addr1Balance).to.equal(100);

       const addr2Balance = await hardhatToken.checkBalance(addr2.address);
       expect( addr2Balance).to.equal(1000);

      });
    });

 });






































// // const { ethers } = require("ethers");
// const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");


//   describe( "Token contract" , function() {        // Contract name which increase the code visibility
     
//     it(" Deployment should assign the total supply to owner", async function(){

//          const [owner] = await ethers.getSigners();

//         //  console.log("Signers Object:" , owner );
//          const Token = await ethers.getContractFactory("Token"); // creating the instance

//          const hardhatToken = await Token.deploy(); // deploy the contract

//          const ownerBalance = await hardhatToken.checkBalance(owner.address);  // knowing the balance of owner
//         //  console.log("Owner Address:", owner.address );

//          expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//     });

//     it(" Should transfer token btw accounts ", async function(){

//       const [owner,addr1,addr2] = await ethers.getSigners();

//       const Token = await ethers.getContractFactory("Token"); // creating the instance

//       const hardhatToken = await Token.deploy(); // deploy the contract

//       // Transfer 10 token from owner to addr1

//       await hardhatToken.transfer( addr1.address , 10 );
//       expect( await hardhatToken.checkBalance( addr1.address)).to.equal(10);
//       expect( await hardhatToken.checkBalance( owner.address)).to.equal(9990);

//       //Transfer addr1 to addr2
//       await hardhatToken.connect(addr1).transfer(addr2.address ,5);
//       expect( await hardhatToken.checkBalance( addr2.address)).to.equal(5);

//  });
//   });