let dailyIPAddresses: Record<string, number>;
let dailyTop100: string[];

export function clear(): void {
    dailyIPAddresses = {};
    dailyTop100 = [];
}

export function top100(): string[] {
    return dailyTop100;
}

export function requestHandled(ipAddress: string): void {
    addToDictionary(ipAddress);
    addToList(ipAddress);
}

function addToDictionary(ipAddress: string): void {
    if (!(ipAddress in dailyIPAddresses)) {
        dailyIPAddresses[ipAddress] = 0;
    }
    dailyIPAddresses[ipAddress]++;
}

function addToList(ipAddress: string): void {
    removeIfPresent(ipAddress);
    dailyTop100.push(ipAddress);
    dailyTop100.sort(compareRequests);
    dailyTop100.length = Math.min(100, dailyTop100.length);
}

function removeIfPresent(ipAddressToRemove: string): void {
    const indexToRemove = dailyTop100.findIndex(ipAddress => ipAddress === ipAddressToRemove);
    if (indexToRemove !== -1) {
        dailyTop100.splice(indexToRemove, 1);
    }
}

function compareRequests(firstIPAddress: string, secondIPAddress: string): number {
    const firstRequests = dailyIPAddresses[firstIPAddress];
    const secondRequests = dailyIPAddresses[secondIPAddress];
    return secondRequests - firstRequests;
}
