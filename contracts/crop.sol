pragma solidity ^0.5.0;

contract crop {
    
    struct Farmer {
   
    uint fid;
    string fname;
    string loc;
    uint256 contact;
    address payable fadd;
    
}
    struct Lot{
        uint fid;
        uint lid;
        string crop;
        uint quantity;
        uint price;
        string prodate;
        string expdate;
        bool sold_status;
        uint cid;
    }
    
    struct Customer{
        uint cid;
        string cname;
        string loc;
        uint256 contact;
        address cadd;
        
    }
    
    struct FarmerId {
        uint fid;
    }

    struct CustomerId{
        uint cid;
    }
    
    uint public lotCount=0;
    mapping(uint => Farmer) public farmers;
    mapping(uint => Lot) public lots;
    mapping(uint => Customer) public customers;
    mapping(address => FarmerId) public farmerids;
    mapping(address => CustomerId) public customerids;
    
    function registerFarmer(uint id, string memory name, string memory location, uint con) public {
        if(farmers[id].fid==0){
        farmers[id].fid=id;
        farmers[id].fname=name;
        farmers[id].loc=location;
        farmers[id].contact=con;
        farmers[id].fadd=msg.sender;
        farmerids[msg.sender].fid=id;
        }
    }
    
    function registerCustomer(uint id, string memory name, string memory location, uint con) public {
        if(customers[id].cid==0){
        customers[id].cid=id;
        customers[id].cname=name;
        customers[id].loc=location;
        customers[id].contact=con;
        customers[id].cadd=msg.sender;
        customerids[msg.sender].cid=id;
        }
    }
    
    function addLot(string memory _crop,uint _quantity,uint _price,string memory _prodate,string memory _expdate) public{
        lotCount+=1;
        lots[lotCount].lid=lotCount;
        lots[lotCount].fid=farmerids[msg.sender].fid;
        lots[lotCount].crop=_crop;
        lots[lotCount].quantity=_quantity;
        lots[lotCount].price=_price;
        lots[lotCount].prodate=_prodate;
        lots[lotCount].expdate=_expdate;
        lots[lotCount].sold_status=false;
        
        
    }
    
     function buyLot(uint fid,uint lid)public payable returns (uint)
    {
        uint amount=msg.value;
        uint cid=customerids[msg.sender].cid;
        //require(lots[lid].price==msg.value);
        
        farmers[fid].fadd.transfer(amount);
        lots[lid].sold_status=true;
        lots[lid].cid=cid;
       // return true;
       return msg.value;
  
    }


     
    
}


    
    
