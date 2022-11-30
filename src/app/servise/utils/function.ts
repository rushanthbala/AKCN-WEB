export function findTypeUrl(params:string) {
    let param =params.toLowerCase();
    if (param ==="ConnectionID") {
        return 'connectionId'
    } else  if (param ==="NIC") {
        return 'nic'
    }else  if (param ==="OldID") {
        return 'oldId'
    }else  if (param ==="name") {
        return 'name'
    }else  if (param ==="PhoneNo") {
        return 'phone'
    }else {
        return 'connectionId'
    }
}