import areaList from "@/assets/data/areaList.json"

function vantAddress_to_dbAddress(addressId, userId, item){
  return addressId==-1?
  {
    "userId": userId,
    "receiver": item.name,
    "phone": item.tel,
    "postcode": item.postalCode,
    "addressCode": item.areaCode,
    "address": item.addressDetail,
    "isDefault": item.isDefault ? 1:0
  }:{
    "id": addressId,
    "userId": userId,
    "receiver": item.name,
    "phone": item.tel,
    "postcode": item.postalCode,
    "addressCode": item.areaCode,
    "address": item.addressDetail,
    "isDefault": item.isDefault ? 1:0
  }
}


function dbAddress_to_vantAddress(item){
  return item.map(val=>{return{
    'id':val.id,
    'name':val.receiver,
    'tel':val.phone,
    'address':areaCode_to_address(val.postcode)+val.address,
    'addressDetail':val.address,
    'areaCode':val.addressCode.toString(),
    'postalCode':val.postcode,
    'isDefault':val.isDefault==1?true:false
  }})
}

function areaCode_to_address(code){
  if(typeof(code) == "string")
    code = parseInt(code)
  const province = areaList["province_list"][(parseInt(code/10000)*10000).toString()]
  const city = areaList["city_list"][(parseInt(code/100)*100).toString()]
  const county = areaList["county_list"][code.toString()]
  // console.log(province==null?"":province + city==null?"":city + county==null?"":county);
  return province==null?"":province + city==null?"":city + county==null?"":county
}

export default{vantAddress_to_dbAddress, dbAddress_to_vantAddress, areaCode_to_address}



// 数据库格式
  // {
  //     "id": 5,
  //     "userId": 104,
  //     "receiver": "hw",
  //     "phone": "110",
  //     "postcode": null,
  //     "addressCode": 13103,
  //     "address": "淮安软件园",
  //     "isDefault": 1,
  // }

//item
  // {
  //     "name": "xz",
  //     "tel": "12345678900",
  //     "city": "石家庄市",
  //     "county": "",
  //     "country": "",
  //     "province": "河北省",
  //     "areaCode": "130100",
  //     "isDefault": false,
  //     "postalCode": "123451",
  //     "addressDetail": "111",
  //     "id": 6,
  //     "address": "徐州工程学院"
  // }