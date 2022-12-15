export function findTypeUrl(params:string) {
    let param =params.toLowerCase();
    console.log(param,"param");
    
    if (param ==="connectionid") {
        return 'connectionId'
    } else  if (param ==="nic") {
        return 'nic'
    }else  if (param ==="oldid") {
        return 'oldId'
    }else  if (param ==="name") {
        return 'name'
    }else  if (param ==="phoneno") {
        return 'phone'
    }else {
        return 'connectionid'
    }
}