App = 
{
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    //App.generate()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const croping = await $.getJSON('crop.json')
    App.contracts.crop = TruffleContract(croping)
    App.contracts.crop.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.croping = await App.contracts.crop.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  /*generate: function() {
    var SMlength=Math.floor(Math.random() * (13 - 8) ) + 8; 
    console.log("SMlength"+SMlength);
    
    var words;
    words=["bird", "clock", "boy", "plastic", "duck", "teacher", "lady", "professor", "hamster", "dog", "beautiful", "lazy", "professional", "lovely", "dumb", "rough", "soft", "hot", "vibrating", "slimy", "kicked", "ran", "flew", "dodged", "sliced", "rolled", "died", "breathed", "slept", "killed"]

    // generate random numbers
    var randomString = '';
    var flag;

    for(let i = 1; i <= SMlength; i++) 
    {
    flag=0;
    while(flag==0)
      {
        var index=Math.floor(Math.random() * (words.length - 0) ) + 0;  //generatig random index
        console.log("index"+index);
        
        if(Boolean(randomString.includes(words[index]))==false)
        flag=1;
      }
  
    randomString = randomString +" "+words[index];
}
$('#secret_msg').html(randomString)

var RNlength=Math.floor(Math.random() * (7 - 4) ) + 4; 
    console.log("RNlength"+RNlength);


var randomNo = '';
for(let i = 1; i <= RNlength; i++) {
    let randomDigit = Math.floor(Math.random() * 10);
    console.log(randomDigit);
    randomNo = randomNo + randomDigit;
}
$('#secret_no').html(randomNo)
var strConcat=randomString.concat(randomNo);
console.log("concat"+strConcat);
// var crypto = require('crypto');
// var hash = crypto.createHash('sha256');
// hash.update('darshee');
$('#hash').html("hash will be generated")

  },

registerVoter: async(lines)=>
{
  
  
  //alert('register voter');
  if(isNaN(lines[0]))
    
    {
    //alert('not a number :'+lines[0]); 
    }
    else{
      
    //alert('is a number'+lines[0]);  
      
    }
    
    
    if(typeof lines[1] == 'string')
    
    {
    //alert('is string :'+lines[1]);  
    }
    else{
      
    //alert('else :'+lines[1]); 
      
    }
    
    if(typeof lines[2] == 'string')
    
    {
      //alert('is string :'+lines[2]);
      
    }
    else{
      //alert('else :'+lines[2]);
      
      
    }
  
console.log(lines);
//var balance= web3.eth.getBalance(web3.eth.accounts[0]);
var v = await App.voting.voters(lines[0])
//contractInstance.giveRightToVote(r, {from: web3.eth.accounts[0]});
if(v[0]==lines[0])
{
  alert("Already given the right");
}
else
{
 await App.voting.giveRightToVote(lines[0],lines[1],lines[2],{from: web3.eth.accounts[0],gas:3000000});
    //alert('added');
    
  }
  
      
 },

registerVoter: async() =>{
var r = document.getElementById("Id").value;
var v = await App.voting.voters(r)
//contractInstance.giveRightToVote(r, {from: web3.eth.accounts[0]});
if(v[0]==r)
{
  alert("Already given the right");
}
else
{
await App.voting.giveRightToVote(r)
}
 },



voterRegistration: async()=>{
var r = document.getElementById("Voterid").value;
var v = await App.voting.voters(r)
if (v[3]==true)
{
  alert("You are already registered");
}
else if(v[0]==0)
{
  alert("You are not a valid voter");
}
else
{
var account = web3.currentProvider.selectedAddress
$("#ID").html("Your Account ID: "+account);
//$("#bal").html("Balance: "+web3.eth.getBalance(account)/Math.pow(10,18));
await App.voting.registerToVote(r);
}
 },

 voteForCandidate: async()=> {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd = '0'+dd
  } 
  if(mm<10) {
    mm = '0'+mm
  } 
  today = dd + '/' + mm + '/' + yyyy;

if(dd>ddV && mm>=mmV && yyyy>=yyyyV){    
    alert("Voting is closed");    
  }
  else if(dd<ddS && mm<=mmS && yyyy<=yyyyS)
  {
    alert("Voting starts on "+dateS);
  }
  else{
    var r = document.getElementById("vvid").value;
    var account = await App.voting.voters(r)[4];
    $("#ID").html("Your Account ID: "+account);
    if(await App.voting.voters(r)[1]==true)
    {
      alert("You have already voted");
    }
    else
    {
    var e = document.getElementById("candidate").value;
    var candidateName = e;  
    await App.voting.vote(e, {from: account}); 
    }
  }
}*/


farmerRegistration: async() =>{
var id = document.getElementById("farmerId").value;
var name = document.getElementById("farmerName").value;
var locate = document.getElementById("location").value;
var contact = document.getElementById("phone").value;

var v = await App.croping.farmers(id)
//contractInstance.giveRightToVote(r, {from: web3.eth.accounts[0]});
if(v[0]==id)
{
  alert("Already registered");
}
else
{
await App.croping.registerFarmer(id,name,locate,contact);
window.location.replace("http://localhost:3000/FarmerDashboard.html");
/*window.location.replace("http://localhost:3000/FarmerDashboard.html");
var account = web3.currentProvider.selectedAddress;
var f= await App.croping.farmerids(account);
alert(f[0])
document.getElementById("ID").appendChild(f[0]);*/
}

 },



customerRegistration: async() =>{
var id = document.getElementById("customerId").value;
var name = document.getElementById("customerName").value;
var locate = document.getElementById("location").value;
var contact = document.getElementById("phone").value;

var v = await App.croping.customers(id)
//contractInstance.giveRightToVote(r, {from: web3.eth.accounts[0]});
if(v[0]==id)
{
  alert("Already registered");
}
else
{
await App.croping.registerCustomer(id,name,locate,contact);
window.location.replace('http://localhost:3000/CustomerDashboard.html');
}
 },


lotRegistration: async() =>{
//var id = document.getElementById("customerId").value;
var name = document.getElementById("cropname").value;
var price = document.getElementById("price").value;
var quantity = document.getElementById("quantity").value;
var pdate = document.getElementById("produceddate").value;
var edate = 'EndDate';
await App.croping.addLot(name,quantity,price,pdate,edate)
 },

checkFarmer: async()=>{
  var account = web3.currentProvider.selectedAddress;
  var f= await App.croping.farmerids(account);
  if(f==0)
  {
    window.location.replace("http://localhost:3000/RegisterFarmer.html");
  }
  else
  {
    window.location.replace("http://localhost:3000/FarmerDashboard.html");
  }
},

checkCustomer: async()=>{
  var account = web3.currentProvider.selectedAddress;
  var c= await App.croping.customerids(account);
  if(c==0)
  {
    window.location.replace("http://localhost:3000/RegisterCustomer.html");
  }
  else
  {
    window.location.replace("http://localhost:3000/CustomerDashboard.html");
    var l= await App.croping.lots(1);
    var edate=l[6];
    //alert(typeof edate);
  }
},


allLots: async() =>{

 //var account = web3.currentProvider.selectedAddress;
 //var fid= await App.croping.farmerids(account);
 //console.log(fid);
 //console.log(App.croping.lots(1));
 //console.log(App.croping.lotCount());
 var lc=0;


////testing lots
//////lots
  var alllots=document.getElementById("customeriddashboard");

 App.croping.lotCount().then(res=>{
  console.log(res.c[0]);
  //document.getElementById("farmeriddashboard").innerHTML="working";
  lc=res.c[0];
  // var tr='';
  var tr='';
  // var alllots=document.getElementById("farmeriddashboard");
  for(var i=1;i<=lc;i++){
    App.croping.lots(i).then(res2=>{
      console.log(res2);
      App.croping.farmers(res2[0]).then(res3=>{
      var cont=res3[3];
            //styling and showing part
      //alert(fid==res2[0].c[0]);
      // if(res2[0].c[0]==fid){
      //alert("inside");
      // if(i%3===0)
      // {tr=tr+'<div class="row">';
      // lasti=i;
      // }

      var lid=res2[1].c[0];
      var ffid=res2[0].c[0];
      var price=res2[4].c[0];
      console.log(lid);
      if(!res2[7]){
      tr = tr+'<div class="col-lg-3">';
      tr += '<div class="lotbox"  >'
      +"<label>" +"Farmer:" + res2[0]+"</label>"+"</br>"
      + "<label>"+ "Lot ID:"+lid+"</label>"+"<br>"
      +"<label>" + "Contact No.:"+cont+"</label>"+"<br>"
      +"<label>" +"Crop: "+ res2[2]+"</label>"+"<br>"
       +"<label>" +"Quantity: "+res2[3]+" kg"+"</label>"+"<br>"
       +'<label id="price">' + "Price: "+res2[4] + "</label>"+"<br>"
       +"<label>" + "Produce Date: " +res2[5] + "</label>"+"<br>"
       // +"<label>" + "Expiry Date:"+res2[6] + "</label>"+"<br>"
       +'<input type="submit" value="order" onclick="App.buy('+lid+','+ffid+','+price+');return false;" class="btn btn-primary">'+"</div>"+"</div>";
      // if(i-2===lasti)
      // {tr=tr+'</div>'}
      // }
      
      console.log(tr);
              alllots.innerHTML=tr;

        }
      //window.location.replace('http://localhost:3000/Viewlots.html');
      });
    })
  }
        alllots.innerHTML+=tr;
})  
},
/*buy: async()=>{

  // alert(document.getElementById('lotid'));
  alert(document.getElementById('price').textContent);
        //await App.croping.buyLot(fid,lid);
},*/

// buy: async()=>{
//App.buy();await App.croping.buyLot(res2[0],res2[1]);
// }
showfarmer:async() =>{
  var account = web3.currentProvider.selectedAddress;
 var cid= await App.croping.farmerids(account);
 var farmerid=document.getElementById('showfarmer');
 farmerid.innerHTML=cid;
},

myPurchases: async() =>{

 var account = web3.currentProvider.selectedAddress;
 var cid= await App.croping.customerids(account);
 //console.log(fid);
 //console.log(App.croping.lots(1));
 //console.log(App.croping.lotCount());
 //var lc=0;


////testing lots
//////lots
  var alllots=document.getElementById("customeriddashboard");
 App.croping.lotCount().then(res=>{
  console.log(res.c[0]);
  //document.getElementById("farmeriddashboard").innerHTML="working";
  lc=res.c[0];
  // var tr='';
  var tr='';
  // var alllots=document.getElementById("farmeriddashboard");
  for(var i=1;i<=lc;i++){
    App.croping.lots(i).then(res2=>{
      console.log(res2);
      //styling and showing part
      //alert(fid==res2[0].c[0]);
      if(res2[8].c[0]==cid&&res2[7]){
      //alert("inside");
      // if(i%3===0)
      // {tr=tr+'<div class="row">';
      // lasti=i;
      // }
      tr = tr+'<div class="col-lg-3">';
      tr += '<div class="lotbox">'
      +"<label>" + "Farmer ID"+res2[0]+"</label>"+"<br>"
      +"<label>" + "Lot ID"+res2[1]+"</label>"+"<br>"
      +"<label>" +"Crop: "+ res2[2]+"</label>"+"<br>"
       +"<label>" +"Quantity: "+res2[3] + "</label>"+"<br>"
       +"<label>" + "Price: "+res2[4] + "</label>"+"<br>"
       +"<label>" + "Produce Date: " +res2[5] + "</label>"+"<br>"
       // +"<label>" + "Expiry Date:"+res2[6] + "</label>"+"<br>"
       +"</div>"+"</div>";
      // if(i-2===lasti)
      // {tr=tr+'</div>'}
      }
      console.log(tr);
              alllots.innerHTML=tr;

      //window.location.replace('http://localhost:3000/Viewlots.html');
    })
  }
        alllots.innerHTML+=tr;

})
 alert(tr);
 console.log(tr);
   alllots.innerHTML = tr;

//  })
//  alert(lc);
//  for(var i=1;i<lc;i++)
//  {
//  var v=await App.croping.lots(i);
//   if(v[0]==fid)
//   {
//    alert(v[1]);
// alert(v[2]);
// alert(v[3]);
// alert(v[4]);
// alert(v[5]);
//    alert(v[6]);
// alert(v[7]);
//   }
 
//  }

},


myLots: async() =>{

 var account = web3.currentProvider.selectedAddress;
 var fid= await App.croping.farmerids(account);
 console.log(fid);
 console.log(App.croping.lots(1));
 console.log(App.croping.lotCount());
 var lc=0;


////testing lots
//////lots
  var alllots=document.getElementById("farmeriddashboard");



 App.croping.lotCount().then(res=>{
  console.log(res.c[0]);
  //document.getElementById("farmeriddashboard").innerHTML="working";
  lc=res.c[0];
  // var tr='';
  var tr='';
  // var alllots=document.getElementById("farmeriddashboard");
  for(var i=1;i<=lc;i++){
    App.croping.lots(i).then(res2=>{
      console.log(res2);
      //styling and showing part
      //alert(fid==res2[0].c[0]);
      if(res2[0].c[0]==fid){
      //alert("inside");
      // if(i%3===0)
      // {tr=tr+'<div class="row">';
      // lasti=i;
      // }
      tr = tr+'<div class="col-lg-3">';
      tr += '<div class="lotbox"  >'
      +"<label>" + "Lot ID: "+res2[1]+"</label>"+"<br>"+"<hr>"
      +"<label>" +"Crop: "+ res2[2]+"</label>"+"<br>"
       +"<label>" +"Quantity: "+res2[3] + "</label>"+"<br>"
       +"<label>" + "Price: "+res2[4] + "</label>"+"<br>"
       +"<label>" + "Produce Date: " +res2[5] + "</label>"+"<br>"
       // +"<label>" + "Expiry Date:"+res2[6] + "</label>"+"<br>"
       +"<label>" + "Sold or Not: "+res2[7] + "</label>"+'<br>'
       +"<label>"+"Buyer: "+res2[8]+"</label>"+"</div>"+"</div>";
      // if(i-2===lasti)
      // {tr=tr+'</div>'}
      }
      console.log(tr);
              alllots.innerHTML=tr;

      //window.location.replace('http://localhost:3000/Viewlots.html');
    })
  }
        alllots.innerHTML+=tr;

})
 alert(tr);
 console.log(tr);
   alllots.innerHTML = tr;

//  })
//  alert(lc);
//  for(var i=1;i<lc;i++)
//  {
//  var v=await App.croping.lots(i);
//   if(v[0]==fid)
//   {
//    alert(v[1]);
// alert(v[2]);
// alert(v[3]);
// alert(v[4]);
// alert(v[5]);
//    alert(v[6]);
// alert(v[7]);
//   }
 
//  }

},

checkLotExpiry: async()=>{
  var l= await App.croping.lots(i);
  var edate=l[6];

},

buy: async(lid,fid,price)=>{
  //alert(lid);
  //alert(fid);
  // alert(document.getElementById('lotid').value);
  var account = web3.currentProvider.selectedAddress;
  // var l =await App.croping.lots(1);
  // var lid= l[0];
  // var fid=l[1];
  await  App.croping.buyLot(fid,lid,{from:account,value:price});
}



}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
